#!/usr/bin/env bun

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium, type Page } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const outputPath = path.join(
	process.cwd(),
	".planning",
	"phases",
	"17-expanded-surface-qa-and-closeout-prep",
	"17-browser-qa-report.json",
);

const viewports = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
] as const;

const routeConfigs = [
	{
		route: "/states",
		requiredText: [
			"State proposals",
			"Published states",
			"Open cluster reading paths",
		],
		requiredLinks: ["/states/south-dakota", "/states/wyoming", "/states/texas"],
	},
	{
		route: "/states/clusters",
		requiredText: [
			"Browse the registry in grouped reading lanes",
			"Back to the full registry",
			"/states/[slug]",
		],
		requiresCanonicalStateLink: true,
	},
	{
		route: "/states/compare",
		requiredText: [
			"Compare the current registry without losing the source trail",
			"Supporting records",
			"Back to the full registry",
		],
		requiresCanonicalStateLink: true,
	},
	{
		route: "/states/south-dakota",
		requiredText: [
			"South Dakota",
			"Record footing",
			"Freshness",
			"Status as of",
			"Last reviewed",
		],
	},
	{
		route: "/states/wyoming",
		requiredText: [
			"Wyoming",
			"Record footing",
			"Freshness",
			"Status as of",
			"Last reviewed",
		],
	},
	{
		route: "/states/texas",
		requiredText: [
			"Texas",
			"Record footing",
			"Freshness",
			"Status as of",
			"Last reviewed",
		],
	},
] as const;

type ViewportConfig = (typeof viewports)[number];
type RouteConfig = (typeof routeConfigs)[number];

type OverflowingElement = {
	selector: string;
	text: string;
	left: number;
	right: number;
	width: number;
};

type RouteCheck = {
	route: string;
	viewport: ViewportConfig;
	status: "passed";
	responseStatus: number;
	requiredText: string[];
	pageOverflow: {
		scrollWidth: number;
		viewportWidth: number;
		passed: true;
	};
	elementOverflow: {
		checkedCount: number;
		overflowingElements: OverflowingElement[];
		passed: true;
	};
	links: {
		anchors: string[];
		requiredLinks: string[];
		canonicalStateLinkFound: boolean;
		passed: true;
	};
};

type BrowserQaReport = {
	status: "passed" | "failed";
	generatedAt: string;
	baseUrl: string;
	viewports: typeof viewports;
	routes: string[];
	routeChecks: RouteCheck[];
	error?: string;
};

function routeUrl(route: string): string {
	return new URL(route, baseUrl).toString();
}

function normalizePathname(rawHref: string): string {
	const pathname = new URL(rawHref, baseUrl).pathname;
	const statesPathIndex = pathname.indexOf("/states");

	return statesPathIndex >= 0 ? pathname.slice(statesPathIndex) : pathname;
}

function isCanonicalStatePath(pathname: string): boolean {
	return (
		pathname.startsWith("/states/") &&
		pathname !== "/states/clusters" &&
		pathname !== "/states/compare"
	);
}

async function getAnchorPathnames(page: Page): Promise<string[]> {
	const rawHrefs = await page
		.locator("a[href]")
		.evaluateAll((anchors) =>
			anchors
				.map((anchor) => anchor.getAttribute("href"))
				.filter((maybeHref): maybeHref is string => Boolean(maybeHref)),
		);

	return Array.from(new Set(rawHrefs.map((href) => normalizePathname(href)))).sort();
}

async function assertRequiredText(page: Page, config: RouteConfig) {
	const bodyText = (await page.locator("body").textContent()) ?? "";

	for (const text of config.requiredText) {
		if (!bodyText.includes(text)) {
			throw new Error(`Missing required text "${text}" on ${config.route}`);
		}
	}
}

async function assertPageOverflow(page: Page) {
	const overflow = await page.evaluate(() => ({
		scrollWidth: document.documentElement.scrollWidth,
		viewportWidth: window.innerWidth,
	}));

	if (overflow.scrollWidth > overflow.viewportWidth + 2) {
		throw new Error(
			`Page horizontally overflows: scrollWidth=${overflow.scrollWidth}, viewportWidth=${overflow.viewportWidth}`,
		);
	}

	return {
		...overflow,
		passed: true as const,
	};
}

