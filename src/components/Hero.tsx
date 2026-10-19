"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SpendTerminal from "./SpendTerminal";
import Reveal from "./Reveal";
import CopyCommand from "./CopyCommand";
import { ClaudeCode, Codex } from "@lobehub/icons";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 font-sans border-b border-(--border)"
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center min-w-0">
        <Reveal animate>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono text-(--muted) border border-(--border) rounded-full px-3 py-1 bg-(--surface) mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            New in 0.7 · now reads Codex too
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[4.25rem] font-extrabold tracking-[-0.035em] text-(--fg) leading-[1.12] mx-auto max-w-4xl text-balance">
            See what your AI coding agent{" "}
            <span className="text-emerald-600 dark:text-emerald-400">actually did</span>, and what it{" "}
            <span className="text-rose-600 dark:text-rose-400">cost</span>.
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-(--fg)/80 dark:text-(--fg)/85 leading-relaxed mt-5 mb-8 font-normal">
            One command reads the Claude Code and Codex session logs already on your machine and tells you
            where the money went and what was avoidable: long context re-sent every turn, caches
            rebuilt after breaks, stuck retries. No config, no API key, nothing uploaded.
          </p>

          <div className="mb-8 -mt-2 flex items-center justify-center gap-5 text-sm font-semibold text-(--fg)">
            <span className="text-(--faint) font-medium">Works with</span>
            <span className="inline-flex items-center gap-2"><ClaudeCode.Color size={20} />Claude Code</span>
            <span className="inline-flex items-center gap-2"><Codex.Color size={20} />Codex</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <div id="install-section" className="scroll-mt-24 max-w-full">
              <CopyCommand />
            </div>
            <Link
              href="#how-it-works"
              className="px-6 py-3 rounded-full bg-(--fg) text-(--bg) text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-xs"
            >
              <span>How it works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-(--faint)">
            Or <code className="font-mono">uvx --from agent-trajectory-diff agentdiff</code>, or{" "}
            <code className="font-mono">/agentdiff:report</code> inside{" "}
            <a className="underline hover:text-(--fg)" href="#how-it-works">Claude Code</a>.
          </p>
        </Reveal>

        <Reveal animate delay={100}>
          <div className="mt-12 flex flex-col items-center relative">
            <div className="w-full max-w-4xl relative">
              <div
                className="absolute -inset-6 sm:-inset-10 rounded-3xl blur-2xl sm:blur-3xl pointer-events-none opacity-70 dark:opacity-80"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.32) 0%, rgba(20, 184, 166, 0.14) 45%, transparent 75%)",
                }}
              />
              <div className="relative z-10">
                <SpendTerminal />
              </div>
            </div>
            <p className="mt-3.5 text-[11px] font-mono text-(--faint) relative z-10">
              A real week from the author&apos;s own logs · session names changed
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
