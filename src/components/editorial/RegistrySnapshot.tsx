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
  return (
    <div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
      <p class="eyebrow">Registry snapshot</p>
      <div class="mt-6 grid gap-3">
        <For each={props.states}>
          {(state) => (
            <div class="evidence-card flex flex-wrap items-start justify-between gap-3 rounded-[var(--radius-card)] border border-border-soft bg-white/55 px-4 py-3 transition-transform duration-300 hover:-translate-y-0.5">
              <div class="space-y-1">
                <p class="text-sm font-semibold text-ink">{state.state}</p>
                <p class="text-sm text-ink-subtle">{state.status}</p>
                <p class="max-w-md text-sm leading-6 text-ink-subtle">{state.note}</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="data-chip text-[0.72rem] font-medium uppercase tracking-[0.12em]">
                  {state.proposalKind}
                </span>
                <span class="data-chip text-[0.72rem] uppercase tracking-[0.12em]">
                  {state.editorialPriority}
                </span>
                <span class="data-chip text-[0.72rem]">Reviewed {state.lastReviewed}</span>
              </div>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
