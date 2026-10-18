import type { Metadata } from "next";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { CopyEmail } from "@/components/copy-email";
import { PageHeader } from "@/components/page-header";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Email Kirman Shahab, book a call, or connect on LinkedIn and GitHub.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { label: "Book a 30-minute call", detail: "cal.com/kirmanshahab", href: site.cal, icon: CalendarDays },
  { label: "LinkedIn", detail: "kirman-shahab", href: site.linkedin, icon: ArrowUpRight },
  { label: "GitHub", detail: site.githubUser, href: site.github, icon: ArrowUpRight },
];

export default function Contact() {
  return (
    <div className="container-page">
      <PageHeader
        eyebrow="Contact"
        title="Let’s talk"
        lead="I’m open to senior full-stack and product-engineering roles, remote or with relocation. Email is the fastest way to reach me. I’m on UTC+5."
      />
      <div className="grid gap-4 md:grid-cols-12">
        <div className="card grid content-start gap-4 p-6 md:col-span-7 md:p-8">
          <Mail size={20} strokeWidth={1.5} className="text-muted" aria-hidden />
          <p className="micro">Email</p>
          <a href={`mailto:${site.email}`} className="link text-h3 break-all text-ink sm:break-normal">{site.email}</a>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`mailto:${site.email}`} className="btn btn-primary">Write an email</a>
            <CopyEmail />
          </div>
        </div>
        <ul className="grid gap-4 md:col-span-5">
          {channels.map((c) => (
            <li key={c.label}>
              <a href={c.href} className="card card-link group flex items-center justify-between gap-4 p-6">
                <span className="grid gap-1">
                  <span className="text-body font-medium text-ink">{c.label}</span>
                  <span className="font-mono text-micro text-muted">{c.detail}</span>
                </span>
                <c.icon size={20} strokeWidth={1.5} className="text-muted transition-colors group-hover:text-ink" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
