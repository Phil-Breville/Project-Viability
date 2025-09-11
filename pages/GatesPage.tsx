import React, { useEffect, useState } from "react";
import { Page } from "../types";

interface GatesPageProps {
  navigateTo: (page: Page) => void;
}

type Stage = {
  key: string;
  short: string;     // text inside diamond
  title: string;     // card title
  color: string;     // Tailwind bg color for diamond
  points: { label: string; value: React.ReactNode }[]; // value can be a link or text
};

const link = (href: string, text: string) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-dotted hover:decoration-solid"
  >
    {text}
  </a>
);

// ------------------------------------------------------------------
// DATA (put real SharePoint/Confluence URLs instead of "#")
// ------------------------------------------------------------------
const GATE_STAGES: Stage[] = [
  {
    key: "concept-go",
    short: "Concept Go",
    title: "Concept Go",
    color: "bg-yellow-500",
    points: [
      { label: "Presentation Template", value: link("https://breville.sharepoint.com/:p:/r/sites/BES879BaristaPro/_layouts/15/Doc.aspx?sourcedoc=%7B4EAE8CC2-B3FF-4401-A606-695FF976037B%7D&file=101531_Stage%20Gate%20Presentation_Concept%20Go.pptx&action=edit&mobileredirect=true", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfezVFNjdCQ0UzLTBBNEItNDk5OS04NjY1LTQ3MjM2NUEzMzVFM30&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
  {
    key: "project-go",
    short: "Project Go",
    title: "Project Go",
    color: "bg-yellow-600",
    points: [
      { label: "Presentation Template", value: link("https://breville.sharepoint.com/:p:/r/sites/BES879BaristaPro/_layouts/15/Doc.aspx?sourcedoc=%7B1C2F11F0-49CC-4D93-900F-AE83D029F537%7D&file=101531_Stage%20Gate%20Presentation_Project%20Go.pptx&action=edit&mobileredirect=true", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfezQxNEFBMzM1LTc1OTMtNDlERC05QkU2LUE3QTA3QzRGQ0FBNH0&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
  {
    key: "commercial-go",
    short: "Commercial Go",
    title: "Commercial Go",
    color: "bg-amber-600",
    points: [
      { label: "Presentation Template", value: link("https://breville.sharepoint.com/:p:/r/sites/BES879BaristaPro/_layouts/15/Doc.aspx?sourcedoc=%7B3A6E0E08-480C-4EB7-B21A-0D4B93D04518%7D&file=101531_Stage%20Gate%20Presentation_Commercial%20Go.pptx&action=edit&mobileredirect=true", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfe0Y1QjVFNzgxLUI0ODctNDcyOC1BRDZDLTVENjJENDczOEFFNH0&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
  {
    key: "tool-release",
    short: "Tool Release",
    title: "Tool Release",
    color: "bg-orange-500",
    points: [
      { label: "Presentation Template", value: link("https://breville.sharepoint.com/:p:/r/sites/BES879BaristaPro/_layouts/15/Doc.aspx?sourcedoc=%7B7841A851-182E-47DF-AB92-7DA2DA7B5733%7D&file=101531_Stage%20Gate%20Presentation_Tool%20Release.pptx&action=edit&mobileredirect=true", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfezA4MzdBNEMyLTNDNTQtNEE0Ny1BQ0Y5LTkzQUVCRjNBM0NCM30&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
  {
    key: "production-release",
    short: "Production",
    title: "Production Release",
    color: "bg-rose-500",
    points: [
      { label: "Presentation Template", value: link("#", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfezE1NTk0OUJDLUFFMjYtNEQ3NC05ODAyLURBNjUyOUY1M0ZBMH0&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
  {
    key: "team-release",
    short: "Team Release",
    title: "Team Release",
    color: "bg-emerald-600",
    points: [
      { label: "Presentation Template", value: link("#", "Deck template") },
      { label: "Must-Dos", value: link("#", "Checklist") },
      { label: "Assumptions", value: link("#", "Assumptions log") },
      { label: "Commercial Checklist", value: link("https://breville.sharepoint.com/:x:/r/sites/npd/_layouts/15/Doc.aspx?sourcedoc=%7B271945B1-0FDC-4B66-82B5-E02E9E791E81%7D&file=BPD006_Stage%20Gate%20Checklists_v4.xlsx&nav=MTVfe0YwQTJDRUIxLUJFODktNDcyOS1CNUU5LTRFQkM1QTc5Q0FCRH0&action=default&mobileredirect=true", "Open checklist") },
    ],
  },
];

const GatesPage: React.FC<GatesPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 100);
    return () => clearTimeout(t);
  }, []);

  // If a point's value is an <a>, grab its href so we can make the LABEL the link.
  const getHref = (node: React.ReactNode): string | null => {
    if (React.isValidElement(node) && node.type === "a") {
      return (node.props as any).href ?? null;
    }
    return null;
    };

  return (
    <>
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showButton ? "show" : ""}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>

      <div className="max-w-6xl mx-auto space-y-12 text-gray-800">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold">
            📦 What do I need to present at stage gates?
          </h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">
            A quick guide on key requirements for each stage gate.
          </p>
        </header>

        {/* Timeline + Cards */}
        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-8 md:gap-12">
          {/* Left column: vertical guideline */}
          <div className="relative hidden md:block">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gray-300" />
          </div>
          <div className="hidden md:block" />

          {GATE_STAGES.map((stage, i) => (
            <React.Fragment key={stage.key}>
              {/* LEFT: diamond + connector */}
              <div className="relative flex items-start justify-center md:pt-6">
                {i !== GATE_STAGES.length - 1 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-20 bottom-[-28px] w-px bg-gray-300" />
                )}
                <div
                  className={`w-20 h-20 rotate-45 ${stage.color} shadow-lg rounded-sm flex items-center justify-center text-white font-semibold`}
                  aria-hidden="true"
                >
                  <span className="-rotate-45 text-center px-2 leading-tight">{stage.short}</span>
                </div>
              </div>

              {/* RIGHT: card */}
              <section
                className="stage-card p-6 bg-white/80 backdrop-blur rounded-xl shadow ring-1 ring-gray-100"
                aria-labelledby={`${stage.key}-title`}
              >
                <h3 id={`${stage.key}-title`} className="text-2xl font-bold mb-5">
                  {stage.title}
                </h3>

                {/* Definition list: label (left) · link/text (right) */}
                <dl className="grid grid-cols-1 sm:grid-cols-[220px,1fr] gap-x-6 gap-y-3">
                  {stage.points.map((p, idx) => {
                    const href = getHref(p.value);
                    return (
                      <React.Fragment key={idx}>
                        <dt className="font-semibold text-gray-900">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-2 no-underline hover:underline underline-offset-4 decoration-2"
                            >
                              {p.label}
                              <svg
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                                className="h-4 w-4 opacity-70 group-hover:opacity-100"
                              >
                                <path
                                  fill="currentColor"
                                  d="M13.5 3h3a.5.5 0 0 1 .5.5v3a.75.75 0 1 1-1.5 0V5.56l-6.72 6.72a.75.75 0 1 1-1.06-1.06l6.72-6.72H13.5A.75.75 0 1 1 13.5 3z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M5 4.5A1.5 1.5 0 0 0 3.5 6v9A1.5 1.5 0 0 0 5 16.5h9A1.5 1.5 0 0 0 15.5 15v-3a.75.75 0 0 1 1.5 0v3A3 3 0 0 1 14 18H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h3a.75.75 0 0 1 0 1.5H5z"
                                />
                              </svg>
                              <span className="sr-only"> (opens link)</span>
                            </a>
                          ) : (
                            p.label
                          )}
                        </dt>
                        <dd className="text-gray-700">{href ? null : p.value}</dd>
                      </React.Fragment>
                    );
                  })}
                </dl>
              </section>
            </React.Fragment>
          ))}

          {/* Mobile stacked timeline */}
          <div className="md:hidden">
            {GATE_STAGES.map((stage, i) => (
              <div key={stage.key} className="relative pl-10 pb-10 last:pb-0">
                {i !== GATE_STAGES.length - 1 && (
                  <div className="absolute left-4 top-4 bottom-0 w-px bg-gray-300" />
                )}
                <div
                  className={`absolute left-0 top-0 w-8 h-8 rotate-45 ${stage.color} rounded-sm shadow flex items-center justify-center`}
                  aria-hidden="true"
                >
                  <span className="-rotate-45 text-[10px] text-white font-semibold text-center leading-tight px-1">
                    {stage.short.split(" ")[0]}
                  </span>
                </div>

                <section className="p-5 bg-white/80 backdrop-blur rounded-xl shadow ring-1 ring-gray-100">
                  <h3 className="text-xl font-bold mb-4">{stage.title}</h3>
                  <dl className="grid grid-cols-1 gap-y-3">
                    {stage.points.map((p, idx) => {
                      const href = getHref(p.value);
                      return (
                        <div key={idx} className="flex items-start">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="no-underline hover:underline underline-offset-4 decoration-2 font-semibold"
                            >
                              {p.label}
                            </a>
                          ) : (
                            <>
                              <dt className="font-semibold mr-2">{p.label}:</dt>
                              <dd className="text-gray-700">{p.value}</dd>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </dl>
                </section>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GatesPage;
