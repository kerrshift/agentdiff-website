"use client";

import React from "react";
import { Terminal, Package, MessageSquare, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import CopyCommand, { PIP_COMMAND, PLUGIN_COMMAND, RUN_COMMAND, UVX_COMMAND } from "./CopyCommand";

const WAYS = [
  {
    icon: MessageSquare,
    title: "Inside Claude Code",
    body: "Install the plugin once, then run /agentdiff:report in any session. Claude shows the report and explains what to change. It can also pick it up when you ask why usage is high.",
    cmd: PLUGIN_COMMAND,
  },
  {
    icon: Terminal,
    title: "Any terminal with Node",
    body: "npx fetches a tiny launcher that runs AgentDiff with uv, pipx or your Python 3.10+, whichever you have.",
    cmd: RUN_COMMAND,
  },
  {
    icon: Package,
    title: "Python people",
    body: "Run it once with uv, or install it with pip, pipx or uv tool install. The command is agentdiff.",
    cmd: UVX_COMMAND,
  },
];

const ALSO = [PIP_COMMAND, "pipx install agent-trajectory-diff", "npm i -g @kerrshift/agentdiff", "/agentdiff:report --since 30d"];

const OPTIONS = [
  ["agentdiff", "last 7 days (same as agentdiff sessions)"],
  ["agentdiff --since 30d", "24h, 7d, 30d, 12w … or all"],
  ["agentdiff --project api", "only projects whose name contains “api”"],
  ["agentdiff --top 10", "list more findings and sessions"],
  ["agentdiff --agent codex", "only Codex (or claude, all)"],
  ["agentdiff --json", "machine-readable output"],
];

const NUMBERS = [
  "Reads ~/.claude/projects (or $CLAUDE_CONFIG_DIR), including subagent transcripts.",
  "Counts each billed request once. Claude Code repeats usage on every content block, and resumed or forked sessions copy their parent's history.",
  "Prices per model at Anthropic list prices, with cache reads and both cache-write TTLs (5-minute and 1-hour). Fast mode included.",
  "Reads Codex rollouts from ~/.codex/sessions ($CODEX_HOME) and prices each turn with the model it used, including OpenAI's long-context and Fast tiers. Codex logs carry no cost, so those figures are API-equivalent estimates.",
  "Uses Claude Code's own cost counter as the total when a session has one; the gap shows up as background calls not in the transcript.",
  "On Pro/Max plans these are API-equivalent costs: still the clearest view of which sessions and habits use the most.",
];

export default function SpendHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-transparent font-sans scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl mb-14 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.18em] text-(--faint) block mb-4 font-medium">
              How it works
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-(--fg) leading-[1.1]">
              One command. <span className="text-emerald-500/90 dark:text-emerald-400">Zero setup.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-(--muted) leading-relaxed font-normal max-w-3xl">
              Claude Code and Codex already write a log of every session to disk. AgentDiff reads them. Nothing
              to configure, no account, no key.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {WAYS.map(({ icon: Icon, title, body, cmd }) => (
              <div key={title} className="p-6 rounded-2xl border border-(--border) bg-(--surface) flex flex-col gap-4 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-(--surface-2) border border-(--border) flex items-center justify-center">
                    <Icon className="w-4 h-4 text-(--fg)" />
                  </span>
                  <h3 className="text-base font-bold text-(--fg) tracking-tight">{title}</h3>
                </div>
                <p className="text-sm text-(--muted) leading-relaxed flex-1">{body}</p>
                <CopyCommand cmd={cmd} wrap />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-mono text-(--muted)">
            <span className="font-sans text-(--faint) mr-1 self-center">Also:</span>
            {ALSO.map((c) => (
              <code key={c} className="px-2 py-1 rounded-md border border-(--border) bg-(--surface)">{c}</code>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-bold text-(--fg) tracking-tight mb-4">Options</h3>
              <div className="rounded-2xl border border-(--border) bg-(--surface) divide-y divide-(--border) font-mono text-xs sm:text-[13px]">
                {OPTIONS.map(([cmd, desc]) => (
                  <div key={cmd} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="text-(--fg)">{cmd}</span>
                    <span className="text-(--faint) font-sans text-xs">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-(--fg) tracking-tight mb-4">How the numbers are computed</h3>
              <ul className="space-y-3 text-sm text-(--muted) leading-relaxed">
                {NUMBERS.map((n) => (
                  <li key={n} className="flex gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl border border-(--border) bg-(--surface-2)/50 flex gap-3 text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-(--muted) leading-relaxed">
                  <span className="text-(--fg) font-semibold">Private by design.</span> Session logs
                  contain your source code. AgentDiff reads them locally, makes no network calls and has
                  no telemetry.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-10 text-xs text-(--faint)">
            Supported: Claude Code and OpenAI Codex CLI. Planned: Gemini CLI, Cursor.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
