
export interface TripPreferences {
  start_date: string;
  end_date: string;
  locations: string;
  interests: string;
  pace: 'relaxed' | 'normal' | 'packed';
  budget_per_person: number;
  num_travelers: number;
  must_visits: string;
}

export interface Activity {
  title: string;
  start_time: string; // "HH:MM"
  end_time: string; // "HH:MM"
  duration_minutes: number;
  cost: number;
  currency: "USD" | "EUR" | "INR";
  location: string;
  notes: string;
  confidence: "low" | "medium" | "high";
}

export interface DayPlan {
  date: string; // "YYYY-MM-DD"
  day_summary: string;
  activities: Activity[];
}

export interface GeneratedItinerary {
  trip_name: string;
  est_total_cost: number;
  currency: "USD" | "EUR" | "INR";
  days: DayPlan[];
}
