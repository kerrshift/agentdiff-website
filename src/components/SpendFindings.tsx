"use client";

import React from "react";
import Reveal from "./Reveal";

const FINDINGS = [
  {
    tag: "Usually the biggest",
    title: "Long context, re-sent every turn",
    body: "Each turn re-reads the whole conversation. Past a few hundred thousand tokens, most of your bill is the model re-reading what it already saw.",
    fix: "One session per task. /compact before it gets huge.",
  },
  {
    tag: "Surprisingly expensive",
    title: "Cache rebuilt after a break",
    body: "Come back to a long session after the prompt cache expired and the entire context is written again at cache-write prices. One resume of an 818k-token session cost $6.38.",
    fix: "After a long break, start fresh instead of resuming.",
  },
  {
    tag: "Agent behaviour",
    title: "Stuck retries and repeated failures",
    body: "The same command failing the same way, again and again, or one kind of command failing all session long.",
    fix: "Fix the setup step, cwd or flaky test once.",
  },
  {
    tag: "Agent behaviour",
    title: "Re-reads and identical calls",
    body: "Unchanged files read repeatedly, and identical calls returning identical output. Cost with no new information.",
    fix: "Point the agent at the right section; keep notes in CLAUDE.md.",
  },
];

export default function SpendFindings() {
  return (
    <section id="findings" className="py-24 sm:py-32 bg-transparent font-sans scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl mb-14 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.18em] text-(--faint) block mb-4 font-medium">
              What it finds
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-(--fg) leading-[1.1]">
              Your bill shows a total.{" "}
              <span className="text-emerald-500/90 dark:text-emerald-400">Not a reason.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-(--muted) leading-relaxed font-normal max-w-3xl">
              On real Claude Code usage, most of the spend isn&apos;t the model writing code. It&apos;s
              context habits. Every finding names the session and the file or command involved,
              with a dollar estimate.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-(--border)">
            {FINDINGS.map((f) => (
              <div key={f.title} className="p-6 sm:p-8 border-r border-b border-(--border) space-y-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-(--muted) bg-(--surface-2) border border-(--border) rounded-full px-3 py-1 inline-block">
                  {f.tag}
                </span>
                <h3 className="text-xl font-bold text-(--fg) tracking-tight">{f.title}</h3>
                <p className="text-sm sm:text-base text-(--muted) leading-relaxed">{f.body}</p>
                <p className="text-sm text-(--fg) font-medium flex gap-2">
                  <span className="text-emerald-500">→</span>
                  <span>{f.fix}</span>
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-3xl font-bold text-(--fg) tracking-tight">$420</div>
              <div className="text-(--muted) mt-1">real spend across the author&apos;s 17 sessions. Naively summing the logs says $640, because resumed sessions copy history.</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-(--fg) tracking-tight">42%</div>
              <div className="text-(--muted) mt-1">of it flagged avoidable, almost all from long context and cache rebuilds.</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-(--fg) tracking-tight">$0.02</div>
              <div className="text-(--muted) mt-1">gap between our price table and Claude Code&apos;s own cost counter, on the same tokens of a $47 session.</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
