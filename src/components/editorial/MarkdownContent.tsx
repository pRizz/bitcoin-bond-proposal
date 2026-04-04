type MarkdownContentProps = {
	html: string;
};

export function MarkdownContent(props: MarkdownContentProps) {
	return (
		<article
			class="prose max-w-none text-ink [&_a]:text-accent-soft [&_a]:underline-offset-4 [&_a:hover]:text-accent [&_a:hover]:underline [&_blockquote]:border-accent-muted [&_blockquote]:text-ink-subtle [&_code]:rounded [&_code]:bg-panel-strong [&_code]:px-1 [&_code]:py-0.5 [&_h1]:text-ink [&_h2]:section-divider [&_h2]:pt-6 [&_h2]:text-ink [&_h3]:text-ink [&_li]:text-ink-subtle [&_p]:text-ink-subtle [&_strong]:text-ink [&_table]:w-full [&_td]:align-top [&_td]:text-ink-subtle [&_th]:border-b [&_th]:border-border-soft [&_th]:pb-2 [&_th]:text-left [&_th]:text-ink"
			innerHTML={props.html}
		/>
	);
}
