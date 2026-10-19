"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import AdapterLogos from "./AdapterLogos";

export default function GateIntro() {
  return (
    <section id="ci-gate" className="py-20 sm:py-28 bg-(--surface-2)/40 font-sans scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <span className="text-xs uppercase tracking-[0.18em] text-(--faint) block mb-4 font-medium">
                Also in AgentDiff · for agents you build
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-[-0.035em] text-(--fg) leading-[1.1]">
                A trajectory regression gate for your CI.
              </h2>
              <p className="mt-5 text-base sm:text-lg text-(--muted) leading-relaxed font-normal max-w-3xl">
                Building your own agent with LangGraph, CrewAI, the OpenAI Agents SDK or OpenTelemetry?
                AgentDiff compares each PR&apos;s agent run against a recorded baseline and fails the
                build on runaway tool loops or cost spikes. It handles non-deterministic agents with
                N-run baselines, posts a verdict on the PR, and re-baselines with a{" "}
                <code className="font-mono text-sm">/agentdiff approve</code> comment.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/quickstart#ci-gate"
                className="px-5 py-2.5 rounded-full bg-(--fg) text-(--bg) text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Set up the gate <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/features"
                className="px-5 py-2.5 rounded-full border border-(--border) bg-(--surface) text-(--fg) text-sm font-semibold hover:border-(--border-strong) transition-colors"
              >
                How it works
              </Link>
            </div>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-12 hidden md:block">
            <AdapterLogos />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
