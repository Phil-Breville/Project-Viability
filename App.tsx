import React, { useState } from 'react';
import { Page } from './types';
import GuidePage from './pages/GuidePage';
import CriteriaPage from './pages/CriteriaPage';
import GatesPage from './pages/GatesPage';
import ToolsPage from './pages/ToolsPage';
import AssumptionsPage from './pages/AssumptionsPage';
import ReportsPage from './pages/ReportsPage';
import TipsPage from './pages/TipsPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.GUIDE);

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.GUIDE:
        return <GuidePage navigateTo={navigateTo} />;
      case Page.CRITERIA:
        return <CriteriaPage navigateTo={navigateTo} />;
      case Page.GATES:
        return <GatesPage navigateTo={navigateTo} />;
      case Page.TOOLS:
        return <ToolsPage navigateTo={navigateTo} />;
      case Page.ASSUMPTIONS:
        return <AssumptionsPage navigateTo={navigateTo} />;
      case Page.REPORTS:
        return <ReportsPage navigateTo={navigateTo} />;
      case Page.TIPS:
        return <TipsPage navigateTo={navigateTo} />;
      default:
        return <GuidePage navigateTo={navigateTo} />;
    }
  };

  return (
    <>
      {renderPage()}
    </>
  );
};

export default App;