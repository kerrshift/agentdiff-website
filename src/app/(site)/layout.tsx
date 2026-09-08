import fs from "fs";
import path from "path";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getPackageVersion } from "../../lib/getPackageVersion";

/**
 * Shared chrome for every marketing route in the (site) group — blog,
 * features, action, quickstart, adapters, compare. Same sticky Header,
 * Footer, and max-w-7xl grid container as the landing page, so every page
 * reads as one site.
 *
 * Home (/) keeps its own wrapper (landing-specific layout classes); this
 * group covers everything else.
 */

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const version = await getPackageVersion();

  return (
    <div className="relative min-h-screen bg-(--bg) text-(--fg) font-sans selection:bg-(--border) selection:text-(--fg) no-scrollbar overflow-x-clip">
      <div id="main-grid-container" className="max-w-7xl mx-auto w-full bg-(--bg) relative border-x border-(--border)">
        <Header version={version} />
        <main className="min-h-[90vh]">{children}</main>
        <Footer version={version} />
      </div>
    </div>
  );
}
