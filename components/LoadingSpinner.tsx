
import React from 'react';
import { SparklesIcon } from './IconComponents';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="relative">
            <svg className="h-24 w-24 animate-spin text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <SparklesIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-teal-600" />
        </div>
      <h2 className="text-xl font-semibold text-slate-700 mt-6">Crafting Your Itinerary...</h2>
      <p className="mt-2 text-slate-500">Our AI is exploring the best options for you.</p>
    </div>
  );
};
