"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { site } from "@/site.config";

export function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
    } catch {
      setState("error");
    }
    setTimeout(() => setState("idle"), 1800);
  };
  return (
    <button type="button" onClick={copy} className="btn btn-secondary" aria-live="polite">
      {state === "copied" ? <Check size={16} strokeWidth={1.5} className="text-ok" aria-hidden /> : <Copy size={16} strokeWidth={1.5} aria-hidden />}
      {state === "copied" ? "Copied" : state === "error" ? "Couldn’t copy. Select it above." : "Copy address"}
    </button>
  );
}
