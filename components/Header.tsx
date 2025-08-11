
import React from 'react';
import { PlaneIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500 p-2 rounded-lg">
                <PlaneIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
              AI Trip Concierge
            </h1>
          </div>
          <div className="text-sm text-slate-500">
            Powered by Gemini
          </div>
        </div>
      </div>
    </header>
  );
};
