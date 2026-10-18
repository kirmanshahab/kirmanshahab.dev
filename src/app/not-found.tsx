import Link from "next/link";
import { nav } from "@/site.config";

export default function NotFound() {
  return (
    <div className="container-page">
      <div className="grid max-w-[640px] gap-6 pt-24 md:pt-32">
        <p className="font-mono text-small text-muted">
          <span className="text-accent">GET</span> {"·"} 404 Not Found
        </p>
        <h1 className="text-h1">This route returned 404. Here’s what does exist:</h1>
        <ul className="grid border-t border-line font-mono text-small">
          {[{ href: "/" as const, label: "Home" }, ...nav].map((n) => (
            <li key={n.href} className="border-b border-line">
              <Link href={n.href} className="flex justify-between py-3 text-ink-2 hover:text-accent">
                <span>{n.href}</span>
                <span className="text-muted">{n.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
