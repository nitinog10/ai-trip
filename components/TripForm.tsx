
import React from 'react';
import { TripPreferences } from '../types';
import { SparklesIcon } from './IconComponents';

interface TripFormProps {
  preferences: TripPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<TripPreferences>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  label: string;
  id: keyof TripPreferences;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: string;
  as?: 'input' | 'textarea' | 'select';
  options?: { value: string; label:string }[];
  required?: boolean;
}> = ({ label, id, value, onChange, type = 'text', as = 'input', options, required = true }) => {
  const commonClasses = "block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";
  
  const renderInput = () => {
    switch (as) {
      case 'textarea':
        return <textarea id={id} name={id} value={value} onChange={onChange} required={required} className={`${commonClasses} min-h-[80px]`} />;
      case 'select':
        return (
          <select id={id} name={id} value={value} onChange={onChange} required={required} className={commonClasses}>
            {options?.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        );
      default:
        return <input type={type} id={id} name={id} value={value} onChange={onChange} required={required} className={commonClasses} />;
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {renderInput()}
    </div>
  );
};

export const TripForm: React.FC<TripFormProps> = ({ preferences, setPreferences, onGenerate, isLoading }) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: (type === 'number') ? parseFloat(value) : value
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Plan Your Dream Trip</h2>
      <form onSubmit={(e) => { e.preventDefault(); onGenerate(); }} className="space-y-4">
        <InputField label="Destinations" id="locations" value={preferences.locations} onChange={handleChange} />
        <div className="grid grid-cols-2 gap-4">
            <InputField label="Start Date" id="start_date" type="date" value={preferences.start_date} onChange={handleChange} />
            <InputField label="End Date" id="end_date" type="date" value={preferences.end_date} onChange={handleChange} />
        </div>
        <InputField label="Interests & Activities" id="interests" as="textarea" value={preferences.interests} onChange={handleChange} />
        <InputField label="Must-Visit Places" id="must_visits" as="textarea" value={preferences.must_visits} onChange={handleChange} />
        <InputField 
            label="Pace" 
            id="pace" 
            as="select" 
            value={preferences.pace}
            onChange={handleChange}
            options={[
                { value: 'relaxed', label: 'Relaxed' },
                { value: 'normal', label: 'Normal' },
                { value: 'packed', label: 'Packed' },
            ]}
        />
        <div className="grid grid-cols-2 gap-4">
            <InputField label="Travelers" id="num_travelers" type="number" value={preferences.num_travelers} onChange={handleChange} />
            <InputField label="Budget/Person (USD)" id="budget_per_person" type="number" value={preferences.budget_per_person} onChange={handleChange} />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate Itinerary
            </>
          )}
        </button>
      </form>
    </div>
  );
};
