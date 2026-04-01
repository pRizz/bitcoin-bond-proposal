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

export default defineConfig({
  server: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/methodology", "/states", ...readPublishedStateRoutes()],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
