import { z } from "zod";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;

const NonEmptyStringSchema = z.string().trim().min(1);
const SlugSchema = NonEmptyStringSchema.regex(
	slugPattern,
	"slug must use lowercase letters, numbers, and hyphens",
);

function isValidIsoDate(value: string): boolean {
	const match = isoDatePattern.exec(value);
	if (!match) {
		return false;
	}

	const [yearText, monthText, dayText] = value.split("-");
	const year = Number(yearText);
	const month = Number(monthText);
	const day = Number(dayText);
	const parsed = new Date(Date.UTC(year, month - 1, day));

	return (
		parsed.getUTCFullYear() === year &&
		parsed.getUTCMonth() === month - 1 &&
		parsed.getUTCDate() === day
	);
}

const IsoDateStringSchema = NonEmptyStringSchema.regex(
	isoDatePattern,
	"date must use YYYY-MM-DD format",
).refine(
	isValidIsoDate,
	"date must be a valid calendar date in YYYY-MM-DD format",
);
const IsoDateSchema = z.preprocess((value) => {
	if (value instanceof Date) {
		return value.toISOString().slice(0, 10);
	}

	return value;
}, IsoDateStringSchema);

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
const RegistryStatusSchema = z.enum(["unresearched", "queued", "published"]);
const ProposalFocusSchema = z.enum(["bond", "reserve", "both", "unknown"]);
export const RegionSchema = z.enum(["northeast", "midwest", "south", "west"]);
const EditorialPrioritySchema = z.enum([
	"bond-priority",
	"reserve-priority",
	"neutral",
]);
export const LegislativeStatusGroupSchema = z.enum([
	"introduced",
	"advanced",
	"approved",
	"enacted",
	"failed",
]);
const RecordTypeSchema = z.enum([
	"legislative-bill",
	"authority-action",
	"executive-action",
	"other-official-record",
]);
const CandidateSourceAvailabilitySchema = z.enum([
	"official-bill-page",
	"official-pdf-only",
	"official-state-record",
	"secondary-only",
	"none-found",
]);
const CandidateProposalRelevanceSchema = z.enum(["high", "medium", "low"]);
const CandidateReadinessSchema = z.enum([
	"ready-to-author",
	"needs-status-confirmation",
	"defer",
]);
const CandidateNextActionSchema = z.enum([
	"author-state-entry",
	"confirm-final-status",
	"defer-until-stronger-official-source",
]);
const expectedNextActionByReadiness = {
	"ready-to-author": "author-state-entry",
	"needs-status-confirmation": "confirm-final-status",
	defer: "defer-until-stronger-official-source",
} as const;

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

export const StateRegistryManifestEntrySchema = z.object({
	state: NonEmptyStringSchema,
	slug: SlugSchema,
	registryStatus: RegistryStatusSchema,
	proposalFocus: ProposalFocusSchema,
	region: RegionSchema,
	shortNote: NonEmptyStringSchema,
	editorialPriority: EditorialPrioritySchema,
});

export const StateRegistryManifestSchema = z.object({
	states: z.array(StateRegistryManifestEntrySchema).length(50),
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
	recordType: RecordTypeSchema,
	proposalKind: ProposalKindValueSchema,
	proposalSubtype: ProposalSubtypeValueSchema,
	billId: NonEmptyStringSchema,
	chamber: NonEmptyStringSchema,
	status: NonEmptyStringSchema,
	legislativeStatusGroup: LegislativeStatusGroupSchema,
	statusAsOf: IsoDateSchema,
	lastReviewed: IsoDateSchema,
	sponsors: z.array(NonEmptyStringSchema).min(1),
	primarySources: z.array(SourceLinkSchema).min(1),
	secondarySources: z.array(SourceLinkSchema).default([]),
	confidence: z.enum(["high", "medium", "low"]),
	effect: NonEmptyStringSchema,
	classificationNote: z.string().trim().optional(),
});
export const StateCandidateIntakeEntrySchema = z
	.object({
		state: NonEmptyStringSchema,
		slug: SlugSchema,
		sourceAvailability: CandidateSourceAvailabilitySchema,
		proposalRelevance: CandidateProposalRelevanceSchema,
		readiness: CandidateReadinessSchema,
		status: NonEmptyStringSchema,
		statusAsOf: IsoDateSchema,
		officialSourceUrl: SourceLinkSchema.optional(),
		evidenceNote: NonEmptyStringSchema,
		nextAction: CandidateNextActionSchema,
		deferralReason: z.string().trim().optional(),
	})
	.superRefine((entry, context) => {
		const hasOfficialSource = [
			"official-bill-page",
			"official-pdf-only",
			"official-state-record",
		].includes(entry.sourceAvailability);

		if (entry.readiness === "ready-to-author") {
			if (!hasOfficialSource) {
				context.addIssue({
					code: "custom",
					message:
						"ready-to-author candidates require official source availability",
					path: ["sourceAvailability"],
				});
			}

			if (!entry.officialSourceUrl) {
				context.addIssue({
					code: "custom",
					message: "ready-to-author candidates require an officialSourceUrl",
					path: ["officialSourceUrl"],
				});
			}
		}

		if (entry.readiness === "defer" && !entry.deferralReason) {
			context.addIssue({
				code: "custom",
				message: "deferred candidates require a deferralReason",
				path: ["deferralReason"],
			});
		}

		const expectedNextAction = expectedNextActionByReadiness[entry.readiness];
		if (entry.nextAction !== expectedNextAction) {
			context.addIssue({
				code: "custom",
				message: `${entry.readiness} candidates require nextAction ${expectedNextAction}`,
				path: ["nextAction"],
			});
		}
	});

