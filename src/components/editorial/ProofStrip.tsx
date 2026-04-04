import { For } from "solid-js";

type ProofStripProps = {
	items: Array<{
		label: string;
		value: string;
		note?: string;
	}>;
};

export function ProofStrip(props: ProofStripProps) {
	return (
		<div class="grid gap-3 sm:grid-cols-3">
			<For each={props.items}>
				{(item) => (
					<div class="panel-wash rounded-[var(--radius-card)] border border-border-soft/80 bg-panel-strong/85 p-4">
						<p class="eyebrow text-accent-soft">{item.label}</p>
						<p class="mt-3 font-serif text-4xl tracking-[-0.05em] text-ink">
							{item.value}
						</p>
						{item.note ? (
							<p class="mt-2 max-w-[28ch] text-sm leading-6 text-ink-subtle/90">
								{item.note}
							</p>
						) : null}
					</div>
				)}
			</For>
		</div>
	);
}
