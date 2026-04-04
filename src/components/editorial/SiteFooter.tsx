import { A } from "@solidjs/router";
import type { JSX } from "solid-js";

import type { NavigationLink } from "../../lib/site/navigation";

type SiteFooterProps = {
	links: NavigationLink[];
	secondary: JSX.Element;
};

export function SiteFooter(props: SiteFooterProps) {
	return (
		<footer class="border-t border-border-soft/80 bg-canvas-soft/55">
			<div class="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8">
				<div class="space-y-2">
					<p class="eyebrow">Public research shell</p>
					<p class="max-w-2xl text-sm leading-6 text-ink-subtle">
						Editorial-financial research on state Bitcoin reserve and bond
						policy. Public-facing by design, source-first by rule.
					</p>
				</div>
				<div class="space-y-3 text-sm text-ink-subtle">
					<div class="flex flex-wrap gap-3">
						{props.links.map((link) => (
							<A
								class="underline-offset-4 transition-colors hover:text-accent-soft hover:underline"
								href={link.href}
							>
								{link.label}
							</A>
						))}
					</div>
					<p>{props.secondary}</p>
				</div>
			</div>
		</footer>
	);
}
