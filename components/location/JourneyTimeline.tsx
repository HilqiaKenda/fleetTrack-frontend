"use client";
import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { TripEvent } from "@/interface";

interface JourneyTimelineProps {
  events: TripEvent[];
}

export const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ events }) => {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  const formatEventType = (eventType: string) => {
    return eventType
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getEventTypeColor = (eventType: string) => {
    const colors = {
      driving: "primary",
      on_duty: "warning",
      off_duty: "default",
      sleeper: "secondary",
      rest_break: "success",
      fuel_stop: "danger",
      meal_break: "success",
      inspection: "warning",
      loading: "primary",
      unloading: "secondary",
      other: "default",
    };
    return colors[eventType as keyof typeof colors] || "default";
  };

  return (
    <Card className="mt-4">
      <CardBody>
        <h5 className="font-semibold mb-3">Journey Timeline</h5>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {sortedEvents.map((event, index) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-primary/30"
            >
              <div className="flex items-center space-x-3">
                <Chip
                  size="sm"
                  color={getEventTypeColor(event.event_type) as any}
                  variant="flat"
                >
                  #{index + 1}
                </Chip>
                <div>
                  <p className="font-medium text-sm">
                    {formatEventType(event.event_type)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(parseISO(event.timestamp), "HH:mm")} -{" "}
                    {event.duration}h
                  </p>
                </div>
              </div>
              <div className="text-right">
                {event.miles_driven > 0 && (
                  <span className="text-sm font-medium text-gray-600">
                    {event.miles_driven} mi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
