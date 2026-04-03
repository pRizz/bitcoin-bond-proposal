import { readFileSync } from "node:fs";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@solidjs/start/config";

type GeneratedContentGraph = {
	registry?: {
		publishedSlugs?: string[];
	};
};

function readPublishedStateRoutes(): string[] {
	const graphPath = path.join(process.cwd(), "generated", "content-graph.json");
	const rawGraph = readFileSync(graphPath, "utf8");
	const graph = JSON.parse(rawGraph) as GeneratedContentGraph;
	const publishedSlugs = graph.registry?.publishedSlugs ?? [];

	return publishedSlugs.map((slug) => `/states/${slug}`);
}

function normalizePublicBasePath(maybeBasePath: string | undefined): string {
	if (!maybeBasePath || maybeBasePath === "/") {
		return "/";
	}

	const trimmedBasePath = maybeBasePath.trim().replace(/^\/+|\/+$/g, "");

	return trimmedBasePath ? `/${trimmedBasePath}/` : "/";
}

const publicBasePath = normalizePublicBasePath(process.env.PUBLIC_BASE_PATH);

export default defineConfig({
	server: {
		baseURL: publicBasePath,
		prerender: {
			crawlLinks: true,
			routes: [
				"/",
				"/explainers/bond-financed-reserve-accumulation",
				"/methodology",
				"/packet/illinois",
				"/states",
				...readPublishedStateRoutes(),
			],
		},
	},
	vite: {
		base: publicBasePath,
		plugins: [tailwindcss()],
	},
});
