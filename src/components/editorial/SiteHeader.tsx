import { A, useLocation, usePreloadRoute } from "@solidjs/router";
import type { JSX } from "solid-js";

import { cn } from "../../lib/site/cn";
import type { NavigationLink } from "../../lib/site/navigation";

type SiteHeaderProps = {
	brand: JSX.Element;
	links: NavigationLink[];
};

export function SiteHeader(props: SiteHeaderProps) {
	const location = useLocation();
	const preload = usePreloadRoute();

	return (
		<header class="sticky top-0 z-40 border-b border-border-soft/80 bg-canvas-soft/85 backdrop-blur">
			<div class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
				<A
					class="font-serif text-lg tracking-[-0.04em] text-ink no-underline sm:text-xl"
					href="/"
					onFocus={() => preload("/")}
					onMouseEnter={() => preload("/")}
				>
					{props.brand}
				</A>
				<nav class="flex items-center gap-2 sm:gap-3">
					{props.links.map((link) => {
						const isActive = location.pathname === link.href;

						return (
							<A
								class={cn(
									"rounded-full px-3 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-colors",
									isActive
										? "bg-accent-soft text-ink"
										: "text-ink-subtle hover:bg-white/60 hover:text-ink",
								)}
								href={link.href}
								onFocus={() => preload(link.href)}
								onMouseEnter={() => preload(link.href)}
							>
								{link.label}
							</A>
						);
					})}
				</nav>
			</div>
		</header>
	);
}
