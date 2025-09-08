
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ currentPage }) => {
  return (
    <header className="flex-shrink-0 h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <h2 className="text-2xl font-bold text-slate-900">{currentPage}</h2>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-slate-200 rounded-full">
            <img src="https://picsum.photos/100" alt="User Avatar" className="w-full h-full rounded-full object-cover"/>
        </div>
      </div>
    </header>
  );
};

export default Header;
