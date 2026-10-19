"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "Does AgentDiff upload my code or session logs?",
    a: "No. Session logs contain your source code, so AgentDiff reads them locally, makes no network calls and has no telemetry. There is no account and no API key.",
  },
  {
    q: "How do I run it?",
    a: "Inside Claude Code, install the plugin with `/plugin install agentdiff --marketplace kerrshift/agentdiff` and run `/agentdiff:report`. In a terminal, `npx @kerrshift/agentdiff` (Node 18+) or `uvx --from agent-trajectory-diff agentdiff` (uv). To install it, use `pip install agent-trajectory-diff`, `pipx install agent-trajectory-diff` or `npm i -g @kerrshift/agentdiff`. The command is `agentdiff`. Both the npm launcher and the plugin work with whatever you have: uv, pipx, or Python 3.10+.",
  },
  {
    q: "How accurate are the dollar amounts?",
    a: "Costs are rebuilt from the token usage Claude Code logs for every request, at Anthropic list prices per model, including cache reads and both cache-write TTLs. Each request is counted once, even across resumed or forked sessions. When a session carries Claude Code's own cost counter, that counter is used as the total, and anything the transcript doesn't show is reported as background calls. Applied to the same tokens, the price table lands within $0.02 of Claude Code's counter on a $47 session. Codex logs carry no cost, so Codex figures are API-equivalent estimates at OpenAI list prices.",
  },
  {
    q: "I'm on a Pro or Max subscription. Is this useful?",
    a: "Yes. The figures are API-equivalent costs, which is still the clearest way to see which sessions and habits use the most of your plan.",
  },
  {
    q: "Which agents are supported?",
    a: "Claude Code and the OpenAI Codex CLI (new in 0.7). One report covers both; use `--agent codex` or `--agent claude` to pick one. Gemini CLI and Cursor are planned.",
  },
  {
    q: "CI gate: my agent is non-deterministic. Will the gate flake?",
    a: "No. For the trajectory regression gate, you record an N-run baseline envelope (`agentdiff record ... --runs 3`). AgentDiff computes variance bands for step counts, latency and tokens and compares against the closest of the N runs, so harmless jitter doesn't flip the gate while real regressions like runaway retry loops are caught.",
  },
  {
    q: "CI gate: how does /agentdiff approve work?",
    a: "When a PR intentionally changes an agent's path, a reviewer comments `/agentdiff approve` on the pull request. The bot checks that no loops are being blessed, updates the committed baseline and flips the check to green.",
  },
  {
    q: "CI gate: which frameworks can it read?",
    a: "LangGraph, CrewAI, the OpenAI Agents SDK, OpenTelemetry / OpenInference spans, Langfuse and LangSmith exports, and a generic JSON schema.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq-section" className="py-24 sm:py-32 bg-transparent font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="max-w-4xl mb-16 sm:mb-20">
            <span className="text-xs uppercase tracking-[0.18em] text-(--faint) block mb-4 font-medium">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-(--fg) leading-[1.1]">
              Everything you <span className="text-emerald-500/90 dark:text-emerald-400">need to know</span>.
            </h2>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-(--muted) leading-relaxed font-normal max-w-3xl">
              The spend report first, then the CI gate. Anything else, ask on GitHub.
            </p>
          </div>
        </Reveal>

        {/* Minimal High-Contrast FAQ Accordion */}
        <Reveal delay={100}>
          <div className="border-t border-(--border) divide-y divide-(--border)">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={idx} className="py-6 sm:py-8 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-start justify-between gap-6 text-left group cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl font-bold text-(--fg) tracking-tight group-hover:text-(--muted) transition-colors leading-snug">
                      {faq.q}
                    </span>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all mt-0.5 ${
                      isOpen
                        ? "bg-(--surface-2) border-(--border-strong) text-(--fg)"
                        : "bg-(--surface) border-(--border) text-(--muted) group-hover:border-(--border-strong) group-hover:text-(--fg)"
                    }`}>
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-4 sm:pt-5 pr-12 text-sm sm:text-base text-(--muted) leading-relaxed font-normal max-w-4xl animate-in fade-in-50 duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Bottom Support Link */}
        <Reveal delay={140}>
          <div className="mt-12 pt-8 border-t border-(--border) flex flex-wrap items-center justify-between gap-4 text-xs text-(--muted)">
            <span>Another agent or log format you want supported?</span>
            <Link
              href="https://github.com/kerrshift/agentdiff/issues"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-(--fg) hover:underline"
            >
              <span>Open an issue on GitHub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Reveal>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
