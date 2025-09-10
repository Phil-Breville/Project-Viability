import React, { useEffect, useMemo, useState } from "react";
import { Page } from "../types";

interface AssumptionsPageProps {
  navigateTo: (page: Page) => void;
}

type Row = {
  component: string;
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

const RAW_ROWS: Row[] = [
  {
    component: "Volume",
    definition:
      "Forecasted number of units expected to sell annually or over a defined time horizon, based on market size, pricing, channel presence, and historical data.",
    stageGate:
      "From Concept Go onwards: refine through each stage. After Project Go: align with regions. By Commercial Go: align 8-10 weeks ahead with GTM & regions.",
    keyAssumption:
      "Use category size + comparable benchmark products (by price/spec). Use PowerBI for historical market volumes (where available). Early + estimate; later + region + GTM workshop. Food Prep: Uses PowerBI portfolio averages; sometimes applies portfolio P&Ls for comparison. Needs Finance/Commercial to provide P&L by product per region. Cooking: 1. For kettles and toasters (mature categories), relies heavily on Stackline for Amazon sales data (represents ~50% of US sales). 2. Stackline is main source for sell-out data. 3. For mature categories, Stackline is sufficient; for new ones, external market data is still needed.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Retail Price (Local)",
    definition:
      "The final price paid by consumers in the local market, inclusive of GST/VAT unless otherwise noted.",
    stageGate:
      "From Concept Go: estimate based on roadmap & market gap, usually in USD. Dynamic through development. At Project Go: align with Pricing Strategy Manager. By Commercial Go: aligned with regions 8-10 weeks before.",
    keyAssumption:
      "Early + roadmap + competitor gaps. Post-Project Go + RRP tied to FOB/CM% assumptions + competitor set. Regional RRPs set by Pricing Strategy Manager. Consider psychological price points ($99.9 etc.) and promo cycles (Stackline, Competera, CamelCamelCamel, JfK). Food Prep: Similar, but notes category-dependent retail price sensitivities. Cooking: 1. In addition to roadmap/competitor gaps, also does consumer pricing research/tests. 2. Reinforces that pricing is validated not just against competitors but with direct consumer response.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Retail Price Excluding GST/VAT (Local)",
    definition:
      "The consumer-facing retail price net of any local taxes (used for margin calculations).",
    stageGate: "Derived throughout process for calculations.",
    keyAssumption: "Net of local taxes (for margin calc).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Retail Margin (Local)",
    definition:
      "The difference between the retail price and wholesale price, expressed as a percentage of retail price.",
    stageGate:
      "Use BC template assumptions (!) size fits all until Commercial Go. Adjust only for replacement products (compare old vs new). At Commercial Go: align with region.",
    keyAssumption:
      "Coffee: Hold template margins until Commercial Go, adjust if replacing an existing product. Food Prep: Notes margin expectations differ by category (espresso vs cooking). Cooking: Always follows the template margins. Never adjusts unless regions raise an issue – strong view that CMs should not unilaterally change template margins.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Wholesale per Unit (Local)",
    definition:
      "The price at which the product is sold from the company to the retailer or distributor, in AUD.",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption: "In export markets, often aligned with US wholesale.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Rebates (Local)",
    definition:
      "Volume- or performance-based discounts or credits given back to the retailer/distributor after the sale.",
    stageGate: "Use BC template until Commercial Go & align with regions after.",
    keyAssumption: "Standard % until region alignment.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Net Sales per Unit (Local)",
    definition: "Wholesale price minus any rebates or discounts applied.",
    stageGate: "Auto-calculated. Used from Concept Go onwards.",
    keyAssumption:
      "Check against other models as cross-check (sanity check vs Lineup).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "FOB (USD)",
    definition:
      "Free on board price — cost of the product at the point of origin, including shipping, in USD.",
    stageGate:
      "Project estimates or internal tastings. Commercial Go: factory quotes. Tool Release: <95% resolution (still can change).",
    keyAssumption:
      "FOB from template may separate into 3 buckets (base FOB, factory move up/it e.g. +20% Mexico, then Contingency). Cooking: Works backward from target RRP < -43% CM. Aligns with your table but emphasizes this is Tom’s default assumption method.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Contingency (USD)",
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
    definition: "FOB cost including the added contingency.",
    stageGate: "Derived at all gates.",
    keyAssumption:
      "SLT to set guidance. Higher % for disruptive/new products. Lower % for line extensions or well-known categories. Espresso tends to run lower due to confidence. Clarify definition of ‘contingency’ (uncertainty vs feature buffer).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Freight In (Local)",
    definition:
      "Cost of transporting goods from the origin to the local warehouse, in local currency.",
    stageGate: "Required from Concept Go onwards.",
    keyAssumption:
      "Conversion using latest exchange rates in BC template. Requires yearly refresh of FX rates.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Duty (Local)",
    definition:
      "Import tariffs or customs duties paid on the product when brought into the local warehouse.",
    stageGate: "Required from Concept Go onwards.",
    keyAssumption:
      "Use logistics (Joanne Mitzes for Mexico Freight). Use standardised freight splits (Torrance vs Winchester vs Mexican). Cooking: 1. Strongly supports ‘one source of truth’ for tariffs. 2. Asked: how do we model China vs non-China approaches? Wants clearer direction on how to combine or choose assumptions for duty scenarios.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Landed Cost per Unit (Local)",
    definition:
      "Total cost to get the product into the local warehouse — includes FOB (Local), freight, duty, and fees.",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption:
      "Tariffs/duties from NICO’s spreadsheet. Needs one source of truth for duty assumptions (tariffs shift e.g. Trump).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Gross Margin (Local)",
    definition:
      "Net sales minus landed cost, freight out, warranty and other variable costs (calculated in BC template).",
    stageGate: "Auto-calculated in BC template.",
    keyAssumption: "FOB (Local) + Freight In + Duty + Fees.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Warranty Cost (%)",
    definition: "Estimated cost per unit to cover warranty claims or service.",
    stageGate:
      "From Project Go onwards (informed by Quality). Refined at later gates as testing progresses.",
    keyAssumption:
      "Coffee: Benchmark % from similar products, approved by Quality (Chantel). Food Prep: Sometimes uses portfolio averages, Hybrids for new tech (mix assumptions from two products).",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Freight Out (Local)",
    definition:
      "Cost to ship product from the warehouse to the retailer or end customer.",
    stageGate: "BC template derived.",
    keyAssumption: "Based on BC assumptions; not CM-driven.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Contribution Margin per Unit (Local)",
    definition:
      "Profit per unit after subtracting all variable costs, including landed cost, freight out, and warranty.",
    stageGate: "Required at all gates.",
    keyAssumption:
      "Check against existing lineup products. Must align with expectations.",
    lastUpdated: "Aug 2025",
  },
  {
    component: "Contribution Margin %",
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

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return RAW_ROWS;
    return RAW_ROWS.filter((r) =>
      [r.component, r.definition, r.stageGate, r.keyAssumption, r.lastUpdated]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [q]);

  return (
    <>
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showButton ? "show" : ""}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>

      <div className="max-w-6xl mx-auto space-y-6 text-gray-800 px-4">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold">✅ Assumptions</h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto">
            Key assumptions for business cases.
          </p>
          <div className="inline-flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border">
              Updated Aug 2025
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search components or text…"
              className="w-64 md:w-80 rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
        </header>

        <main className="text-gray-700">
          <div className="relative overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full text-left">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-44 sticky left-0 bg-gray-100">
                    Components
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-[28rem]">
                    Definition
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-[28rem]">
                    What to do by which stage gate
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-[36rem]">
                    Key Assumption to use
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider w-28">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {rows.map((row, i) => (
                  <tr key={i} className="align-top hover:bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900 sticky left-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
                      {row.component}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <div className="max-h-28 overflow-auto pr-2 leading-relaxed">
                        {row.definition}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <ul className="list-disc list-inside space-y-1 max-h-28 overflow-auto pr-2 leading-relaxed">
                        {toBullets(row.stageGate).map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <ul className="list-disc list-inside space-y-1 max-h-28 overflow-auto pr-2 leading-relaxed">
                        {toBullets(row.keyAssumption).map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {row.lastUpdated}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
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
