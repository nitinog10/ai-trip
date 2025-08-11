
import React from 'react';
import { GeneratedItinerary, DayPlan, Activity } from '../types';
import { CalendarIcon, ClockIcon, DollarSignIcon, MapPinIcon, InfoIcon, TagIcon, CheckCircleIcon, TrashIcon, SparklesIcon } from './IconComponents';

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => (
    <div className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/80 transition-shadow hover:shadow-sm">
        <h4 className="font-semibold text-slate-800">{activity.title}</h4>
        <div className="mt-2 space-y-2 text-sm text-slate-600">
            <div className="flex items-center space-x-2">
                <ClockIcon className="w-4 h-4 text-slate-400" />
                <span>{activity.start_time} - {activity.end_time} ({activity.duration_minutes} mins)</span>
            </div>
            <div className="flex items-center space-x-2">
                <DollarSignIcon className="w-4 h-4 text-slate-400" />
                <span>{activity.cost} {activity.currency}</span>
            </div>
            <div className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4 text-slate-400" />
                <span>{activity.location}</span>
            </div>
            {activity.notes && (
                <div className="flex items-start space-x-2 pt-1">
                    <InfoIcon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <p className="italic">{activity.notes}</p>
                </div>
            )}
             <div className="flex items-center space-x-2 pt-1">
                <TagIcon className="w-4 h-4 text-slate-400" />
                <span className={`capitalize px-2 py-0.5 rounded-full text-xs font-medium ${activity.confidence === 'high' ? 'bg-green-100 text-green-800' : activity.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {activity.confidence} confidence
                </span>
            </div>
        </div>
    </div>
);

const DayCard: React.FC<{ day: DayPlan }> = ({ day }) => {
    const date = new Date(day.date + 'T00:00:00');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-6 h-6 text-teal-600" />
                    <div>
                        <h3 className="font-bold text-lg text-slate-800">{dayOfWeek}</h3>
                        <p className="text-sm text-slate-500">{formattedDate}</p>
                    </div>
                </div>
                <p className="mt-2 text-sm text-slate-600 italic">"{day.day_summary}"</p>
            </div>
            <div className="p-4 space-y-4">
                {day.activities.map((activity, index) => (
                    <ActivityCard key={index} activity={activity} />
                ))}
            </div>
        </div>
    );
};

export const ItineraryDisplay: React.FC<{ itinerary: GeneratedItinerary; onDiscard: () => void; }> = ({ itinerary, onDiscard }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-teal-700">{itinerary.trip_name}</h2>
                <p className="text-slate-500 mt-1">
                    Estimated Trip Cost: <span className="font-semibold text-slate-700">{new Intl.NumberFormat('en-US', { style: 'currency', currency: itinerary.currency }).format(itinerary.est_total_cost)}</span>
                </p>
            </div>
            <div className="flex items-center space-x-3">
                <button 
                    onClick={onDiscard}
                    className="flex items-center justify-center px-4 py-2 border border-slate-300 text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-colors"
                >
                    <TrashIcon className="w-4 h-4 mr-2" />
                    Discard
                </button>
                 <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Save to My Trips
                </button>
            </div>
        </div>
      </div>
      <div className="space-y-6">
        {itinerary.days.map((day, index) => (
          <DayCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind config or a style tag if needed.
// For simplicity, we can add it directly in index.html, but a real app would use tailwind.config.js
// For now, let's just create a class that can be used.
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

// Inject styles into the head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
