type MarkdownContentProps = {
	html: string;
};

export function MarkdownContent(props: MarkdownContentProps) {
	return (
		<article
			class="prose prose-slate max-w-none text-ink [&_a]:text-accent [&_a]:underline-offset-4 [&_a:hover]:underline [&_blockquote]:border-accent-soft [&_blockquote]:text-ink-subtle [&_code]:rounded [&_code]:bg-panel-strong [&_code]:px-1 [&_code]:py-0.5 [&_h2]:section-divider [&_h2]:pt-6 [&_table]:w-full [&_td]:align-top [&_th]:text-left"
			innerHTML={props.html}
		/>
	);
}
