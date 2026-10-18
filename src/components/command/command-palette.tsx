"use client";

import { Command } from "cmdk";
import { ArrowUpRight, Check, Copy, CornerDownLeft, Download, FileText, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { site } from "@/site.config";
import type { CommandLink } from "./items";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; links: CommandLink[] };

const itemClass =
  "flex h-10 cursor-pointer select-none items-center gap-3 rounded-sm px-3 text-small text-ink-2 data-[selected=true]:bg-surface-2 data-[selected=true]:text-ink";
const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-micro [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted";

export function CommandPalette({ open, onOpenChange, links }: Props) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const close = () => onOpenChange(false);
  const go = (link: CommandLink) => {
    close();
    if (link.external) window.open(link.href, "_blank", "noopener,noreferrer");
    else router.push(link.href as Parameters<typeof router.push>[0]);
  };
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const groups = ["Pages", "Case studies", "Elsewhere"] as const;

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search pages and actions"
      overlayClassName="fixed inset-0 z-40 bg-ink/20 dark:bg-bg/70"
      contentClassName="fixed left-1/2 top-24 z-50 w-[calc(100vw-32px)] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-md border border-line-strong bg-surface"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Command.Input
          autoFocus
          placeholder="Jump to a page, case study or action…"
          className="h-12 w-full bg-transparent text-body text-ink outline-none placeholder:text-muted"
        />
        <kbd className="chip shrink-0">Esc</kbd>
      </div>
      <Command.List className="max-h-[min(420px,60vh)] overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-small text-muted">
          Nothing matches. Try “queues”, “resume” or “email”.
        </Command.Empty>
        <Command.Group heading="Actions" className={groupClass}>
          <Command.Item onSelect={copyEmail} className={itemClass} keywords={["contact", "mail"]}>
            {copied ? <Check size={16} strokeWidth={1.5} className="text-ok" aria-hidden /> : <Copy size={16} strokeWidth={1.5} aria-hidden />}
            {copied ? "Copied to clipboard" : "Copy email address"}
            <span className="ml-auto font-mono text-micro text-muted">{site.email}</span>
          </Command.Item>
          <Command.Item onSelect={() => { close(); window.location.href = site.resumePdf; }} className={itemClass} keywords={["cv", "pdf"]}>
            <Download size={16} strokeWidth={1.5} aria-hidden />
            Download resume (PDF)
          </Command.Item>
          <Command.Item onSelect={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} className={itemClass} keywords={["dark", "light", "mode"]}>
            <Moon size={16} strokeWidth={1.5} aria-hidden />
            Toggle theme
          </Command.Item>
        </Command.Group>
        {groups.map((g) => (
          <Command.Group key={g} heading={g} className={groupClass}>
            {links.filter((l) => l.group === g).map((l) => (
              <Command.Item key={l.href} value={`${g} ${l.label}`} onSelect={() => go(l)} className={itemClass}>
                {l.external ? <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden /> : <FileText size={16} strokeWidth={1.5} aria-hidden />}
                <span className="truncate">{l.label}</span>
                {l.hint && <span className="ml-auto font-mono text-micro text-muted">{l.hint}</span>}
              </Command.Item>
            ))}
          </Command.Group>
        ))}
      </Command.List>
      <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-micro text-muted">
        <span className="inline-flex items-center gap-2"><CornerDownLeft size={12} strokeWidth={1.5} aria-hidden /> to select</span>
        <span>↑ ↓ to move</span>
      </div>
    </Command.Dialog>
  );
}
