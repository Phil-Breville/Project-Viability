
import React from 'react';
import { Page } from '../types';
import { AnalyticsIcon, DashboardIcon, LogoIcon, ResourcesIcon, RoadmapIcon, StrategyIcon } from './Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

// Fix: Updated navItems to use valid Page enum members, making the sidebar consistent with the application's pages.
const navItems = [
  { page: Page.GUIDE, icon: DashboardIcon },
  { page: Page.CRITERIA, icon: StrategyIcon },
  { page: Page.GATES, icon: RoadmapIcon },
  { page: Page.REPORTS, icon: AnalyticsIcon },
  { page: Page.TOOLS, icon: ResourcesIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
      <div className="flex items-center justify-start h-20 border-b border-slate-200 px-6">
        <LogoIcon className="w-8 h-8 mr-3" />
        <h1 className="text-xl font-bold text-slate-800">CM Guide</h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul>
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <li key={item.page}>
                <button
                  onClick={() => setCurrentPage(item.page)}
                  className={`w-full flex items-center px-4 py-3 my-1 text-sm font-medium rounded-lg transition-colors duration-200
                    ${isActive
                      ? 'bg-sky-100 text-sky-600'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-6 border-t border-slate-200">
         <div className="bg-slate-100 p-4 rounded-lg text-center">
            <h4 className="font-semibold text-slate-700">Need Help?</h4>
            <p className="text-xs text-slate-500 mt-1">Check our documentation.</p>
            <button className="mt-3 w-full text-xs bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                Docs
            </button>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;