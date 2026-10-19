import Header from "../components/Header";
import Hero from "../components/Hero";
import SpendFindings from "../components/SpendFindings";
import SpendHowItWorks from "../components/SpendHowItWorks";
import GateIntro from "../components/GateIntro";
import PRCommentShowcase from "../components/PRCommentShowcase";
import IntegrationShowcase from "../components/IntegrationShowcase";
import FAQSection from "../components/FAQSection";
import ClosingCTA from "../components/ClosingCTA";
import Footer from "../components/Footer";
import { getPackageVersion } from "../lib/getPackageVersion";

export default async function Home() {
  const version = await getPackageVersion();

  return (
    <div className="relative min-h-screen bg-(--bg) text-(--fg) font-sans flex flex-col justify-between selection:bg-(--border) selection:text-(--fg) no-scrollbar overflow-x-clip">
      <div id="main-grid-container" className="max-w-7xl mx-auto w-full flex-1 flex flex-col bg-(--bg) relative border-x border-(--border)">
        <Header version={version} />
        <main className="flex-1 divide-y divide-(--border)">
          {/* Claude Code spend report (primary since 0.6.0) */}
          <Hero />
          <SpendFindings />
          <SpendHowItWorks />
          {/* Trajectory regression gate for agents you build */}
          <GateIntro />
          <PRCommentShowcase />
          <IntegrationShowcase />
          <FAQSection />
          <ClosingCTA />
        </main>
        <Footer version={version} />
      </div>
    </div>
  );
}
