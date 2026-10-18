"use client";

import { Search } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState, useSyncExternalStore } from "react";
import type { CommandLink } from "./items";

// The palette (cmdk + dialog) is only downloaded the first time it opens.
const CommandPalette = dynamic(() => import("./command-palette").then((m) => m.CommandPalette), { ssr: false });

// Shows ⌘ on the server and on Apple devices, "Ctrl " elsewhere, without a setState-in-effect.
const noop = () => () => {};
const useModKey = () =>
  useSyncExternalStore(noop, () => (/Mac|iPhone|iPad/.test(navigator.platform) ? "⌘" : "Ctrl "), () => "⌘");

export function CommandTriggerClient({ links }: { links: CommandLink[] }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const mod = useModKey();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const show = () => {
    setLoaded(true);
    setOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        onPointerEnter={() => setLoaded(true)}
        className="hidden h-8 items-center gap-2 rounded-sm border border-line bg-surface px-3 font-mono text-micro text-muted transition-colors duration-150 hover:border-line-strong hover:text-ink md:inline-flex"
      >
        <Search size={16} strokeWidth={1.5} aria-hidden />
        Search
        <kbd className="font-mono text-ink-2">{mod}K</kbd>
      </button>
      <button
        type="button"
        onClick={show}
        className="touch-target inline-flex h-8 items-center rounded-sm border border-line bg-surface px-3 font-mono text-micro font-medium text-ink-2 md:hidden"
      >
        Menu
      </button>
      {loaded && <CommandPalette open={open} onOpenChange={setOpen} links={links} />}
    </>
  );
}
