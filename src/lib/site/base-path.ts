export function normalizeBasePath(maybeBasePath: string | undefined): string {
	if (!maybeBasePath || maybeBasePath === "/") {
		return "/";
	}

	const trimmedBasePath = maybeBasePath.trim().replace(/^\/+|\/+$/g, "");

	return trimmedBasePath ? `/${trimmedBasePath}/` : "/";
}

export function prependBasePath(
	href: string,
	maybeBasePath: string | undefined,
): string {
	if (!href.startsWith("/") || href.startsWith("//")) {
		return href;
	}

	const basePath = normalizeBasePath(maybeBasePath);

	if (basePath === "/") {
		return href;
	}

	return `${basePath.slice(0, -1)}${href}`;
}

export function getRouterBasePath(
	maybeBasePath: string | undefined,
): string | undefined {
	const basePath = normalizeBasePath(maybeBasePath);

	return basePath === "/" ? undefined : basePath.slice(0, -1);
}
