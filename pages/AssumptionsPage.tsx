import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../types";

interface AssumptionsPageProps {
  navigateTo: (page: Page) => void;
}

type Row = {
  component: string;
  category: string;          // <-- used for zebra grouping
  definition: string;
  stageGate: string;
  keyAssumption: string;
  lastUpdated: string;
};

// Turn a long sentence into bullet items (keeps decimals like 99.9 together)
const toBullets = (text: string) =>
  text
    .split(/(?<!\d)\.(?!\d)|;/) // split on . or ; but not numbers like 99.9
    .map((s) => s.trim())
    .filter(Boolean);

/* ------------------------------------------------------------------------------------------------
   DATA  (categories define zebra blocks)
   Zebra groups (in order), per your spec:

   1) Volume
   2) Retail Price (Local) + Retail Price Excl. GST/VAT (Local) + Retail Margin (Local)
   3) Wholesale per Unit (Local) + Rebates (Local) + Net Sales per Unit (Local)
   4) FOB (USD) + Contingency (USD) + FOB with Contingency (USD) + Freight In (Local) + Duty (Local)
      (You listed "FOB (Local)" but it isn't in your data; leaving it out to match your dataset.)
   5) Landed Cost per Unit (Local)
   6) Gross Margin (Local) + Warranty Cost (%) + Freight Out (Local)
   7) Contribution Margin per Unit (Local) + Contribution Margin %
-------------------------------------------------------------------------------------------------- */

