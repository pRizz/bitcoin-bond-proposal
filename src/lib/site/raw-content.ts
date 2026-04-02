const docsByPath = import.meta.glob("../../../content/docs/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const explainersByPath = import.meta.glob("../../../content/docs/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const statesByPath = import.meta.glob("../../../content/states/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function normalizeContentPath(contentPath: string): string {
  return `../../../${contentPath}`;
}

function stripFrontmatter(markdownSource: string): string {
  if (!markdownSource.startsWith("---\n")) {
    return markdownSource;
  }

  const frontmatterEndIndex = markdownSource.indexOf("\n---\n", 4);
  if (frontmatterEndIndex === -1) {
    return markdownSource;
  }

  return markdownSource.slice(frontmatterEndIndex + 5).trim();
}

export function readDocumentBody(contentPath: string): string | undefined {
  const rawDocument = docsByPath[normalizeContentPath(contentPath)] as
    | string
    | undefined;
  return rawDocument ? stripFrontmatter(rawDocument) : undefined;
}

export function readExplainerBody(contentPath: string): string | undefined {
  const rawExplainer = explainersByPath[normalizeContentPath(contentPath)] as
    | string
    | undefined;
  return rawExplainer ? stripFrontmatter(rawExplainer) : undefined;
}

export function readStateBody(contentPath: string): string | undefined {
  const rawState = statesByPath[normalizeContentPath(contentPath)] as
    | string
    | undefined;
  return rawState ? stripFrontmatter(rawState) : undefined;
}
