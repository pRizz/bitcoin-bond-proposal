import { Meta, Title } from "@solidjs/meta";

import { BondReservePathway } from "../../components/editorial/BondReservePathway";
import { PacketFeature } from "../../components/editorial/PacketFeature";
import { PageSection } from "../../components/editorial/PageSection";
import { ProofStrip } from "../../components/editorial/ProofStrip";
import { RegistrySnapshot } from "../../components/editorial/RegistrySnapshot";
import { ActionLink } from "../../components/editorial/ActionLink";
import { getPublishedStates, getRegistryStats } from "../../lib/site/content";
import { makePageTitle } from "../../lib/site/seo";

export default function HomePage() {
  const registryStats = getRegistryStats();
  const publishedStates = getPublishedStates();

  return (
    <>
      <Title>{makePageTitle("Bond-financed reserve accumulation")}</Title>
      <Meta
        name="description"
        content="Editorial-financial research on why states should consider disciplined, bond-financed Bitcoin reserve accumulation."
      />

      <section class="story-grid gap-6 lg:items-start">
        <div class="poster-frame grain-overlay overflow-hidden rounded-[calc(var(--radius-soft)+0.25rem)] p-7 sm:p-10">
          <p class="eyebrow text-accent-soft">Public case</p>
          <h1 class="mt-4 max-w-4xl text-5xl text-canvas-soft sm:text-6xl">
            States can finance long-horizon Bitcoin reserve accumulation without
            pretending taxpayer-funded accumulation is the only path.
          </h1>
          <p class="mt-6 max-w-3xl text-lg leading-8 text-white/82">
            This is a public-finance case, not a generic Bitcoin allocation pitch.
            The Illinois packet is the model. The financing explainer is the
            argument. The registry is the proof.
          </p>
          <p class="mt-4 text-sm uppercase tracking-[0.18em] text-white/52">
            Model / Argument / Proof
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <ActionLink href="/states/illinois" intent="primary">
              Read the Illinois model packet
            </ActionLink>
            <ActionLink
              href="/explainers/bond-financed-reserve-accumulation"
              intent="secondary"
            >
              Read the financing explainer
            </ActionLink>
            <ActionLink href="/states" intent="secondary">
              Browse state proposals
            </ActionLink>
          </div>
        </div>

        <aside class="proof-rail space-y-4">
          <ProofStrip
            items={[
              {
                label: "Published states",
                value: String(registryStats.publishedCount),
                note: "First batch of fully researched records already on the site shell path.",
              },
              {
                label: "Bond-priority",
                value: String(registryStats.bondPriorityCount),
                note: "States whose strategic relevance leans most toward bond-financed accumulation.",
              },
              {
                label: "Latest review",
                value: registryStats.latestReview ?? "Unavailable",
                note: "Registry freshness remains visible by rule.",
              },
            ]}
          />
          <PacketFeature />
        </aside>
      </section>

      <PageSection
        eyebrow="Signal"
        title="The financing case comes first. The registry proves it second."
        lead="The first reading path is deliberate: understand the financing logic, then inspect the live state evidence that supports or limits it."
      >
        <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <BondReservePathway />
          <RegistrySnapshot
            states={publishedStates.map((state) => ({
              slug: state.slug,
              state: state.state,
              proposalKind: state.proposalKind,
              editorialPriority: state.editorialPriority,
              status: state.status,
              note: state.shortNote,
              lastReviewed: state.lastReviewed,
            }))}
          />
        </div>
        <div class="mt-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.14em] text-ink-subtle">
          <span class="data-chip">Pathway diagram = financing logic</span>
          <span class="data-chip">Registry snapshot = current proof layer</span>
        </div>
      </PageSection>

      <PageSection
        eyebrow="Read first"
        title="Start with the Illinois packet, then read the financing case, then inspect the registry"
        lead="The site now has three layers: the Illinois model, the financing argument, and the descriptive registry. They should read like parts of one finished product, not three adjacent surfaces."
      >
        <div class="grid gap-4 lg:grid-cols-3">
          <div class="panel-wash rounded-[var(--radius-card)] p-6">
            <p class="eyebrow">Illinois packet</p>
            <p class="mt-4 text-base leading-7 text-ink-subtle">
              The Illinois packet is the normative model: one-pager, draft bill, and
              methodology aligned around a reserve-financing Bitcoin-backed bond
              pathway.
            </p>
          </div>
          <div class="panel-wash rounded-[var(--radius-card)] p-6">
            <p class="eyebrow">First explainer</p>
            <p class="mt-4 text-base leading-7 text-ink-subtle">
              The first deep explainer makes the key argument explicit: financing
              structure changes the public-finance logic. That is the difference
              between a serious model and a loose reserve slogan.
            </p>
            <div class="mt-5">
              <ActionLink
                href="/explainers/bond-financed-reserve-accumulation"
                intent="secondary"
              >
                Open the explainer
              </ActionLink>
            </div>
          </div>
          <div class="panel-wash rounded-[var(--radius-card)] p-6">
            <p class="eyebrow">Registry proof</p>
            <p class="mt-4 text-base leading-7 text-ink-subtle">
              The registry is descriptive, source-first, and willing to say when a
              proposal is reserve-heavy, weak, symbolic, or not meaningfully
              bond-relevant.
            </p>
          </div>
        </div>
      </PageSection>
    </>
  );
}