const RAW_ROWS: Row[] = [
  {
    component: "Volume",
    category: "Volume",
    definition:
      "Forecasted number of units expected to sell annually or over a defined time horizon, based on market size, pricing, channel presence, and historical data.",
    stageGate:
      "From Concept Go onwards: refine through each stage. After Project Go: align with regions. By Commercial Go: align 8-10 weeks ahead with GTM & regions.",
    keyAssumption:
      "Use category size + comparable benchmark products (by price/spec). Use PowerBI for historical market volumes (where available). Early = estimate, Later = region + GTM workshop. Food Prep: Uses PowerBI portfolio averages, sometimes applies portfolio P&Ls for comparison. Needs Finance/Commercial to provide P&L by product per region. Cooking:; 1. For kettles and toasters (mature categories), relies heavily on Stackline for Amazon sales data (represents ~50% of US sales). 2. Stackline is main source for sell-out data. 3. For mature categories, Stackline is sufficient - for new ones, external market data is still needed.",
    lastUpdated: "Aug 2025",
  },

  // Group 2
  {
    component: "Retail Price (Local)",
    category: "Retail Price",
    definition:
      "The final price paid by consumers in the local market, inclusive of GST/VAT unless otherwise noted.",
    stageGate:
      "From Concept Go: estimate based on roadmap & market gap, usually in USD. Dynamic through development. At Project Go: align with Pricing Strategy Manager. By Commercial Go: aligned with regions 8-10 weeks before.",
    keyAssumption:
      "Early + roadmap + competitor gaps. Post-Project Go + RRP tied to FOB/CM% assumptions + competitor set. Regional RRPs set by Pricing Strategy Manager. Consider psychological price points ($999 etc) and promo cycles (Stackline, Competera, CamelCamelCamel, JfK). Food Prep: Similar, but notes category-dependent retail price sensitivities. Cooking:; 1. In addition to roadmap/competitor gaps, also does consumer pricing research/tests. 2. Reinforces that pricing is validated not just against competitors but with direct consumer response.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Retail Price Excluding GST/VAT (Local)",
    category: "Retail Price",
    definition:
      "The consumer-facing retail price net of any local taxes (used for margin calculations).",
    stageGate: "Derived throughout process for calculations.",
    keyAssumption: "Net of local taxes (for margin calc).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Retail Margin (Local)",
    category: "Retail Price",
    definition:
      "The difference between the retail price and wholesale price, expressed as a percentage of retail price.",
    stageGate:
      "Use BC template assumptions (!) size fits all until Commercial Go. Adjust only for replacement products (compare old vs new). At Commercial Go: align with region.",
    keyAssumption:
      "Coffee: Hold template margins until Commercial Go, adjust if replacing an existing product. Food Prep: Notes margin expectations differ by category (espresso vs cooking). Cooking: Always follows the template margins. Never adjusts unless regions raise an issue – strong view that CMs should not unilaterally change template margins.",
    lastUpdated: "Aug 2025",
  },

  // Group 3
  {
    component: "Wholesale per Unit (Local)",
    category: "Wholesale & Net Sales",
    definition:
      "The price at which the product is sold from the company to the retailer or distributor, in AUD.",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption: "In export markets, often aligned with US wholesale.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Rebates (Local)",
    category: "Wholesale & Net Sales",
    definition:
      "Volume- or performance-based discounts or credits given back to the retailer/distributor after the sale.",
    stageGate: "Use BC template until Commercial Go & align with regions after.",
    keyAssumption: "Standard % until region alignment.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Net Sales per Unit (Local)",
    category: "Wholesale & Net Sales",
    definition: "Wholesale price minus any rebates or discounts applied.",
    stageGate: "Auto-calculated. Used from Concept Go onwards.",
    keyAssumption:
      "Check against other models as cross-check (sanity check vs Lineup).",
    lastUpdated: "Aug 2025",
  },

  // Group 4
  {
    component: "FOB (USD)",
    category: "FOB & Import",
    definition:
      "Free on board price — cost of the product at the point of origin, including shipping, in USD.",
    stageGate:
      "Project estimates or internal tastings. Commercial Go: factory quotes. Tool Release: <95% resolution (still can change).",
    keyAssumption:
      "FOB from template may separate into 3 buckets (base FOB, factory move uplift eg +20% Mexico, then Contingency). Cooking: Works backward from target RRP -> 43% CM. Aligns with your table but emphasizes this is Tom’s default assumption method.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Contingency (USD)",
    category: "FOB & Import",
    definition:
      "Additional buffer added to cover potential unexpected cost increases or risks (often <5-10%).",
    stageGate:
      "Concept Go: 10-20%. Project Go: 10-20%. Commercial Go: 5-10%. Tool Release: <5%. Production: 0%.",
    keyAssumption:
      "Coffee: Espresso tends to use lower % due to higher confidence. Always quote BCs with contingency to regions. Contingency = buffer for unknowns (not feature creep). Food Prep: Similar % guidance, but often treats factory-move up/it separately. Notes confusion – SLT needs to clarify definition. Cooking: Agreed with the need for clarity – especially on definitions and consistency across CMs.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "FOB with Contingency (USD)",
    category: "FOB & Import",
    definition: "FOB cost including the added contingency.",
    stageGate: "Derived at all gates.",
    keyAssumption:
      "SLT to set guidance. Higher % for disruptive/new products. Lower % for line extensions or well-known categories. Espresso tends to run lower due to confidence. Clarify definition of ‘contingency’ (uncertainty vs feature buffer).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Freight In (Local)",
    category: "FOB & Import",
    definition:
      "Cost of transporting goods from the origin to the local warehouse, in local currency.",
    stageGate: "Required from Concept Go onwards.",
    keyAssumption:
      "Conversion using latest exchange rates in BC template. Requires yearly refresh of FX rates.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Duty (Local)",
    category: "FOB & Import",
    definition:
      "Import tariffs or customs duties paid on the product when brought into the local warehouse.",
    stageGate: "Required from Concept Go onwards.",
    keyAssumption:
      "Use logistics (Joanne Metzke for Mexico Freight). Use standardised freight splits (Torrance vs Winchester vs Mexican). Cooking: 1. Strongly supports ‘one source of truth’ for tariffs. 2. Asked: how do we model China vs non-China approaches? Wants clearer direction on how to combine or choose assumptions for duty scenarios.",
    lastUpdated: "Aug 2025",
  },

  // Group 5
  {
    component: "Landed Cost per Unit (Local)",
    category: "Landed Cost",
    definition:
      "Total cost to get the product into the local warehouse — includes FOB (Local), freight, duty, and fees.",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption:
      "Tariffs/duties from NICO’s spreadsheet. Needs one source of truth for duty assumptions (tariffs shift eg Trump).",
    lastUpdated: "Aug 2025",
  },

  // Group 6
  {
    component: "Gross Margin (Local)",
    category: "Post-Landed Costs",
    definition:
      "Net sales minus landed cost, freight out, warranty and other variable costs (calculated in BC template).",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption: "FOB (Local) + Freight In + Duty + Fees.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Warranty Cost (%)",
    category: "Post-Landed Costs",
    definition: "Estimated cost per unit to cover warranty claims or service.",
    stageGate:
      "From Project Go onwards (informed by Quality). Refined at later gates as testing progresses.",
    keyAssumption:
      "Coffee: Benchmark % from similar products, approved by Quality (Chantel). Food Prep: Sometimes uses portfolio averages, Hybrids for new tech (mix assumptions from two products).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Freight Out (Local)",
    category: "Post-Landed Costs",
    definition:
      "Cost to ship product from the warehouse to the retailer or end customer.",
    stageGate: "BC template derived.",
    keyAssumption: "Based on BC assumptions; not CM-driven.",
    lastUpdated: "Aug 2025",
  },

  // Group 7
  {
    component: "Contribution Margin per Unit (Local)",
    category: "Contribution Margin",
    definition:
      "Profit per unit after subtracting all variable costs, including landed cost, freight out, and warranty.",
    stageGate: "Required at all gates.",
    keyAssumption:
      "Check against existing lineup products. Must align with expectations.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Contribution Margin %",
    category: "Contribution Margin",
    definition:
      "Contribution Margin per Unit as a percentage of Net Sales. (Net Sales - Variable Costs) / Net Sales.",
    stageGate: "Required at all gates.",
    keyAssumption:
      "Benchmark against global target (43%) and category norms (espresso ~55%). <25% ⇒ project stop.",
    lastUpdated: "Aug 2025",
  },
];

