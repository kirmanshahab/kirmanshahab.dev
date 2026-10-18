import { timeline } from "#root/content/site-data";

export function Timeline() {
  return (
    <ol className="border-l border-line">
      {timeline.map((t) => (
        <li key={t.period} className="relative grid gap-1 pb-8 pl-6 last:pb-0 md:grid-cols-[160px_1fr] md:gap-6">
          <span className="absolute top-2 -left-[4.5px] size-2 rounded-full border border-line-strong bg-bg" aria-hidden />
          <p className="font-mono text-small text-muted num">{t.period}</p>
          <div className="grid gap-1">
            <p className="flex flex-col text-body font-medium text-ink sm:block">
              {t.title} <span className="font-normal text-muted"><span className="hidden sm:inline">· </span>{t.org}</span>
            </p>
            {t.note && <p className="text-small text-muted">{t.note}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}
