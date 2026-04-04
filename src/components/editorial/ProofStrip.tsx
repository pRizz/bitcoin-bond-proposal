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
					<div class="panel-wash rounded-[var(--radius-card)] p-4">
						<p class="eyebrow">{item.label}</p>
						<p class="mt-3 text-3xl font-semibold tracking-[-0.05em] text-ink">
							{item.value}
						</p>
						{item.note ? (
							<p class="mt-2 text-sm leading-6 text-ink-subtle/90">
								{item.note}
							</p>
						) : null}
					</div>
				)}
			</For>
		</div>
	);
}
