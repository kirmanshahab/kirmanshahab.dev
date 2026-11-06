import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { site } from "@/site.config";
import { BrowserFrame } from "../frame";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero relative grid items-center gap-12 overflow-x-clip pt-12 pb-8 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-16">
      <div className="relative z-10 grid content-start gap-6 lg:col-span-6">
        <p className="pill justify-self-start">
          <span className="status-dot" aria-hidden />
          {site.availability}
        </p>
        <h1 id="hero-title" className="text-display-sm lg:text-display">
          I design and build the software businesses <span className="hero-mark">run on.</span>
        </h1>
        <p className="max-w-[48ch] text-lead text-ink-2">
          Technical architect and full-stack engineer in Lahore. I led a team of ten to ship a CRM that now runs at 10+
          companies, and I built a bakery’s whole system end to end: online shop, back office and a staff phone app.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/work/liha-platform" className="btn btn-primary">
            See the LIHA platform <ArrowRight size={16} strokeWidth={1.5} aria-hidden />
          </Link>
          <a href={site.resumePdf} className="btn btn-secondary" download>
            <Download size={16} strokeWidth={1.5} aria-hidden /> Download resume
          </a>
        </div>
      </div>

      <div className="hero-visual relative lg:col-span-6">
        <div className="hero-glow" aria-hidden />
        <BrowserFrame
          src="/work/liha/erp-stock-levels.webp"
          alt="The LIHA back office showing stock levels per branch"
          width={1440}
          height={820}
          url="admin · stock levels"
          sizes="(min-width: 1024px) 640px, 100vw"
          priority
          className="relative w-[88%] ml-auto"
        />
        <BrowserFrame
          src="/work/liha/storefront-checkout.webp"
          alt="The LIHA online shop checkout with delivery and payment options"
          width={1280}
          height={820}
          url="liha · checkout"
          sizes="(min-width: 1024px) 380px, 60vw"
          className="absolute bottom-[-10%] left-0 w-[52%] md:bottom-[-14%]"
        />
      </div>
    </section>
  );
}
