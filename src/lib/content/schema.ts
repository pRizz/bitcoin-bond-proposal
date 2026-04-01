import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const NonEmptyStringSchema = z.string().trim().min(1);
const SlugSchema = NonEmptyStringSchema.regex(
  slugPattern,
  "slug must use lowercase letters, numbers, and hyphens",
);
const IsoDateSchema = NonEmptyStringSchema.regex(
  isoDatePattern,
  "date must use YYYY-MM-DD format",
);

const ProposalKindValueSchema = z.enum(["reserve", "bond", "both"]);
const ProposalSubtypeValueSchema = z.enum([
  "strategic-reserve",
  "reserve-financing-bond",
  "bitcoin-linked-bond",
  "bitcoin-collateralized-bond",
  "mixed-digital-asset-reserve",
  "other-explained",
]);
const OutputFormatSchema = z.enum(["pdf"]);

const TaxonomyValueSchema = z.object({
  value: NonEmptyStringSchema,
  description: NonEmptyStringSchema,
});

const SourceLinkSchema = z
  .string()
  .trim()
  .url("source links must be valid URLs");

export const ProposalTaxonomySchema = z.object({
  proposalKinds: z.array(TaxonomyValueSchema).min(1),
  proposalSubtypes: z.array(TaxonomyValueSchema).min(1),
});

export const DocumentFrontmatterSchema = z.object({
  title: NonEmptyStringSchema,
  slug: SlugSchema,
  summary: NonEmptyStringSchema,
  documentKind: z.enum(["one-pager", "draft-bill", "methodology", "explainer"]),
  audience: z.array(z.enum(["legislators", "public", "internal"])).min(1),
  updatedAt: IsoDateSchema,
  outputs: z.array(OutputFormatSchema).default([]),
});

export const StateEntryFrontmatterSchema = z.object({
  title: NonEmptyStringSchema,
  slug: SlugSchema,
  summary: NonEmptyStringSchema,
  state: NonEmptyStringSchema,
  proposalKind: ProposalKindValueSchema,
  proposalSubtype: ProposalSubtypeValueSchema,
  billId: NonEmptyStringSchema,
  chamber: NonEmptyStringSchema,
  status: NonEmptyStringSchema,
  statusAsOf: IsoDateSchema,
  lastReviewed: IsoDateSchema,
  sponsors: z.array(NonEmptyStringSchema).min(1),
  primarySources: z.array(SourceLinkSchema).min(1),
  secondarySources: z.array(SourceLinkSchema).default([]),
  confidence: z.enum(["high", "medium", "low"]),
  effect: NonEmptyStringSchema,
  classificationNote: z.string().trim().optional(),
});

export type ProposalTaxonomy = z.infer<typeof ProposalTaxonomySchema>;
export type DocumentFrontmatter = z.infer<typeof DocumentFrontmatterSchema>;
export type StateEntryFrontmatter = z.infer<typeof StateEntryFrontmatterSchema>;

export type MarkdownRecord<TFrontmatter> = {
  body: string;
  frontmatter: TFrontmatter;
  path: string;
};

export function parseProposalTaxonomy(rawTaxonomy: unknown): ProposalTaxonomy {
  return ProposalTaxonomySchema.parse(rawTaxonomy);
}

export function parseDocumentFrontmatter(
  rawFrontmatter: unknown,
): DocumentFrontmatter {
  return DocumentFrontmatterSchema.parse(rawFrontmatter);
}

export function parseStateEntryFrontmatter(
  rawFrontmatter: unknown,
): StateEntryFrontmatter {
  return StateEntryFrontmatterSchema.parse(rawFrontmatter);
}

export function assertKnownProposalClassification(
  entry: StateEntryFrontmatter,
  taxonomy: ProposalTaxonomy,
): void {
  const knownKinds = new Set(taxonomy.proposalKinds.map((kind) => kind.value));
  const knownSubtypes = new Set(
    taxonomy.proposalSubtypes.map((subtype) => subtype.value),
  );

  if (!knownKinds.has(entry.proposalKind)) {
    throw new Error(`Unknown proposal kind: ${entry.proposalKind}`);
  }

  if (!knownSubtypes.has(entry.proposalSubtype)) {
    throw new Error(`Unknown proposal subtype: ${entry.proposalSubtype}`);
  }
}

export function assertUniqueSlugs(
  records: ReadonlyArray<{ path: string; slug: string }>,
): void {
  const seenPathsBySlug = new Map<string, string>();

  for (const record of records) {
    const maybeExistingPath = seenPathsBySlug.get(record.slug);
    if (maybeExistingPath) {
      throw new Error(
        `Duplicate slug "${record.slug}" in ${maybeExistingPath} and ${record.path}`,
      );
    }

    seenPathsBySlug.set(record.slug, record.path);
  }
}

export function toDateLabel(value: string): string {
  if (!isoDatePattern.test(value)) {
    throw new Error(`Invalid date label: ${value}`);
  }

  return value;
}
