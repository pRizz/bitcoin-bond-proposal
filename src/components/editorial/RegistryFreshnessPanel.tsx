import type { RegistryFreshnessSummary } from "../../lib/site/content";

type RegistryFreshnessPanelProps = {
	summary: RegistryFreshnessSummary;
	note: string;
};

const toneLabels = {
	current: "Current",
	aging: "Review soon",
	due: "Review due",
} as const;

const toneClasses = {
	current: "border border-success/35 bg-success/12 text-success",
	aging: "border border-border-soft bg-panel-strong/85 text-ink-subtle",
	due: "border border-accent-muted/70 bg-accent-wash/85 text-accent-soft",
} as const;

export function RegistryFreshnessPanel(props: RegistryFreshnessPanelProps) {
	return (
		<div class="panel-wash mb-6 rounded-[var(--radius-card)] p-5 sm:p-6">
			<p class="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-accent-soft">
				Freshness
			</p>
			<p class="mt-2 max-w-3xl text-sm leading-7 text-ink-subtle">
				{props.summary.lead}
			</p>
			<p class="mt-3 text-sm leading-7 text-ink-subtle">
				Generated {props.summary.generatedAt.slice(0, 10)}. Latest review{" "}
				{props.summary.latestReview ?? "Unavailable"}.
			</p>
			<div class="mt-4 flex flex-wrap gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em]">
				{(["current", "aging", "due"] as const).map((tone) => (
					<span class={`rounded-full px-3 py-1 ${toneClasses[tone]}`}>
						{toneLabels[tone]} {props.summary.counts[tone]}
					</span>
				))}
			</div>
			<p class="mt-4 max-w-3xl text-sm leading-7 text-ink-subtle">
				{props.note}
			</p>
		</div>
	);
}
