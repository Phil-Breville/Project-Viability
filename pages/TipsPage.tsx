import React, { useEffect, useState } from "react";
import { Page } from "../types";
import {
  BarChart3,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Globe2,
  Database,
  ClipboardList,
  Calculator,
  Flag,
  Wand2,
  CheckCircle2,
  CircleDollarSign, // ← add this line
} from "lucide-react";

interface TipsPageProps {
  navigateTo: (page: Page) => void;
}

type Step = { title: string; body: string; icon: React.ReactNode; accent: string };

type Tool = {
  name: string;
  region?: string;
  purpose: string;
  whenToUse: string;
  tip: string;
  icon: React.ReactNode;
  accent: string; // tailwind color class base e.g. "violet" | "rose"
  link?: string;
};

const STEPS: Step[] = [
  {
    title: "Use reference products to estimate feasibility",
    body:
      "Compare with similar or previous models already in market to set a baseline (link to Signed Stage Gates).",
    icon: <ClipboardList className="h-5 w-5" />, 
    accent: "from-violet-500 to-indigo-500",
  },
  {
    title: "Estimate a draft FOB using a flagship assumption",
    body:
      "E.g., if this is a premium version of X product, assume it will be ~10–20% higher in cost.",
    icon: <Calculator className="h-5 w-5" />, 
    accent: "from-emerald-500 to-teal-500",
  },
  {
    title: "Pair draft FOB with an RRP estimate",
    body: "Creates a back‑of‑the‑envelope viability picture before formal modelling begins.",
    icon: <CircleDollarSign className="h-5 w-5" /> as any, 
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Drop draft cost + price into a placeholder business case",
    body: "Even if early, this frames the opportunity and surfaces major red flags.",
    icon: <Wand2 className="h-5 w-5" />, 
    accent: "from-sky-500 to-cyan-500",
  },
  {
    title: "Sanity‑check before full modelling",
    body: "If it doesn’t clear the first pass, pause or re‑scope before deeper work.",
    icon: <CheckCircle2 className="h-5 w-5" />, 
    accent: "from-rose-500 to-pink-500",
  },
];

const TOOLS: Tool[] = [
  {
    name: "Stackline",
    purpose: "Market & promo intel (esp. Amazon/US).",
    whenToUse: "Validate sell‑out trends, price ladders, promo cycles.",
    tip: "Chart promo cadence to pick realistic launch windows.",
    icon: <BarChart3 className="h-5 w-5" />, 
    accent: "violet",
  },
  {
    name: "CamelCamelCamel",
    purpose: "Amazon price history tracking.",
    whenToUse: "Sense‑check psychological price points and street price vs RRP.",
    tip: "Compare lowest‑ever vs typical to stress‑test margins.",
    icon: <LineChart className="h-5 w-5" />, 
    accent: "emerald",
  },
  {
    name: "Competera",
    purpose: "Competitive price monitoring & rules.",
    whenToUse: "Need automated watchlists/rules to simulate price bands.",
    tip: "Model corridors (floor/target/stretch) pre‑Commercial Go.",
    icon: <ShieldCheck className="h-5 w-5" />, 
    accent: "amber",
  },
  {
    name: "GfK",
    region: "Europe",
    purpose: "Retail sell‑out & share analytics (EU focus).",
    whenToUse: "Demand sizing & competitor performance by country/channel.",
    tip: "Combine with region input for volume split by key markets.",
    icon: <Globe2 className="h-5 w-5" />, 
    accent: "sky",
  },
  {
    name: "Power BI (internal)",
    purpose: "Historical portfolio volumes & dashboards.",
    whenToUse: "Pull legacy volumes and build early directional estimates.",
    tip: "Surface ‘Last Updated’ to protect decisions from stale data.",
    icon: <Database className="h-5 w-5" />, 
    accent: "rose",
  },
];

const colorFromAccent = (accent: string) => {
  // Map accent base (e.g., "violet") to Tailwind classes
  const map: Record<string, { ring: string; bg: string; text: string; border: string }> = {
    violet: { ring: "ring-violet-300", bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
    emerald: { ring: "ring-emerald-300", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    amber: { ring: "ring-amber-300", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    sky: { ring: "ring-sky-300", bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
    rose: { ring: "ring-rose-300", bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
  };
  return map[accent] || map.violet;
};

const TipsPage: React.FC<TipsPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showButton ? "show" : ""}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>

      <div className="max-w-6xl mx-auto space-y-10 text-gray-800 px-4">
        {/* Hero */}
        <header className="text-center space-y-4 pt-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Team Tips & Playbook
          </h1>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Practical, opinionated guidance from CMs — lightweight, skimmable, and decision‑ready.
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border">Updated Aug 2025</span>
            <span className="text-[11px] md:text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Designed for speed</span>
          </div>
        </header>

        {/* How CMs estimate early viability */}
<section className="space-y-4">
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500" />
    <h2 className="text-xl md:text-3xl font-extrabold">How CMs estimate early viability?</h2>
  </div>

  {/* ONE COLUMN + EXPAND/COLLAPSE */}
  <div className="space-y-4">
    {STEPS.map((s, idx) => (
      <details
        key={idx}
        open={idx === 0} // first one expanded by default
        className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm open:shadow-md transition-shadow"
      >
        {/* colorful top border */}
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.accent}`} />

        <summary className="cursor-pointer select-none list-none px-4 py-4 md:px-5 md:py-5 flex items-start gap-3">
          {/* icon */}
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-white bg-gradient-to-r ${s.accent} shadow`}>
            {s.icon}
          </span>
          {/* title */}
          <div className="space-y-1">
            <h3 className="text-base md:text-lg font-semibold leading-snug">
              {idx + 1}. {s.title}
            </h3>
            {/* hint line shown while collapsed */}
            <p className="text-xs md:text-sm text-gray-500 group-open:hidden">
              Click to expand
            </p>
          </div>
        </summary>

        {/* body */}
        <div className="px-4 pb-5 md:px-5 md:pb-6 -mt-2">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {s.body}
          </p>
        </div>
      </details>
    ))}
  </div>
</section>


        {/* Tools */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500" />
            <h2 className="text-xl md:text-3xl font-extrabold">Apps CMs are using</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {TOOLS.map((t) => {
              const c = colorFromAccent(t.accent);
              return (
                <article
                  key={t.name}
                  className={`rounded-2xl border ${c.border} ${c.bg} p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border ${c.border} bg-white text-gray-800`}>{t.icon}</span>
                      <h3 className="text-base md:text-lg font-semibold">{t.name}</h3>
                    </div>
                    {t.region && (
                      <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-white ${c.border} border ${c.text}`}>{t.region}</span>
                    )}
                  </div>

                  <ul className="mt-3 space-y-2 text-sm text-gray-700">
                    <li><span className="font-medium">Purpose:</span> {t.purpose}</li>
                    <li><span className="font-medium">When to use:</span> {t.whenToUse}</li>
                    <li><span className="font-medium">Quick tip:</span> {t.tip}</li>
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="rounded-2xl border bg-white p-4 md:p-5 shadow-sm text-sm text-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Flag className="h-4 w-4" />
              <span className="font-semibold">Pro tip</span>
            </div>
            Pair any tool output with region inputs and historicals in Power BI for a more realistic early read. Keep a visible “Last Updated” badge on charts used in decision meetings.
          </div>
        </section>
      </div>
    </>
  );
};

export default TipsPage;
