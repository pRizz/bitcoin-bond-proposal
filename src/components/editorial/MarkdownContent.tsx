type MarkdownContentProps = {
	html: string;
};

export function MarkdownContent(props: MarkdownContentProps) {
	return (
		<article
			class="prose max-w-none text-ink [&_a]:text-accent-soft [&_a]:underline-offset-4 [&_a:hover]:text-accent [&_a:hover]:underline [&_blockquote]:rounded-[var(--radius-card)] [&_blockquote]:border [&_blockquote]:border-accent-muted/70 [&_blockquote]:bg-panel-strong/85 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:text-ink-subtle [&_code]:rounded [&_code]:bg-panel-strong [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-6 [&_h1]:text-ink [&_h2]:mb-4 [&_h2]:section-divider [&_h2]:pt-6 [&_h2]:text-ink [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-ink [&_li]:leading-7 [&_li]:text-ink-subtle [&_li+li]:mt-2 [&_ol]:space-y-2 [&_p]:leading-8 [&_p]:text-ink-subtle [&_p+ol]:mt-4 [&_p+ul]:mt-4 [&_strong]:text-ink [&_table]:w-full [&_table]:text-sm [&_tbody_tr]:border-t [&_tbody_tr]:border-border-soft/80 [&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td]:text-ink-subtle [&_th]:border-b [&_th]:border-border-soft [&_th]:pb-3 [&_th]:pr-4 [&_th]:text-left [&_th]:text-[0.78rem] [&_th]:uppercase [&_th]:tracking-[0.14em] [&_th]:text-ink [&_ul]:space-y-2"
			innerHTML={props.html}
		/>
	);
}
