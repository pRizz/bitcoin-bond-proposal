#!/usr/bin/env bun

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { chromium, type Page } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:4173";
const route = "/states/compare" as const;
const outputPath = path.join(
	process.cwd(),
	".planning",
	"phases",
	"999.1-selective-mystic-ui-adoption-across-the-public-webapp",
	"999.1-browser-qa-report.json",
);

const viewports = [
	{ name: "mobile", width: 390, height: 844 },
	{ name: "tablet", width: 768, height: 1024 },
	{ name: "desktop", width: 1280, height: 900 },
] as const;

const requiredText = [
	"Compare the current registry without losing the source trail",
	"Freshness",
	"Comparison proof lanes",
	"Reserve benchmarks",
	"Crossover proposals",
	"Bond-side signals",
	"Open state record",
	"dated snapshot",
	"Back to the full registry",
	"Open cluster reading paths",
] as const;

const requiredRepresentativeLinks = [
	"/states/texas",
	"/states/north-carolina",
	"/states/new-hampshire",
] as const;

const requiredRouteLinks = [
	...requiredRepresentativeLinks,
	"/states",
	"/states/clusters",
] as const;

type ViewportConfig = (typeof viewports)[number];
type RequiredRouteLink = (typeof requiredRouteLinks)[number];

type OverflowingElement = {
	selector: string;
	text: string;
	left: number;
	right: number;
	width: number;
};

type LinkRequestCheck = {
	href: (typeof requiredRepresentativeLinks)[number];
	status: number;
	ok: true;
};

type FocusCheck = {
	text: string;
	href: string;
	outlineStyle: string;
	boxShadow: string;
	passed: true;
};

type RouteCheck = {
	route: typeof route;
	viewport: ViewportConfig;
	status: "passed";
	responseStatus: number;
	requiredText: typeof requiredText;
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
		requiredLinks: RequiredRouteLink[];
		passed: true;
	};
	representativeRequests: LinkRequestCheck[];
	focus: FocusCheck;
};

type BrowserQaReport = {
	status: "passed" | "failed";
	generatedAt: string;
	baseUrl: string;
	viewports: typeof viewports;
	routes: [typeof route];
	routeChecks: RouteCheck[];
	error?: string;
};

function routeUrl(pathname: string): string {
	return new URL(pathname, baseUrl).toString();
}

function normalizePathname(rawHref: string): string {
	const pathname = new URL(rawHref, baseUrl).pathname;
	const statesPathIndex = pathname.indexOf("/states");

	return statesPathIndex >= 0 ? pathname.slice(statesPathIndex) : pathname;
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

async function assertRequiredText(page: Page) {
	const bodyText = (await page.locator("body").textContent()) ?? "";

	for (const text of requiredText) {
		if (!bodyText.includes(text)) {
			throw new Error(`Missing required text "${text}" on ${route}`);
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
			"h1",
			"h2",
			"h3",
			"h4",
			"h5",
			"h6",
			"p",
			"span",
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

async function assertRouteLinks(page: Page) {
	const anchors = await getAnchorPathnames(page);

	for (const requiredLink of requiredRouteLinks) {
		if (!anchors.includes(requiredLink)) {
			throw new Error(`Missing required anchor "${requiredLink}" on ${route}`);
		}
	}

	return {
		anchors,
		requiredLinks: [...requiredRouteLinks],
		passed: true as const,
	};
}

async function assertRepresentativeLinkRequests(
	page: Page,
): Promise<LinkRequestCheck[]> {
	const checks: LinkRequestCheck[] = [];

	for (const href of requiredRepresentativeLinks) {
		const response = await page.request.get(routeUrl(href));

		if (!response.ok()) {
			throw new Error(
				`Representative state link request failed for ${href}: ${response.status()}`,
			);
		}

		checks.push({
			href,
			status: response.status(),
			ok: true,
		});
	}

	return checks;
}

async function getFocusedElementCheck(page: Page): Promise<FocusCheck | null> {
	return page.evaluate(() => {
		const maybeElement = document.activeElement as HTMLElement | null;

		if (!maybeElement || maybeElement.tagName.toLowerCase() !== "a") {
			return null;
		}

		const text = maybeElement.textContent?.replace(/\s+/g, " ").trim() ?? "";

		if (text !== "Open state record") {
			return null;
		}

		const style = window.getComputedStyle(maybeElement);
		const outlineStyle = style.outlineStyle;
		const boxShadow = style.boxShadow;

		if (outlineStyle === "none" && boxShadow === "none") {
			return null;
		}

		return {
			text,
			href: maybeElement.getAttribute("href") ?? "",
			outlineStyle,
			boxShadow,
			passed: true as const,
		};
	});
}

async function assertOpenStateRecordFocus(page: Page): Promise<FocusCheck> {
	const firstOpenStateRecordLink = page
		.getByRole("link", { name: "Open state record" })
		.first();
	await firstOpenStateRecordLink.waitFor({ state: "visible" });
	await firstOpenStateRecordLink.focus();

	const maybeProgrammaticFocus = await getFocusedElementCheck(page);

	if (maybeProgrammaticFocus) {
		return maybeProgrammaticFocus;
	}

	await page.evaluate(() => {
		document.body.setAttribute("tabindex", "-1");
		document.body.focus();
	});

	for (let tabIndex = 0; tabIndex < 60; tabIndex += 1) {
		await page.keyboard.press("Tab");
		const maybeKeyboardFocus = await getFocusedElementCheck(page);

		if (maybeKeyboardFocus) {
			return maybeKeyboardFocus;
		}
	}

	throw new Error(
		'The first "Open state record" link did not expose a visible focus style',
	);
}

async function checkRoute(
	page: Page,
	viewport: ViewportConfig,
): Promise<RouteCheck> {
	await page.setViewportSize({
		width: viewport.width,
		height: viewport.height,
	});

	const response = await page.goto(routeUrl(route), {
		waitUntil: "networkidle",
	});

	if (!response) {
		throw new Error(`No response for ${route}`);
	}

	if (!response.ok()) {
		throw new Error(`Non-OK response for ${route}: ${response.status()}`);
	}

	await page.locator("body").waitFor({ state: "visible" });
	await assertRequiredText(page);
	const pageOverflow = await assertPageOverflow(page);
	const elementOverflow = await assertElementOverflow(page);
	const links = await assertRouteLinks(page);
	const representativeRequests = await assertRepresentativeLinkRequests(page);
	const focus = await assertOpenStateRecordFocus(page);

	return {
		route,
		viewport,
		status: "passed",
		responseStatus: response.status(),
		requiredText,
		pageOverflow,
		elementOverflow,
		links,
		representativeRequests,
		focus,
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
			routeChecks.push(await checkRoute(page, viewport));
		}

		await writeReport({
			status: "passed",
			generatedAt: new Date().toISOString(),
			baseUrl,
			viewports,
			routes: [route],
			routeChecks,
		});

		console.log(`Browser QA passed for ${routeChecks.length} route checks.`);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown browser QA failure";
		await writeReport({
			status: "failed",
			generatedAt: new Date().toISOString(),
			baseUrl,
			viewports,
			routes: [route],
			routeChecks,
			error: message,
		});
		throw error;
	} finally {
		await browser.close();
	}
}

await run();
