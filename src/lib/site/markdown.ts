import MarkdownIt from "markdown-it";

import { prependBasePath } from "./base-path";

function createMarkdownRenderer(basePath: string): MarkdownIt {
	const markdown = new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true,
	});

	const defaultLinkOpenRenderer =
		markdown.renderer.rules.link_open ??
		((tokens, index, options, _env, self) =>
			self.renderToken(tokens, index, options));

	markdown.renderer.rules.link_open = (tokens, index, options, env, self) => {
		const token = tokens[index];

		if (!token) {
			return defaultLinkOpenRenderer(tokens, index, options, env, self);
		}

		const hrefAttributeIndex = token.attrIndex("href");

		if (hrefAttributeIndex >= 0) {
			const hrefAttribute = token.attrs?.[hrefAttributeIndex];

			if (hrefAttribute) {
				hrefAttribute[1] = prependBasePath(hrefAttribute[1], basePath);
			}
		}

		return defaultLinkOpenRenderer(tokens, index, options, env, self);
	};

	return markdown;
}

export function renderMarkdown(markdownSource: string): string {
	return createMarkdownRenderer(import.meta.env.BASE_URL).render(
		markdownSource,
	);
}
