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
		<div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
			<For each={props.items}>
				{(item) => (
					<div class="panel-wash rounded-[var(--radius-card)] border border-border-soft/80 bg-panel-strong/85 p-5">
						<p class="eyebrow text-accent-soft">{item.label}</p>
						<p class="mt-4 font-serif text-4xl tracking-[-0.05em] text-ink">
							{item.value}
						</p>
						{item.note ? (
							<div class="mt-4 border-t border-border-soft/80 pt-4">
								<p class="max-w-[30ch] text-sm leading-7 text-ink-subtle/90">
									{item.note}
								</p>
							</div>
						) : null}
					</div>
				)}
			</For>
		</div>
	);
}
