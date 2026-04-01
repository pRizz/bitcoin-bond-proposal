const docsByPath = import.meta.glob("../../../content/docs/*.md", {
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

export function readDocumentBody(contentPath: string): string | undefined {
  return docsByPath[normalizeContentPath(contentPath)] as string | undefined;
}

export function readStateBody(contentPath: string): string | undefined {
  return statesByPath[normalizeContentPath(contentPath)] as string | undefined;
}