const AssumptionsPage: React.FC<AssumptionsPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setShowButton(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Filter while preserving order
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return RAW_ROWS;
    return RAW_ROWS.filter((r) =>
      [r.component, r.definition, r.stageGate, r.keyAssumption, r.lastUpdated, r.category]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [q]);

  // Build helpers to know when a row is the first in its category and
  // to alternate zebra by category index.
  const categoryOrder: string[] = [];
  filtered.forEach((r) => {
    if (!categoryOrder.includes(r.category)) categoryOrder.push(r.category);
  });

  const isFirstInCategory = (idx: number) => {
    const row = filtered[idx];
    if (!row) return false;
    const prev = filtered[idx - 1];
    return !prev || prev.category !== row.category;
  };

  const zebraBgFor = (idx: number) => {
    const row = filtered[idx];
    const catIdx = categoryOrder.indexOf(row.category);
    // darker but readable: odd groups -> bg-gray-100; even -> bg-white
    return catIdx % 2 === 0 ? "bg-gray-100" : "bg-white";
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

      <div className="max-w-7xl mx-auto space-y-6 text-gray-800 px-4">
        {/* Header with emoji + gradient text (emoji keeps color) */}
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold flex items-center justify-center gap-3">
            <span className="text-4xl md:text-5xl leading-none">✅</span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Assumptions
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Key assumptions for business cases.
          </p>

          {/* 🔥 Hot Assumptions (Freight & Duties) */}
          <div className="overflow-x-auto rounded-xl shadow-md ring-1 ring-gray-200 bg-white mt-6">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-yellow-50 to-yellow-100">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-700">Category</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Latest Source</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Last Updated</th>
                  <th className="px-4 py-2 font-semibold text-gray-700">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-4 py-2 font-medium text-gray-900">Freight</td>
                  <td className="px-4 py-2 text-gray-600">Ops Team (Joanne)</td>
                  <td className="px-4 py-2 text-gray-600">Awaiting confirmation</td>
                  <td className="px-4 py-2 text-gray-600">
                    FI (Freight In) + FO (Freight Out) are distinct values. Joanne to confirm refresh cycle & process.
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-2 font-medium text-gray-900">Duties</td>
                  <td className="px-4 py-2 text-gray-600">NICO’s Tariff Sheet</td>
                  <td className="px-4 py-2 text-gray-600">Aug 2025</td>
                  <td className="px-4 py-2 text-gray-600">
                    One source of truth needed; tariffs shift (e.g. policy changes). Define owners & cadence.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Controls (badge + search + CSV) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200">
              <span aria-hidden>🕒</span> Updated Aug 2025
            </span>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search components or text…"
              className="w-64 md:w-80 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
              aria-label="Search assumptions"
            />

            <button
              onClick={() => downloadCSV(filtered)}
              className="inline-flex items-center gap-2 text-sm rounded-xl border px-3 py-2 hover:bg-gray-50 active:scale-[0.99] transition"
              aria-label="Download table as CSV"
            >
              <span aria-hidden>📥</span> Download CSV
            </button>
          </div>
        </header>

        <main className="text-gray-700">
          <div className="relative overflow-x-auto rounded-xl shadow-lg ring-1 ring-gray-200 bg-white">
            <table className="min-w-[1200px] w-full text-left">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-44 sticky left-0 bg-gradient-to-r from-gray-100 to-gray-200">
                    Components
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Definition
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    What to do by which stage gate
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Key Assumption to use
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {filtered.map((row, i) => {
                  const zebra = zebraBgFor(i);
                  const isFirst = isFirstInCategory(i);

                  // For sticky first column, we need the same bg as the row to avoid seam
                  const stickyCellBg =
                    zebra === "bg-gray-100" ? "bg-gray-100" : "bg-white";

                  return (
                    <tr
                      key={`${row.component}-${i}`}
                      className={`${zebra} align-top hover:bg-indigo-50/30 transition-colors`}
                    >
                      <td
                        className={`px-4 py-4 sticky left-0 ${stickyCellBg} backdrop-blur supports-[backdrop-filter]:bg-opacity-95 ${
                          isFirst ? "font-semibold text-gray-900" : "text-gray-900"
                        }`}
                      >
                        {row.component}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <div className="leading-relaxed">
                          {row.definition}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <ul className="list-disc list-inside space-y-1 leading-relaxed">
                          {toBullets(row.stageGate).map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        <ul className="list-disc list-inside space-y-1 leading-relaxed">
                          {toBullets(row.keyAssumption).map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {row.lastUpdated}
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-10 text-center text-sm text-gray-500"
                    >
                      No matches for “{q}”. Try a different term.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default AssumptionsPage;

/* ---------- CSV export helper ---------- */
function downloadCSV(rows: Row[]) {
  const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
  const header = [
    "Component",
    "Category",
    "Definition",
    "Stage Gate",
    "Key Assumption",
    "Last Updated",
  ];
  const lines = [
    header.join(","),
    ...rows.map((r) =>
      [
        r.component,
        r.category,
        r.definition,
        toBullets(r.stageGate).join(" • "),
        toBullets(r.keyAssumption).join(" • "),
        r.lastUpdated,
      ]
        .map(esc)
        .join(",")
    ),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "assumptions.csv";
  a.click();
}
