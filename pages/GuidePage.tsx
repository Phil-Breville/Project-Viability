import React from 'react';
import { Page } from '../types';

interface GuidePageProps {
  navigateTo: (page: Page) => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ navigateTo }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 text-gray-800">
      <header className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-shadow-custom">Project Viability Guide</h1>
        <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">This guide helps you understand the Project Viability process and what you need to present to commercial operations.</p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        <section className="md:col-span-2 space-y-8">
          <div onClick={() => navigateTo(Page.CRITERIA)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">💡 Project Viability Criteria</h2>
              <p className="text-lg text-gray-600">Guidance on what makes a project viable</p>
            </div>
          </div>
          <div onClick={() => navigateTo(Page.GATES)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">📦 Stage Gate Info</h2>
              <p className="text-lg text-gray-600">What do I need to present at stage gates?</p>
            </div>
          </div>
          <div onClick={() => navigateTo(Page.TOOLS)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">📊 Viability Tools</h2>
              <p className="text-lg text-gray-600">The key tools we use for calculations</p>
            </div>
          </div>
          <div onClick={() => navigateTo(Page.ASSUMPTIONS)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">✅ Assumptions</h2>
              <p className="text-lg text-gray-600">Key assumptions for business cases</p>
            </div>
          </div>
          <div onClick={() => navigateTo(Page.REPORTS)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">📈 Revenue Reports</h2>
              <p className="text-lg text-gray-600">Reports that show how much money I'm making</p>
            </div>
          </div>
          <div onClick={() => navigateTo(Page.TIPS)} className="block cursor-pointer">
            <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-extrabold flex items-center mb-2">📝 Team Tips</h2>
              <p className="text-lg text-gray-600">Tips and tricks from my colleagues</p>
            </div>
          </div>
        </section>

        <aside className="md:col-span-1 p-8 bg-gray-50 rounded-xl shadow-lg h-fit sticky top-8">
          <h2 className="text-2xl font-extrabold mb-4">🔗 Key Links</h2>
          <ul className="space-y-2 text-lg text-gray-600">
            <li><a href="#" className="hover:underline">Gartner & Market Data</a></li>
            <li><a href="#" className="hover:underline">Latest Freight Costs</a></li>
            <li><a href="#" className="hover:underline">5 Year Rolling File</a></li>
            <li><a href="#" className="hover:underline">Business Case App</a></li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default GuidePage;