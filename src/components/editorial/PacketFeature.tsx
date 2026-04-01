import { ActionLink } from "./ActionLink";

export function PacketFeature() {
  return (
    <div class="panel-wash rounded-[calc(var(--radius-soft)+0.25rem)] p-6 sm:p-8">
      <p class="eyebrow">Featured packet</p>
      <h3 class="mt-3 text-3xl text-ink sm:text-4xl">Illinois model packet</h3>
      <p class="mt-4 max-w-2xl text-base leading-7 text-ink-subtle">
        The Illinois packet is the project&apos;s concrete policy model: one-pager,
        counsel-serious draft bill, and methodology memo aligned around disciplined,
        bond-financed reserve accumulation.
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <ActionLink href="/states/illinois" intent="primary">
          Read the Illinois model packet
        </ActionLink>
        <ActionLink href="/methodology" intent="secondary">
          Review methodology
        </ActionLink>
      </div>
    </div>
  );
}
