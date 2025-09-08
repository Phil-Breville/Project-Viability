
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-slate-200 ${className}`}>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
        <div>{children}</div>
    </div>
);

const QuickLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} className="block text-sky-600 hover:text-sky-800 hover:bg-sky-50 -mx-2 px-2 py-1.5 rounded-md transition-colors duration-200 text-sm">
        {children}
    </a>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome, Category Manager!</h2>
        <p className="mt-2 text-slate-600">Here's your starting point for success. Find key resources and track your progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="Quick Links" className="lg:col-span-1">
            <div className="space-y-2">
                <QuickLink href="#">View Current Product Roadmap</QuickLink>
                <QuickLink href="#">Access Market Research Portal</QuickLink>
                <QuickLink href="#">Submit New Product Idea</QuickLink>
                <QuickLink href="#">Review Q3 Analytics</QuickLink>
            </div>
        </InfoCard>

        <InfoCard title="Key Metrics" className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500 font-medium">Revenue (YTD)</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">$1.2M</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500 font-medium">Market Share</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">18.5%</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-500 font-medium">Customer Sat.</p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">92%</p>
                </div>
            </div>
        </InfoCard>

        <InfoCard title="Upcoming Milestones" className="lg:col-span-3">
           <ul className="space-y-4">
               <li className="flex items-center">
                   <div className="w-2 h-2 bg-sky-500 rounded-full mr-4"></div>
                   <div>
                       <p className="font-medium text-slate-700">Q4 Strategy Presentation</p>
                       <p className="text-sm text-slate-500">October 28, 2024</p>
                   </div>
                   <span className="ml-auto text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">On Track</span>
               </li>
                <li className="flex items-center">
                   <div className="w-2 h-2 bg-sky-500 rounded-full mr-4"></div>
                   <div>
                       <p className="font-medium text-slate-700">New Feature 'Gamma' Launch</p>
                       <p className="text-sm text-slate-500">November 15, 2024</p>
                   </div>
                   <span className="ml-auto text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">On Track</span>
               </li>
               <li className="flex items-center">
                   <div className="w-2 h-2 bg-sky-500 rounded-full mr-4"></div>
                   <div>
                       <p className="font-medium text-slate-700">2025 Roadmap Finalization</p>
                       <p className="text-sm text-slate-500">December 10, 2024</p>
                   </div>
                   <span className="ml-auto text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Needs Review</span>
               </li>
           </ul>
        </InfoCard>
      </div>
    </div>
  );
};

export default Dashboard;
