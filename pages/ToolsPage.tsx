import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { FaFileInvoice, FaChartLine, FaShippingFast, FaSearchDollar, FaFolderOpen } from 'react-icons/fa';

interface ToolsPageProps {
  navigateTo: (page: Page) => void;
}

const ToolsPage: React.FC<ToolsPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the button after a short delay to allow for a mount animation
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Define the data for your table from the screenshot
  const toolsData = [
    {
      icon: <FaFileInvoice />,
      toolName: 'Business Case',
      usedFor: 'Pricing Matrix & supporting sheets',
      lastUpdated: '10/09/2025',
      keyNotes: 'Align but no standard',
      relatedLinks: 'Template'
    },
    {
      icon: <FaChartLine />,
      toolName: 'POV Files',
      usedFor: '5-year forecast and long-term analysis',
      lastUpdated: '10/09/2025',
      keyNotes: 'Ask Oscar for Camel/Stackline access',
      relatedLinks: '-'
    },
    {
      icon: <FaSearchDollar />,
      toolName: 'Gartner/Market Data',
      usedFor: 'Market prices, shares, category analysis with tools like CamelCamelCamel, JfK Competera, Stackline',
      lastUpdated: '10/09/2025',
      keyNotes: 'Standard data source coming',
      relatedLinks: '-'
    },
    {
      icon: <FaShippingFast />,
      toolName: 'Freight Costs',
      usedFor: 'Freight cost (auto-generated from Business Case template, requires market & factory validation)',
      lastUpdated: '10/09/2025',
      keyNotes: 'Must verify with market & factory input',
      relatedLinks: '-'
    },
    {
      icon: <FaFolderOpen />,
      toolName: 'Project Actuals & Budget',
      usedFor: 'Tracks project performance within the financial year vs budget. Supports managing current and future budgets across FY, with ability to reallocate funds if projects close.',
      lastUpdated: '10/09/2025',
      keyNotes: 'Requires finance input',
      relatedLinks: '-'
    },
  ];

  return (
    <>
      <button
        onClick={() => navigateTo(Page.GUIDE)}
        className={`back-button ${showButton ? 'show' : ''}`}
        aria-label="Back to Main Page"
      >
        ← Back to Main Page
      </button>
      <div className="max-w-6xl mx-auto space-y-16 text-gray-800">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold">📊 Viability Tools</h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">The key tools we use for calculations.</p>
        </header>

        <main className="text-center text-gray-600">
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tool Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Used For</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Key Notes / Announcements</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Related Links</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {toolsData.map((row, index) => (
                  <tr key={index} className="transition-all duration-300 hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="text-xl text-gray-600">
                        {row.icon}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.toolName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.usedFor}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.lastUpdated}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{row.keyNotes}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.relatedLinks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default ToolsPage;