import type { Metadata } from "next";
import DocsShell from "./DocsShell";
import { getDocMetas } from "../../lib/docs";
import { getPackageVersion } from "../../lib/getPackageVersion";

export const metadata: Metadata = {
  title: {
    default: "Documentation | AgentDiff",
    template: "%s | AgentDiff",
  },
  description:
    "AgentDiff documentation: installation, CLI reference, adapters for LangGraph, CrewAI, OpenAI Agents SDK, Langfuse, LangSmith and OpenInference, scenario suites, A/B benchmarking, CI/CD GitHub Action setup, and cookbooks.",
  alternates: {
    canonical: "/docs",
  },
};

export default async function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const docs = getDocMetas();
  const version = await getPackageVersion();

  return (
    <DocsShell docs={docs} version={version}>
      {children}
    </DocsShell>
  );
}
