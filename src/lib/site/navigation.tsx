import type { JSX } from "solid-js";

export type NavigationLink = {
	href: string;
	label: string;
	description?: string;
};

export const siteNavigation: NavigationLink[] = [
	{
		href: "/",
		label: "Thesis",
		description: "Why bond-financed reserve accumulation matters.",
	},
	{
		href: "/methodology",
		label: "Methodology",
		description: "How the registry classifies, sources, and labels records.",
	},
	{
		href: "/states",
		label: "States",
		description: "Browse the current registry batch and supporting facts.",
	},
	{
		href: "/explainers/bond-financed-reserve-accumulation",
		label: "Explainer",
		description:
			"Why the financing structure changes the whole public-finance argument.",
	},
];

export type BrandedLabel = JSX.Element;
