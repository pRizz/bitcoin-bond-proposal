import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { MarkdownRecord } from "./schema";

export async function listMarkdownFiles(
	rootDirectory: string,
): Promise<string[]> {
	const entries = await readdir(rootDirectory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = path.join(rootDirectory, entry.name);

			if (entry.isDirectory()) {
				return listMarkdownFiles(entryPath);
			}

			if (entry.name.endsWith(".md")) {
				return [entryPath];
			}

			return [];
		}),
	);

	return files
		.flat()
		.sort((leftPath, rightPath) => leftPath.localeCompare(rightPath));
}

export async function readMarkdownRecord<TFrontmatter>(
	filePath: string,
	parseFrontmatter: (rawFrontmatter: unknown) => TFrontmatter,
): Promise<MarkdownRecord<TFrontmatter>> {
	const rawContent = await readFile(filePath, "utf8");
	const parsedContent = matter(rawContent);

	return {
		body: parsedContent.content.trim(),
		frontmatter: parseFrontmatter(parsedContent.data),
		path: filePath,
	};
}

export async function readMarkdownCollection<TFrontmatter>(
	rootDirectory: string,
	parseFrontmatter: (rawFrontmatter: unknown) => TFrontmatter,
): Promise<MarkdownRecord<TFrontmatter>[]> {
	const filePaths = await listMarkdownFiles(rootDirectory);

	return Promise.all(
		filePaths.map((filePath) => readMarkdownRecord(filePath, parseFrontmatter)),
	);
}