export const StateCandidateIntakeSchema = z.object({
	candidates: z.array(StateCandidateIntakeEntrySchema),
});

export type ProposalTaxonomy = z.infer<typeof ProposalTaxonomySchema>;
export type Region = z.infer<typeof RegionSchema>;
export type ProposalFocus = z.infer<typeof ProposalFocusSchema>;
export type LegislativeStatusGroup = z.infer<
	typeof LegislativeStatusGroupSchema
>;
export type StateRegistryManifest = z.infer<typeof StateRegistryManifestSchema>;
export type StateRegistryManifestEntry = z.infer<
	typeof StateRegistryManifestEntrySchema
>;
export type DocumentFrontmatter = z.infer<typeof DocumentFrontmatterSchema>;
export type StateEntryFrontmatter = z.infer<typeof StateEntryFrontmatterSchema>;
export type CandidateSourceAvailability = z.infer<
	typeof CandidateSourceAvailabilitySchema
>;
export type CandidateProposalRelevance = z.infer<
	typeof CandidateProposalRelevanceSchema
>;
export type CandidateReadiness = z.infer<typeof CandidateReadinessSchema>;
export type CandidateNextAction = z.infer<typeof CandidateNextActionSchema>;
export type StateCandidateIntakeEntry = z.infer<
	typeof StateCandidateIntakeEntrySchema
>;
export type StateCandidateIntake = z.infer<typeof StateCandidateIntakeSchema>;

export type MarkdownRecord<TFrontmatter> = {
	body: string;
	frontmatter: TFrontmatter;
	path: string;
};

export function parseProposalTaxonomy(rawTaxonomy: unknown): ProposalTaxonomy {
	return ProposalTaxonomySchema.parse(rawTaxonomy);
}

export function parseStateRegistryManifest(
	rawManifest: unknown,
): StateRegistryManifest {
	return StateRegistryManifestSchema.parse(rawManifest);
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

export function parseStateCandidateIntake(
	rawCandidates: unknown,
): StateCandidateIntake {
	return StateCandidateIntakeSchema.parse(rawCandidates);
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

export function assertManifestMatchesPublishedStates(
	manifestEntries: ReadonlyArray<StateRegistryManifestEntry>,
	publishedStates: ReadonlyArray<StateEntryFrontmatter>,
): void {
	const entriesBySlug = new Map(
		manifestEntries.map((entry) => [entry.slug, entry] as const),
	);

	for (const publishedState of publishedStates) {
		const maybeManifestEntry = entriesBySlug.get(publishedState.slug);
		if (!maybeManifestEntry) {
			throw new Error(
				`Published state entry "${publishedState.slug}" is missing from the registry manifest`,
			);
		}

		if (
			maybeManifestEntry.registryStatus !== "published" &&
			maybeManifestEntry.registryStatus !== "queued"
		) {
			throw new Error(
				`Manifest entry "${publishedState.slug}" must be marked queued or published when a canonical state file exists`,
			);
		}
	}
}

export function toDateLabel(value: string): string {
	if (!isoDatePattern.test(value)) {
		throw new Error(`Invalid date label: ${value}`);
	}

	return value;
}
