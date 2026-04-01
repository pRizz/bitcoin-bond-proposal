#!/usr/bin/env bun

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  assertKnownProposalClassification,
  assertManifestMatchesPublishedStates,
  assertUniqueSlugs,
  parseDocumentFrontmatter,
  parseProposalTaxonomy,
  parseStateRegistryManifest,
  parseStateEntryFrontmatter,
} from "../src/lib/content/schema.ts";
import { readMarkdownCollection } from "../src/lib/content/load-markdown.ts";

type ValidationResult = {
  canonicalDocumentCount: number;
  manifestStateCount: number;
  stateEntryCount: number;
};

async function readProposalTaxonomy() {
  const taxonomyPath = path.join(
    process.cwd(),
    "content",
    "data",
    "proposal-taxonomy.json",
  );
  const rawTaxonomy = await readFile(taxonomyPath, "utf8");

  return parseProposalTaxonomy(JSON.parse(rawTaxonomy));
}

async function readStateRegistryManifest() {
  const manifestPath = path.join(
    process.cwd(),
    "content",
    "data",
    "state-registry-manifest.json",
  );
  const rawManifest = await readFile(manifestPath, "utf8");

  return parseStateRegistryManifest(JSON.parse(rawManifest));
}

async function validateCanonicalDocuments(): Promise<
  Array<{ path: string; slug: string }>
> {
  const documentsPath = path.join(process.cwd(), "content", "docs");
  const explainersPath = path.join(process.cwd(), "content", "explainers");

  const [documents, explainers] = await Promise.all([
    readMarkdownCollection(documentsPath, parseDocumentFrontmatter),
    readMarkdownCollection(explainersPath, parseDocumentFrontmatter),
  ]);

  return [...documents, ...explainers].map((record) => ({
    path: path.relative(process.cwd(), record.path),
    slug: record.frontmatter.slug,
  }));
}

async function validateStateEntries() {
  const taxonomy = await readProposalTaxonomy();
  const statesPath = path.join(process.cwd(), "content", "states");
  const stateEntries = await readMarkdownCollection(
    statesPath,
    parseStateEntryFrontmatter,
  );

  for (const stateEntry of stateEntries) {
    assertKnownProposalClassification(stateEntry.frontmatter, taxonomy);
  }

  return stateEntries.map((record) => ({
    path: path.relative(process.cwd(), record.path),
    slug: record.frontmatter.slug,
    frontmatter: record.frontmatter,
  }));
}

async function validateContent(): Promise<ValidationResult> {
  const [documentRecords, stateRecords, stateManifest] = await Promise.all([
    validateCanonicalDocuments(),
    validateStateEntries(),
    readStateRegistryManifest(),
  ]);

  const manifestRecords = stateManifest.states.map((entry) => ({
    path: "content/data/state-registry-manifest.json",
    slug: entry.slug,
  }));

  assertUniqueSlugs([...documentRecords, ...stateRecords]);
  assertUniqueSlugs(manifestRecords);
  assertManifestMatchesPublishedStates(
    stateManifest.states,
    stateRecords.map((record) => record.frontmatter),
  );

  return {
    canonicalDocumentCount: documentRecords.length,
    manifestStateCount: stateManifest.states.length,
    stateEntryCount: stateRecords.length,
  };
}

async function run() {
  try {
    const result = await validateContent();

    console.log(
      `Validated ${result.canonicalDocumentCount} document(s), ${result.manifestStateCount} manifest state entr${
        result.manifestStateCount === 1 ? "y" : "ies"
      }, and ${result.stateEntryCount} published state entr${
        result.stateEntryCount === 1 ? "y" : "ies"
      }.`,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown validation error";
    console.error(`Content validation failed: ${message}`);
    process.exitCode = 1;
  }
}

await run();
