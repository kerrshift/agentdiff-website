"use client";

import React, { useEffect, useState } from "react";

interface Line {
  t: string;
  c?: string;
}

// A real week from the author's own Claude Code logs (session names changed).
// Keep in sync with the README example in kerrshift/agentdiff.
const LINES: Line[] = [
  { t: "$ uvx --from agent-trajectory-diff agentdiff", c: "text-(--fg) font-semibold" },
  { t: "" },
  { t: "AgentDiff  ·  Claude Code  ·  last 7d", c: "text-(--fg) font-semibold" },
  { t: "12 sessions · 7 projects · $314.61", c: "text-(--muted)" },
  { t: "" },
  { t: "Where the money went", c: "text-(--fg) font-semibold" },
  { t: "  Re-reading context (cache reads)     $162.64   52%  ████████████████", c: "text-(--muted)" },
  { t: "  Writing context to cache              $93.33   30%  █████████", c: "text-(--muted)" },
  { t: "  Model output (incl. thinking)         $51.34   16%  █████", c: "text-(--muted)" },
  { t: "  Background calls not in transcript     $7.28    2%  █", c: "text-(--muted)" },
  { t: "" },
  { t: "Avoidable ≈ $132.08 (42% of spend, conservative estimate)", c: "text-(--fg) font-semibold" },
  { t: "  ▸ Long context re-sent every turn   $86.64", c: "text-(--danger)" },
  { t: "    Start a fresh session per task; /compact before it gets huge.", c: "text-(--faint)" },
  { t: "  ▸ Cache rebuilt after breaks        $45.44", c: "text-(--danger)" },
  { t: "    After a long break, start a new session instead of resuming.", c: "text-(--faint)" },
  { t: "" },
  { t: "Biggest item", c: "text-(--fg) font-semibold" },
  { t: "  $23.89  Cache rebuilt 7x after breaks (worst: 818k tokens after 93 min)", c: "text-(--muted)" },
  { t: "          Refactor billing service · api", c: "text-(--faint)" },
];

export default function SpendTerminal() {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 110);
    return () => clearTimeout(id);
  }, [shown]);

  return (
    <div className="w-full mx-auto rounded-xl overflow-hidden border border-(--border) bg-(--surface) text-left shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_12px_32px_-16px_rgba(0,0,0,0.12)]">
      <div className="flex items-center justify-between px-4 sm:px-5 h-11 sm:h-12 border-b border-(--border) bg-(--surface-2)">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]"></span>
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]"></span>
          <span className="w-3 h-3 rounded-full bg-[#28C840]"></span>
        </div>
        <span className="hidden sm:inline text-[11px] font-mono text-(--faint)">
          agentdiff · Claude Code spend report
        </span>
        <span className="text-[10px] font-mono text-(--accent) px-2 py-0.5 rounded-md font-bold bg-(--accent)/10 shrink-0">
          LOCAL
        </span>
      </div>

      <div className="p-4 sm:p-6 font-mono text-[10.5px] sm:text-xs md:text-[13px] leading-[1.7] tracking-tight whitespace-pre overflow-x-auto text-left">
        {LINES.map((line, i) => (
          <div
            key={i}
            className={`${line.c ?? "text-(--faint)"} ${i >= shown ? "invisible" : ""}`}
          >
            {line.t || " "}
            {i === shown - 1 && (
              <span className="inline-block w-[8px] h-[17px] align-middle bg-(--accent)/90 animate-pulse ml-1"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
