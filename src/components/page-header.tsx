export function PageHeader({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <header className="grid max-w-[720px] gap-4 pt-16 pb-12 md:pt-24 md:pb-16">
      <p className="micro">{eyebrow}</p>
      <h1 className="text-h1">{title}</h1>
      {lead && <p className="text-lead text-ink-2">{lead}</p>}
      {children}
    </header>
  );
}
