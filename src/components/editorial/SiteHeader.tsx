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
		<header class="sticky top-0 z-40 border-b border-border-soft/80 bg-canvas-soft/82 shadow-[0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl">
			<div class="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<A
					class="font-serif text-lg tracking-[-0.04em] text-ink no-underline sm:text-xl"
					href="/"
					onFocus={() => preload("/")}
					onMouseEnter={() => preload("/")}
				>
					{props.brand}
				</A>
				<nav class="flex flex-wrap items-center gap-2 sm:justify-end sm:gap-3">
					{props.links.map((link) => {
						const isActive = location.pathname === link.href;

						return (
							<A
								class={cn(
									"rounded-full border px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-colors sm:text-[0.78rem]",
									isActive
										? "border-accent-muted/70 bg-accent-wash/90 text-accent-soft"
										: "border-transparent text-ink-subtle hover:border-border-soft hover:bg-panel-strong/85 hover:text-ink",
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
