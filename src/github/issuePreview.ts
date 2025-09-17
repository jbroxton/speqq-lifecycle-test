export type PreviewItem = { title: string; labels: string[]; body: string };
export function formatGitHubIssuePreview(story: { storyNumber: number; title: string; description?: string }, acs: Array<{ n: number; text: string }>, breakout = false): { items: PreviewItem[] } {
  const baseLabels = Array.from(new Set(['speqq', `US_${story.storyNumber}`]));
  const lines = [String(story.description || '').trim(), '', '### Acceptance Criteria', ...acs.map(a => `- [ ] AC_${a.n}: ${a.text}`)];
  const parent: PreviewItem = { title: `US_${story.storyNumber}: ${story.title}`, labels: baseLabels, body: lines.join('\n') };
  if (!breakout) return { items: [parent] };
  const children: PreviewItem[] = acs.map(a => ({ title: `AC_${a.n}: ${a.text.slice(0, 80)}`, labels: Array.from(new Set([...baseLabels, `AC_${a.n}`])), body: `- [ ] AC_${a.n}: ${a.text}` }));
  return { items: [parent, ...children] };
}