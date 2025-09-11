import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../types";
import {
  FaFileInvoice,
  FaChartLine,
  FaShippingFast,
  FaSearchDollar,
  FaFolderOpen,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface ToolsPageProps {
  navigateTo: (page: Page) => void;
}

type RelatedLink = {
  label: string;
  url?: string;
};

type StatusLabel = "Available" | "Coming Soon" | "Needs Input" | "In Progress";

type Tool = {
  icon: React.ReactNode;
  toolName: string;
  usedFor: string;
  lastUpdated: string;
  keyNotes: string;
  relatedLink?: RelatedLink;
  status?: StatusLabel;
  category: "Forecasting & Planning" | "Market Data" | "Costs & Budget";
};

const ToolsPage: React.FC<ToolsPageProps> = ({ navigateTo }) => {
  const [show, setShow] = useState(false);
  const [showBack, setShowBack] = useState(false); // new for back-button animation
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "All" | Tool["category"]
  >("All");

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 80);
    const tb = setTimeout(() => setShowBack(true), 100);
    return () => {
      clearTimeout(t);
      clearTimeout(tb);
    };
  }, []);

  // --- Data ------------------------------------------------------------------
  const toolsData: Tool[] = [
    {
      icon: <FaFileInvoice />,
      toolName: "Business Case",
      usedFor: "Pricing Matrix & supporting sheets",
      lastUpdated: "10/09/2025",
      keyNotes: "Align but no standard",
      relatedLink: {
        label: "Open Template",
        url: "https://finance-global-product.azurewebsites.net/finance/business_case_manage",
      },
      status: "Available",
      category: "Forecasting & Planning",
    },
    {
      icon: <FaChartLine />,
      toolName: "POV Files",
      usedFor: "5-year forecast and long-term analysis",
      lastUpdated: "10/09/2025",
      keyNotes: "currently creating Roadmap & POV files",
      relatedLink: { label: "Coming Soon" },
      status: "Coming Soon",
      category: "Forecasting & Planning",
    },
    {
      icon: <FaSearchDollar />,
      toolName: "Gartner/Market Data",
      usedFor:
        "Market prices, shares, category analysis with tools like CamelCamelCamel, JfK Competera, Stackline",
      lastUpdated: "10/09/2025",
      keyNotes: "Standard data source coming",
      relatedLink: { label: "No Link" },
      status: "Available",
      category: "Market Data",
    },
    {
      icon: <FaShippingFast />,
      toolName: "Freight Costs",
      usedFor:
        "Latest numbers for different regions (China, Mexico, Indonesia, Vietnam, Cambodia, etc)",
      lastUpdated: "10/09/2025",
      keyNotes:
        "TBC (current dashboard outdated due to Project Donald). Must align with GTM & factory input",
      relatedLink: { label: "Coming Soon" },
      status: "Coming Soon",
      category: "Costs & Budget",
    },
    {
      icon: <FaFolderOpen />,
      toolName: "Project Actuals & Budget",
      usedFor:
        "Tracks project performance within the financial year vs budget; supports managing current and future budgets across FY with ability to reallocate funds if projects close.",
      lastUpdated: "10/09/2025",
      keyNotes: "Requires finance input",
      relatedLink: {
        label: "Budget Tracker",
        url: "https://app.powerbi.com/groups/me/reports/dacb1142-01fe-4483-b588-ac49d30aac13/ReportSection?experience=power-bi",
      },
      status: "Available",
      category: "Costs & Budget",
    },
  ];

  // --- Helpers ---------------------------------------------------------------
  const deriveStatus = (t: Tool) => {
    if (t.status) {
      const mapping: Record<
        StatusLabel,
        { label: StatusLabel; tone: "success" | "soon" | "warn" | "progress" }
      > = {
        "Available": { label: "Available", tone: "success" },
        "Coming Soon": { label: "Coming Soon", tone: "soon" },
        "Needs Input": { label: "Needs Input", tone: "warn" },
        "In Progress": { label: "In Progress", tone: "progress" },
      };
      return mapping[t.status];
    }
    // fallback (rare)
    return { label: "Available", tone: "success" as const };
  };

  const hasUrl = (t: Tool) => Boolean(t.relatedLink?.url);

  // --- Filtering -------------------------------------------------------------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return toolsData.filter((t) => {
      const matchCat = activeCategory === "All" || t.category === activeCategory;
      const matchQ =
        !q ||
        t.toolName.toLowerCase().includes(q) ||
        t.usedFor.toLowerCase().includes(q) ||
        t.keyNotes.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  // --- Badge styles ----------------------------------------------------------
  const badgeClass = (tone: "success" | "soon" | "warn" | "progress") =>
    ({
      success:
        "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
      soon: "bg-slate-50 text-slate-600 ring-1 ring-inset ring-slate-200",
      warn: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
      progress:
        "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-200",
    }[tone]);

  // --- UI --------------------------------------------------------------------
  return (
    <>
      {/* Back button (same style as your Reports page) */}
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showBack ? "show" : ""}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>

      <div
        className={`max-w-6xl mx-auto px-4 ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        } transition-all duration-300`}
      >
        {/* Header */}
        <header className="text-center space-y-3 pt-10 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Viability Tools
          </h1>
          <p className="text-gray-500">
            The key tools we use for calculations — fast to scan, straight to the point.
          </p>
        </header>

        {/* Controls */}
        <section className="mb-6">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            <div className="flex-1">
              <label className="sr-only" htmlFor="tool-search">
                Search tools
              </label>
              <input
                id="tool-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by tool, purpose, or note…"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                ["All", "Forecasting & Planning", "Market Data", "Costs & Budget"] as const
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-2 rounded-lg text-sm transition ${
                    activeCategory === c
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                  aria-pressed={activeCategory === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Cards */}
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
          {filtered.map((t) => {
            const status = deriveStatus(t);
            return (
              <article
                key={t.toolName}
                className="group rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="p-5 flex flex-col h-full">
                  {/* Header row */}
                  <div className="flex items-start gap-3">
                    <div className="text-xl text-gray-700 shrink-0">{t.icon}</div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {t.toolName}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">{t.category}</p>
                    </div>
                    <span
                      className={`ml-auto text-xs px-2 py-1 rounded-full ${badgeClass(
                        status.tone
                      )}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  {/* Purpose */}
                  <p className="mt-3 text-sm text-gray-700 line-clamp-3">
                    {t.usedFor}
                  </p>

                  {/* Notes */}
                  <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-xl p-3 leading-relaxed">
                    <span className="font-medium text-gray-800">Note:</span>{" "}
                    {t.keyNotes}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 flex items-center gap-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      Last updated: <span className="font-medium">{t.lastUpdated}</span>
                    </span>
                    <div className="ml-auto">
                      {t.relatedLink?.url ? (
                        <a
                          href={t.relatedLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                          title={t.relatedLink.label}
                        >
                          <span className="opacity-70">
                            <FaExternalLinkAlt size={14} />
                          </span>
                          {t.relatedLink.label}
                        </a>
                      ) : (
                        <button
                          disabled
                          className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border text-gray-400 border-gray-200 cursor-not-allowed"
                          aria-disabled
                          title={t.relatedLink?.label || "No Link"}
                        >
                          <span className="opacity-70">
                            <FaExternalLinkAlt size={14} />
                          </span>
                          {t.relatedLink?.label || "No Link"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </main>
      </div>
    </>
  );
};

export default ToolsPage;
