import { A, usePreloadRoute } from "@solidjs/router";
import { For } from "solid-js";

type RegistrySnapshotProps = {
	states: Array<{
		slug: string;
		state: string;
		proposalKind: string;
		editorialPriority: string;
		status: string;
		note: string;
		lastReviewed: string;
	}>;
};

export function RegistrySnapshot(props: RegistrySnapshotProps) {
	const preload = usePreloadRoute();

	return (
		<div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
			<p class="eyebrow">Registry snapshot</p>
			<p class="mt-3 max-w-2xl text-sm leading-7 text-ink-subtle">
				Not every state matters for the same reason. This proof layer groups the
				first batch by what actually strengthens the financing case.
			</p>
			<div class="mt-6 grid gap-3">
				<For each={props.states}>
					{(state) => (
						<A
							class="evidence-card group block rounded-[var(--radius-card)] border border-border-soft/80 bg-panel-strong/85 px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent-muted/80 hover:bg-panel-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
							href={`/states/${state.slug}`}
							onFocus={() => preload(`/states/${state.slug}`)}
							onMouseEnter={() => preload(`/states/${state.slug}`)}
						>
							<div class="flex flex-wrap items-start justify-between gap-4">
								<div class="space-y-3">
									<div>
										<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
											State record
										</p>
										<p class="mt-2 font-serif text-2xl tracking-[-0.04em] text-ink">
											{state.state}
										</p>
									</div>
									<p class="text-sm font-medium uppercase tracking-[0.12em] text-ink-subtle">
										{state.status}
									</p>
									<p class="max-w-md text-sm leading-7 text-ink-subtle/90">
										{state.note}
									</p>
								</div>
								<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-subtle transition-colors duration-200 group-hover:text-accent-soft group-focus-visible:text-accent-soft">
									Open record
								</p>
							</div>
							<div class="mt-5 flex flex-wrap gap-2 border-t border-border-soft/80 pt-4">
								<span class="data-chip text-[0.72rem] font-medium uppercase tracking-[0.12em] text-ink">
									{state.proposalKind}
								</span>
								<span class="data-chip text-[0.72rem] uppercase tracking-[0.12em]">
									{state.editorialPriority}
								</span>
								<span class="data-chip text-[0.72rem] uppercase tracking-[0.12em]">
									Reviewed {state.lastReviewed}
								</span>
							</div>
						</A>
					)}
				</For>
			</div>
		</div>
	);
}
