
import React, { useState, useCallback } from 'react';
import { TripPreferences, GeneratedItinerary } from './types';
import { generateItinerary } from './services/geminiService';
import { Header } from './components/Header';
import { TripForm } from './components/TripForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { GlobeIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [preferences, setPreferences] = useState<TripPreferences>({
    locations: 'Paris, France',
    interests: 'Museums, cafes, historical sites',
    pace: 'normal',
    budget_per_person: 1500,
    num_travelers: 2,
    must_visits: 'Eiffel Tower, Louvre Museum',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split('T')[0],
  });

  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateItinerary = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const result = await generateItinerary(preferences);
      setItinerary(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console and ensure your API key is valid.');
    } finally {
      setIsLoading(false);
    }
  }, [preferences]);
  
  const handleDiscard = () => {
    setItinerary(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <TripForm
              preferences={preferences}
              setPreferences={setPreferences}
              onGenerate={handleGenerateItinerary}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            {isLoading && <LoadingSpinner />}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Generation Failed: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {itinerary ? (
              <ItineraryDisplay itinerary={itinerary} onDiscard={handleDiscard} />
            ) : (
              !isLoading && !error && (
                <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                  <GlobeIcon className="w-24 h-24 text-teal-500 mb-6" />
                  <h2 className="text-2xl font-bold text-slate-800">Your Adventure Awaits</h2>
                  <p className="mt-2 text-slate-500 max-w-md">
                    Fill in your travel details on the left and let our AI Trip Concierge craft the perfect itinerary for you.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
