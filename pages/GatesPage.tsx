import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface GatesPageProps {
  navigateTo: (page: Page) => void;
}

const GatesPage: React.FC<GatesPageProps> = ({ navigateTo }) => {
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
          <h1 className="text-5xl md:text-6xl font-extrabold">📦 What do I need to present at stage gates?</h1>
          <p className="text-lg md:text-xl font-normal text-gray-500 max-w-2xl mx-auto">A quick guide on key requirements for each stage gate.</p>
        </header>

        <div className="flex flex-col items-center">
          <div className="diamond-shape diamond-ideation">
            <div className="diamond-text">Concept Go</div>
          </div>
          <div className="stage-card p-6 mb-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Concept Go</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Presentation Template:</strong> [Add link to template]</li>
              <li><strong>Must-Dos:</strong> [List key tasks]</li>
              <li><strong>Assumptions:</strong> [List assumptions]</li>
              <li><strong>Commercial Checklist:</strong> [Add link to checklist]</li>
            </ul>
          </div>
          
          <div className="diamond-shape diamond-commercial">
            <div className="diamond-text">Commercial Go</div>
          </div>
          <div className="stage-card p-6 mb-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Commercial Go</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Presentation Template:</strong> [Add link to template]</li>
              <li><strong>Must-Dos:</strong> [List key tasks]</li>
              <li><strong>Assumptions:</strong> [List assumptions]</li>
              <li><strong>Commercial Checklist:</strong> [Add link to checklist]</li>
            </ul>
          </div>

          <div className="diamond-shape diamond-tool-release">
            <div className="diamond-text">Tool Release</div>
          </div>
          <div className="stage-card p-6 mb-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Tool Release</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Presentation Template:</strong> [Add link to template]</li>
              <li><strong>Must-Dos:</strong> [List key tasks]</li>
              <li><strong>Assumptions:</strong> [List assumptions]</li>
              <li><strong>Commercial Checklist:</strong> [Add link to checklist]</li>
            </ul>
          </div>

          <div className="diamond-shape diamond-production">
            <div className="diamond-text">Production Release</div>
          </div>
          <div className="stage-card p-6 mb-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Production Release</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Presentation Template:</strong> [Add link to template]</li>
              <li><strong>Must-Dos:</strong> [List key tasks]</li>
              <li><strong>Assumptions:</strong> [List assumptions]</li>
              <li><strong>Commercial Checklist:</strong> [Add link to checklist]</li>
            </ul>
          </div>
          
          <div className="diamond-shape diamond-team-release">
            <div className="diamond-text">Team Release</div>
          </div>
          <div className="stage-card p-6 mb-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Team Release</h3>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Presentation Template:</strong> [Add link to template]</li>
              <li><strong>Must-Dos:</strong> [List key tasks]</li>
              <li><strong>Assumptions:</strong> [List assumptions]</li>
              <li><strong>Commercial Checklist:</strong> [Add link to checklist]</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GatesPage;