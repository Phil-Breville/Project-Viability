import React from 'react';
import { Page } from '../types';

interface GuidePageProps {
  navigateTo: (page: Page) => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ navigateTo }) => {
  return (
    <>
      {/* Sticky Breville header */}
      <div className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <img
            src="/breville-logo.png"
            alt="Breville"
           className="h-6 w-auto"
          />
          <span className="sr-only">Breville</span>
          <h1 className="ml-3 text-sm text-slate-500">Project Viability</h1>
       </div>
      </div>


      <div className="max-w-6xl mx-auto space-y-16 text-gray-800 px-4 sm:px-6 py-8">
        {/* Title + subtitle */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-shadow-custom">
            Project Viability Guide
          </h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">
            This guide helps you understand the Project Viability process and what you need to present to commercial operations.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          {/* LEFT: main cards (unchanged) */}
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

          {/* RIGHT: sidebar */}
          <aside className="md:col-span-1 space-y-8 h-fit sticky top-20">
            {/* Key Links */}
            <section className="p-8 bg-gray-50 rounded-xl shadow-lg">
              <h2 className="text-2xl font-extrabold mb-4">🔗 Key Links</h2>
              <ul className="space-y-2 text-lg text-gray-600">
                <li><a href="#" className="hover:underline">Gartner &amp; Market Data</a></li>
                <li><a href="#" className="hover:underline">Latest Freight Costs</a></li>
                <li><a href="#" className="hover:underline">5 Year Rolling File</a></li>
                <li><a href="https://finance-global-product.azurewebsites.net/finance/business_case_manage" target="_blank" rel="noopener noreferrer" className="hover:underline">Business Case App</a></li>
              </ul>
            </section>

            {/* Contact & Maintenance */}
            <section className="p-8 bg-gray-50 rounded-xl shadow-lg">
              <h2 className="text-xl font-bold mb-3 flex items-center">📇 Contact &amp; Maintenance</h2>
              <a
                href="https://forms.office.com/Pages/ResponsePage.aspx?id=tBfDO7Mv6EWUEJgk7rcuFvddwgvAX6NPpbpD1WPagsdUNVNET1Q1OUtMS0tVOU5LWTNZTjlQUU9FUy4u"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50 mb-4"
              >
                👉 Send Your Request Here
              </a>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="font-semibold">Page Owner: <span className="italic font-normal">Ali Inayat</span></p>
                  <p className="text-slate-600">
                    Provides strategic direction for this page and its use across the business.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Maintenance: <span className="font-normal">Phil Tran</span></p>
                  <p className="text-slate-600">
                    Coordinates the refresh cadence, manages content layout, and works with contributors to keep the page updated.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </main>
      </div>
    </>
  );
};

export default GuidePage;
