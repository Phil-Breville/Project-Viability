import React, { useState, useEffect } from 'react';
import { Page } from '../types';
// keep your existing icons that still make sense
import { CalculatorIcon, DocumentTextIcon } from '../components/Icons';
// add lucide icons for clearer semantics
import { Lightbulb, Globe2, Flag } from 'lucide-react';

interface CriteriaPageProps {
  navigateTo: (page: Page) => void;
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  valueStyles?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, description, valueStyles = "text-slate-800" }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      <div>
        <div className="flex items-center text-sm font-medium text-gray-500">
          {icon}
          <span className="ml-2">{title}</span>
        </div>
        <p className={`mt-2 text-5xl font-bold ${valueStyles}`}>{value}</p>
      </div>
      <p className="text-sm text-gray-500 mt-4">{description}</p>
    </div>
  );
};

const CriteriaPage: React.FC<CriteriaPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showButton ? 'show' : ''}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>

      <div className="max-w-7xl mx-auto space-y-12 text-gray-800">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-shadow-custom">💡 Project Viability Criteria</h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-3xl mx-auto">
            What are our expectations for viability with shifting manufacturing and tariffs?
          </p>
        </header>

        <main className="space-y-12">
          {/* Strategy Requirement */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Strategy Requirement</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <Lightbulb className="w-12 h-12 text-sky-500" />
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-slate-800">Is it better for Breville & Category?</h3>
                  <p className="text-md text-gray-600 mt-1">The primary strategic test for any new project.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Financial Viability */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Financial Viability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <InfoCard
                icon={<CalculatorIcon className="w-5 h-5" />}
                title="CM% Target"
                value="43%"
                description="Contribution margin goal for a standard viable project."
              />
              <InfoCard
                icon={<CalculatorIcon className="w-5 h-5" />}
                title="CM% Floor"
                value=">25%"
                valueStyles="text-amber-600"
                description="The absolute minimum contribution margin, regardless of other factors."
              />
              <InfoCard
                icon={<CalculatorIcon className="w-5 h-5" />}
                title="CM$ Growth"
                value="Positive"
                description="Must generate more absolute CM dollars than any product it replaces or cannibalizes."
              />
              <InfoCard
                icon={<CalculatorIcon className="w-5 h-5" />}
                title="Category Average"
                value="Beat It"
                description="Should perform above the category average, unless there is a compelling strategic reason."
              />
            </div>
          </section>

          {/* Sourcing Viability */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Sourcing Viability (Ex-China)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard
                icon={<Globe2 className="w-5 h-5" />}
                title="240V Markets"
                value="Standard"
                description="The financial viability criteria apply as normal for all 240V regions."
              />
              <InfoCard
                icon={<Flag className="w-5 h-5" />}
                title="120V Markets (USA)"
                value=">25% CM"
                valueStyles="text-amber-600"
                description="For the US market, we will only consider a contribution margin above 25% after all tariffs are applied."
              />
              <InfoCard
                icon={<DocumentTextIcon className="w-5 h-5" />}
                title="China Launches"
                value="Quote Shift"
                description="For any new project launching from China, a supplier quote for shifting manufacturing must be obtained."
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CriteriaPage;
