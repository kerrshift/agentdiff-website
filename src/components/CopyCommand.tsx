"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export const RUN_COMMAND = "npx @kerrshift/agentdiff";
export const UVX_COMMAND = "uvx --from agent-trajectory-diff agentdiff";
export const PLUGIN_COMMAND = "/plugin install agentdiff --marketplace kerrshift/agentdiff";
export const PIP_COMMAND = "pip install agent-trajectory-diff";

export default function CopyCommand({
  cmd = RUN_COMMAND,
  dark = false,
  bare = false,
  wrap = false,
}: {
  cmd?: string;
  dark?: boolean;
  bare?: boolean;
  wrap?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`${wrap ? "flex items-start justify-between w-full" : "inline-flex items-center max-w-full"} gap-2 ${
        bare
          ? "px-1 py-1"
          : `rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 ${
              dark ? "bg-[#0A0B0C] border border-[#2A2D33]" : "bg-(--surface) border border-(--border)"
            }`
      }`}
    >
      <span
        className={`text-xs sm:text-[13px] font-mono ${wrap ? "break-all text-left" : "truncate"} ${
          dark ? "text-[#E8EAED]" : "text-(--fg)"
        }`}
      >
        {!cmd.startsWith("/") && <span className="text-(--faint) select-none">${" "}</span>}
        {cmd}
      </span>
      <button
        onClick={copy}
        aria-label="Copy command"
        className={`flex-shrink-0 transition-colors duration-150 cursor-pointer ${
          dark ? "text-(--faint) hover:text-white" : "text-(--faint) hover:text-(--fg)"
        }`}
      >
        {copied ? <Check className="w-4 h-4 text-(--accent)" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}
