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
];

export type BrandedLabel = JSX.Element;
