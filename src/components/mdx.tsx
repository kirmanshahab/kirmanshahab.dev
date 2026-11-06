import * as runtime from "react/jsx-runtime";
import { BrowserFrame } from "./frame";

// Velite compiles MDX at build time into a function body. It is evaluated here,
// on the server, during static rendering; the browser never runs it.
type MDXModule = { default: (props: { components?: Record<string, React.ComponentType> }) => React.ReactNode };
const evaluate = (code: string) => new Function(code)({ ...runtime }) as MDXModule;

/** <Shot src alt w h url caption /> — a screenshot in a browser window with a caption. */
function Shot({ src, alt, w, h, url, caption }: { src: string; alt: string; w: number; h: number; url?: string; caption?: string }) {
  return (
    <div className="my-8 grid gap-3">
      <BrowserFrame src={src} alt={alt} width={w} height={h} url={url} sizes="(min-width: 768px) 680px, 100vw" />
      {caption && <p className="text-small text-muted">{caption}</p>}
    </div>
  );
}

/** <Flow steps={["a","b"]} /> — a left-to-right chain of boxes for simple flows. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <ol className="my-8 grid gap-2 md:grid-flow-col md:auto-cols-fr">
      {steps.map((t, i) => (
        <li key={t} className="relative rounded-[14px] border border-line bg-surface p-4 text-small text-ink-2">
          <span className="num mb-1 block font-mono text-micro text-accent">{String(i + 1).padStart(2, "0")}</span>
          {t}
        </li>
      ))}
    </ol>
  );
}

const components = {
  Shot,
  Flow,
  h2: (p: React.ComponentProps<"h2">) => <h2 className="mt-12 mb-4 text-h2 text-ink" {...p} />,
  h3: (p: React.ComponentProps<"h3">) => <h3 className="mt-8 mb-3 text-h3 text-ink" {...p} />,
  p: (p: React.ComponentProps<"p">) => <p className="mb-4 text-body text-ink-2" {...p} />,
  a: (p: React.ComponentProps<"a">) => <a className="link text-ink" {...p} />,
  ul: (p: React.ComponentProps<"ul">) => <ul className="mb-4 list-disc pl-6 text-ink-2 marker:text-faint" {...p} />,
  ol: (p: React.ComponentProps<"ol">) => <ol className="mb-4 list-decimal pl-6 text-ink-2 marker:text-muted" {...p} />,
  li: (p: React.ComponentProps<"li">) => <li className="mb-2 pl-1" {...p} />,
  strong: (p: React.ComponentProps<"strong">) => <strong className="font-medium text-ink" {...p} />,
  em: (p: React.ComponentProps<"em">) => <em className="not-italic text-ink" {...p} />,
  code: (p: React.ComponentProps<"code">) => <code className="rounded-[4px] bg-surface-2 px-1 font-mono text-[0.9em]" {...p} />,
};

export function MDXContent({ code }: { code: string }) {
  // MDX content is a plain function of its props (no hooks), so calling it directly is safe.
  return evaluate(code).default({ components: components as unknown as Record<string, React.ComponentType> });
}
