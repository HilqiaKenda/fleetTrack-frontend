import {
  eventSchema,
  locationSchema,
  tripSchema,
} from "@/lib/validations/trip-schemas";
import z from "zod";

export interface Location {
  id: number;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: number;
  driver_initial: string;
  full_name: string;
  license_number: string;
  phone_number?: string;
  email?: string;
  created_at: string;
  updated_at: string;
}

export interface Carrier {
  id: number;
  name: string;
  dot_number?: string;
  mc_number?: string;
  address?: string;
  phone?: string;
  created_at: string;
}

export interface Vehicle {
  id: number;
  truck_number: string;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  license_plate?: string;
  carrier: number | Carrier;
  created_at: string;
}

export type CycleRule = "70hr/8day" | "60hr/7day";

export interface Trip {
  id: number;
  date: string;
  driver: number | Driver;
  driver_name: string;
  co_driver?: number | Driver | null;
  co_driver_name?: string;
  vehicle: number;
  vehicle_info: string;

  shipper_and_commodity?: string;
  cycle_rule: CycleRule;

  total_miles_driving: number;
  total_mileage_today: number;
  total_driving_hours: number;
  total_on_duty_hours: number;
  total_off_duty_hours: number;
  total_sleeper_hours: number;

  remarks?: string;
  is_completed: boolean;

  created_at: string;
  updated_at: string;

  cycle_hours_used?: number;
  origin_location?: Location | null;
  destination_location?: Location | null;

  events: TripEvent[];
}

export interface HoursSummary {
  total_driving_hours: number;
  total_on_duty_hours: number;
  total_miles: number;
  trip_count: number;
}

export type EventType =
  | "driving"
  | "on_duty"
  | "off_duty"
  | "sleeper"
  | "rest_break"
  | "fuel_stop"
  | "meal_break"
  | "inspection"
  | "loading"
  | "unloading"
  | "other";

export interface TripEvent {
  id: number;
  trip: number | Trip;
  location: number | Location;

  event_type: EventType;
  timestamp: string;
  duration: number;

  miles_driven: number;
  notes?: string;

  created_at: string;
  updated_at: string;
}

export interface TripCreateData {
  driver: number;
  co_driver?: number;
  vehicle: number;
  date: string;
  cycle_rule: string;
  initial_events: object[];
  shipper_and_commodity?: string;
  remarks?: string;
  origin_location?: any;
  destination_location?: any;
}

export interface TripEventCreateData {
  location_data: number;
  timestamp: string;
  event_type: string;
  duration: number;
  miles_driven: number;
  notes?: string | null;
}

export interface HoursSummary {
  total_driving_hours: number;
  total_on_duty_hours: number;
  total_miles: number;
  trip_count: number;
}

export interface TripStatistics {
  total_trips: number;
  completed_trips: number;
  total_miles: number;
  total_driving_hours: number;
  avg_miles_per_trip: number;
  avg_driving_hours: number;
}

type TripFormData = z.infer<typeof tripSchema>;
type EventFormData = z.infer<typeof eventSchema>;
type LocationFormData = z.infer<typeof locationSchema>;

const EVENT_TYPE_OPTIONS = [
  { value: "driving", label: "Driving", color: "primary", icon: "🚛" },
  {
    value: "on_duty",
    label: "On Duty (Not Driving)",
    color: "warning",
    icon: "⚡",
  },
  { value: "off_duty", label: "Off Duty", color: "default", icon: "🏠" },
  { value: "sleeper", label: "Sleeper Berth", color: "secondary", icon: "🛏️" },
  { value: "rest_break", label: "Rest Break", color: "success", icon: "☕" },
  { value: "fuel_stop", label: "Fuel Stop", color: "danger", icon: "⛽" },
  { value: "meal_break", label: "Meal Break", color: "success", icon: "🍽️" },
  {
    value: "inspection",
    label: "Vehicle Inspection",
    color: "warning",
    icon: "🔍",
  },
  { value: "loading", label: "Loading", color: "primary", icon: "📦" },
  { value: "unloading", label: "Unloading", color: "primary", icon: "📤" },
  { value: "other", label: "Other", color: "default", icon: "❓" },
] as const;
