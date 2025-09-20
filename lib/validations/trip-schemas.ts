import { z } from "zod";

export const locationDataSchema = z.object({
  address: z.string().min(1, "Address is required"),
  latitude: z.number(),
  longitude: z.number(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
});

export const initialEventSchema = z
  .object({
    location_data: locationDataSchema,
    event_type: z.enum(
      [
        "driving",
        "on_duty",
        "off_duty",
        "sleeper",
        "rest_break",
        "fuel_stop",
        "meal_break",
        "inspection",
        "loading",
        "unloading",
        "other",
      ],
      {
        message: "Please select a valid event type",
      }
    ),
    timestamp: z.string().min(1, "Timestamp is required"),
    duration: z
      .number()
      .min(0, "Duration must be zero or positive")
      .max(24, "Duration cannot exceed 24 hours"),
    miles_driven: z
      .number()
      .min(0, "Miles must be zero or positive")
      .default(0),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.event_type === "driving" && data.miles_driven <= 0) {
        return false;
      }
      return true;
    },
    {
      message: "Driving events should have miles driven greater than 0",
      path: ["miles_driven"],
    }
  );

export const tripSchema = z.object({
  driver: z.number().min(1, "Driver is required"),
  co_driver: z.number().optional().nullable(),
  vehicle: z.number().min(1, "Vehicle is required"),
  date: z.string().min(1, "Date is required"),
  cycle_rule: z.enum(["70hr/8day", "60hr/7day"] as const),
  shipper_and_commodity: z.string().optional(),
  remarks: z.string().optional(),
  origin_location: z.number().optional().nullable(),
  destination_location: z.number().optional().nullable(),
  initial_events: z
    .array(initialEventSchema)
    .min(1, "At least one initial event is required"),
});

export const eventSchema = z.object({
  trip: z.number().min(1, "Trip is required"),
  location_data: locationDataSchema,
  event_type: z.enum(
    [
      "driving",
      "on_duty",
      "off_duty",
      "sleeper",
      "rest_break",
      "fuel_stop",
      "meal_break",
      "inspection",
      "loading",
      "unloading",
      "other",
    ],
    {
      message: "Please select a valid event type",
    }
  ),
  timestamp: z.string().min(1, "Timestamp is required"),
  duration: z
    .number()
    .min(0, "Duration must be zero or positive")
    .max(24, "Duration cannot exceed 24 hours"),
  miles_driven: z.number().min(0, "Miles must be zero or positive").default(0),
  notes: z.string().optional(),
});

export const locationSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address is too long"),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const enhancedEventSchema = eventSchema
  .refine(
    (data) => {
      if (data.event_type === "driving" && data.miles_driven <= 0) {
        return false;
      }
      return true;
    },
    {
      message: "Driving events should have miles driven greater than 0",
      path: ["miles_driven"],
    }
  )
  .refine(
    (data) => {
      const eventTime = new Date(data.timestamp);
      const now = new Date();
      const maxFutureTime = new Date(now.getTime() + 5 * 60 * 1000);

      if (eventTime > maxFutureTime) {
        return false;
      }
      return true;
    },
    {
      message: "Event time cannot be more than 5 minutes in the future",
      path: ["timestamp"],
    }
  );

export const EVENT_TYPE_OPTIONS = [
  {
    value: "driving",
    label: "Driving",
    color: "primary",
    icon: "🚛",
    description: "Actively driving the vehicle",
  },
  {
    value: "on_duty",
    label: "On Duty (Not Driving)",
    color: "warning",
    icon: "⚡",
    description: "On duty but not driving",
  },
  {
    value: "off_duty",
    label: "Off Duty",
    color: "default",
    icon: "🏠",
    description: "Not available for work",
  },
  {
    value: "sleeper",
    label: "Sleeper Berth",
    color: "secondary",
    icon: "🛏️",
    description: "Resting in sleeper berth",
  },
  {
    value: "rest_break",
    label: "Rest Break",
    color: "success",
    icon: "☕",
    description: "Taking a break",
  },
  {
    value: "fuel_stop",
    label: "Fuel Stop",
    color: "danger",
    icon: "⛽",
    description: "Refueling vehicle",
  },
  {
    value: "meal_break",
    label: "Meal Break",
    color: "success",
    icon: "🍽️",
    description: "Eating meal",
  },
  {
    value: "inspection",
    label: "Vehicle Inspection",
    color: "warning",
    icon: "🔍",
    description: "Inspecting vehicle",
  },
  {
    value: "loading",
    label: "Loading",
    color: "primary",
    icon: "📦",
    description: "Loading cargo",
  },
  {
    value: "unloading",
    label: "Unloading",
    color: "primary",
    icon: "📤",
    description: "Unloading cargo",
  },
  {
    value: "other",
    label: "Other",
    color: "default",
    icon: "❓",
    description: "Other activity",
  },
] as const;

export const CYCLE_RULE_OPTIONS = [
  {
    value: "70hr/8day",
    label: "70 Hours / 8 Days",
    description: "Interstate drivers - 70 hours in 8 consecutive days",
  },
  {
    value: "60hr/7day",
    label: "60 Hours / 7 Days",
    description: "Intrastate drivers - 60 hours in 7 consecutive days",
  },
] as const;

export const validateLocationData = (data: any): boolean => {
  try {
    locationDataSchema.parse(data);
    return true;
  } catch {
    return false;
  }
};

export const validateEventType = (eventType: string): boolean => {
  return EVENT_TYPE_OPTIONS.some((option) => option.value === eventType);
};

export const formatEventTypeName = (eventType: string): string => {
  const option = EVENT_TYPE_OPTIONS.find((opt) => opt.value === eventType);
  return option ? option.label : eventType.replace(/_/g, " ");
};

export type LocationData = z.infer<typeof locationDataSchema>;
export type InitialEventType = z.infer<typeof initialEventSchema>;
export type TripFormData = z.infer<typeof tripSchema>;
export type EventFormData = z.infer<typeof eventSchema>;
export type LocationFormData = z.infer<typeof locationSchema>;
export type EnhancedEventFormData = z.infer<typeof enhancedEventSchema>;
