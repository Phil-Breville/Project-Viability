import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface AssumptionsPageProps {
  navigateTo: (page: Page) => void;
}

const AssumptionsPage: React.FC<AssumptionsPageProps> = ({ navigateTo }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show the button after a short delay to allow for a mount animation
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
      <div className="max-w-6xl mx-auto space-y-16 text-gray-800">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold">✅ Assumptions</h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">Key assumptions for business cases.</p>
        </header>

        <main className="text-center text-gray-600">
          <p>Content coming soon...</p>
        </main>
      </div>
    </>
  );
};

export default AssumptionsPage;