async function assertElementOverflow(page: Page) {
	const result = await page.evaluate(() => {
		const selector = [
			"a",
			"button",
			"select",
			"input",
			"textarea",
			"label",
			"[role='button']",
			"[role='link']",
			"h1",
			"h2",
			"h3",
			"h4",
			"p",
			"dt",
			"dd",
			"li",
			"span",
			"code",
		].join(",");
		const maybeElements = Array.from(
			document.querySelectorAll<HTMLElement>(selector),
		);
		const overflowingElements: OverflowingElement[] = [];
		let checkedCount = 0;

		for (const element of maybeElements) {
			const style = window.getComputedStyle(element);
			const rect = element.getBoundingClientRect();
			const text =
				element.textContent?.replace(/\s+/g, " ").trim() ||
				element.getAttribute("aria-label") ||
				element.tagName.toLowerCase();

			if (
				style.display === "none" ||
				style.visibility === "hidden" ||
				style.opacity === "0" ||
				rect.width === 0 ||
				rect.height === 0 ||
				!text
			) {
				continue;
			}

			checkedCount += 1;

			if (rect.left < -2 || rect.right > window.innerWidth + 2) {
				overflowingElements.push({
					selector:
						element.getAttribute("data-testid") ??
						element.getAttribute("aria-label") ??
						element.tagName.toLowerCase(),
					text: text.slice(0, 140),
					left: Number(rect.left.toFixed(2)),
					right: Number(rect.right.toFixed(2)),
					width: Number(rect.width.toFixed(2)),
				});
			}
		}

		return { checkedCount, overflowingElements };
	});

	if (result.overflowingElements.length > 0) {
		throw new Error(
			`Visible text/control element overflow detected: ${JSON.stringify(
				result.overflowingElements.slice(0, 5),
			)}`,
		);
	}

	return {
		...result,
		passed: true as const,
	};
}

async function assertRouteLinks(page: Page, config: RouteConfig) {
	const anchors = await getAnchorPathnames(page);
	const requiredLinks = "requiredLinks" in config ? config.requiredLinks : [];

	for (const requiredLink of requiredLinks) {
		if (!anchors.includes(requiredLink)) {
			throw new Error(
				`Missing required anchor "${requiredLink}" on ${config.route}`,
			);
		}
	}

	const canonicalStateLinkFound = anchors.some(isCanonicalStatePath);

	if ("requiresCanonicalStateLink" in config && !canonicalStateLinkFound) {
		throw new Error(`Missing canonical state-detail anchor on ${config.route}`);
	}

	return {
		anchors,
		requiredLinks: [...requiredLinks],
		canonicalStateLinkFound,
		passed: true as const,
	};
}

async function checkRoute(
	page: Page,
	config: RouteConfig,
	viewport: ViewportConfig,
): Promise<RouteCheck> {
	await page.setViewportSize({
		width: viewport.width,
		height: viewport.height,
	});

	const response = await page.goto(routeUrl(config.route), {
		waitUntil: "networkidle",
	});

	if (!response) {
		throw new Error(`No response for ${config.route}`);
	}

	if (!response.ok()) {
		throw new Error(
			`Non-OK response for ${config.route}: ${response.status()}`,
		);
	}

	await page.locator("body").waitFor({ state: "visible" });
	await assertRequiredText(page, config);
	const pageOverflow = await assertPageOverflow(page);
	const elementOverflow = await assertElementOverflow(page);
	const links = await assertRouteLinks(page, config);

	return {
		route: config.route,
		viewport,
		status: "passed",
		responseStatus: response.status(),
		requiredText: [...config.requiredText],
		pageOverflow,
		elementOverflow,
		links,
	};
}

async function writeReport(report: BrowserQaReport) {
	await mkdir(path.dirname(outputPath), { recursive: true });
	await writeFile(outputPath, `${JSON.stringify(report, null, "\t")}\n`);
}

async function run() {
	const browser = await chromium.launch({ headless: true });
	const routeChecks: RouteCheck[] = [];

	try {
		const page = await browser.newPage();

		for (const viewport of viewports) {
			for (const config of routeConfigs) {
				routeChecks.push(await checkRoute(page, config, viewport));
			}
		}

		await writeReport({
			status: "passed",
			generatedAt: new Date().toISOString(),
			baseUrl,
			viewports,
			routes: routeConfigs.map((config) => config.route),
			routeChecks,
		});

		console.log(
			`Browser QA passed for ${routeChecks.length} route/viewport checks.`,
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown browser QA failure";
		await writeReport({
			status: "failed",
			generatedAt: new Date().toISOString(),
			baseUrl,
			viewports,
			routes: routeConfigs.map((config) => config.route),
			routeChecks,
			error: message,
		});
		throw error;
	} finally {
		await browser.close();
	}
}

await run();
