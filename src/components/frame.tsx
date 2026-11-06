import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Text shown in the address bar. */
  url?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** A screenshot in a browser window, so product images read as real software. */
export function BrowserFrame({ src, alt, width, height, url, sizes, priority, className = "" }: Props) {
  return (
    <figure
      className={`overflow-hidden rounded-[14px] border border-line-strong bg-surface shadow-[0_30px_60px_-30px_rgb(60_30_10/0.35)] dark:shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-line bg-surface-2 px-3 py-2" aria-hidden>
        <span className="flex gap-2">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        {url && (
          <span className="min-w-0 flex-1 truncate rounded-md bg-surface px-3 py-1 text-center font-mono text-micro text-muted">
            {url}
          </span>
        )}
      </div>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="h-auto w-full" />
    </figure>
  );
}
