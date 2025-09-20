"use client";

import React from "react";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { format, parseISO } from "date-fns";
import {
  TruckIcon,
  ZapIcon,
  HomeIcon,
  BedIcon,
  CoffeeIcon,
  FuelIcon,
  UtensilsIcon,
  SearchIcon,
  PackageIcon,
  Package2Icon,
  HelpCircleIcon,
  ClockIcon,
} from "lucide-react";
import { TripEvent } from "@/interface";

interface EventsTimelineProps {
  events: TripEvent[];
}

const getEventIcon = (eventType: string) => {
  const iconProps = "w-5 h-5";

  switch (eventType) {
    case "driving":
      return <TruckIcon className={iconProps} />;
    case "on_duty":
      return <ZapIcon className={iconProps} />;
    case "off_duty":
      return <HomeIcon className={iconProps} />;
    case "sleeper":
      return <BedIcon className={iconProps} />;
    case "rest_break":
      return <CoffeeIcon className={iconProps} />;
    case "fuel_stop":
      return <FuelIcon className={iconProps} />;
    case "meal_break":
      return <UtensilsIcon className={iconProps} />;
    case "inspection":
      return <SearchIcon className={iconProps} />;
    case "loading":
      return <PackageIcon className={iconProps} />;
    case "unloading":
      return <Package2Icon className={iconProps} />;
    default:
      return <HelpCircleIcon className={iconProps} />;
  }
};

const getEventColor = (eventType: string) => {
  switch (eventType) {
    case "driving":
      return "primary";
    case "on_duty":
      return "warning";
    case "off_duty":
      return "default";
    case "sleeper":
      return "secondary";
    case "rest_break":
      return "success";
    case "fuel_stop":
      return "danger";
    case "meal_break":
      return "success";
    case "inspection":
      return "warning";
    case "loading":
      return "primary";
    case "unloading":
      return "secondary";
    default:
      return "default";
  }
};

const formatEventType = (eventType: string) => {
  return eventType
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ events }) => {
  const { theme } = useTheme();

  if (!events.length) {
    return null;
  }

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  return (
    <Card className="bg-content1 border-default-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Events Timeline
          </h2>
          <Chip size="sm" variant="flat" color="primary">
            {events.length} Events
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          {sortedEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex items-start space-x-4 p-4 rounded-lg border-l-4 transition-colors ${
                theme === "dark"
                  ? "bg-content2 border-l-primary/50 hover:bg-content3"
                  : "bg-content2 border-l-primary/30 hover:bg-gray-50"
              }`}
            >
              {index < sortedEvents.length - 1 && (
                <div
                  className={`absolute left-8 top-14 w-0.5 h-12 ${
                    theme === "dark" ? "bg-divider" : "bg-gray-200"
                  }`}
                />
              )}

              <div className="flex flex-col items-center space-y-2 flex-shrink-0">
                <Chip
                  size="sm"
                  variant="flat"
                  color={getEventColor(event.event_type) as any}
                  className="min-w-[32px]"
                >
                  {index + 1}
                </Chip>
                <div
                  className={`p-2 rounded-full ${
                    theme === "dark" ? "bg-content3" : "bg-gray-100"
                  }`}
                >
                  {getEventIcon(event.event_type)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-foreground">
                        {formatEventType(event.event_type)}
                      </h3>
                      <Chip
                        size="sm"
                        color={getEventColor(event.event_type) as any}
                        variant="dot"
                      />
                    </div>

                    <p className="text-sm text-default-600 mb-2">
                      {format(
                        parseISO(event.timestamp),
                        "MMM dd, yyyy 'at' HH:mm"
                      )}
                    </p>

                    {typeof event.location === "object" &&
                      event.location.address && (
                        <div className="flex items-start space-x-1 mb-2">
                          <div className="text-default-500 text-sm">
                            📍 {event.location.address}
                            {event.location.city && (
                              <span className="text-default-400">
                                {" • "}
                                {event.location.city}
                                {event.location.state &&
                                  `, ${event.location.state}`}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                    {event.notes && (
                      <p
                        className={`text-sm mt-2 p-2 rounded ${
                          theme === "dark"
                            ? "bg-content3 text-default-600"
                            : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        💭 {event.notes}
                      </p>
                    )}
                  </div>

                  <div className="text-right ml-4 space-y-1">
                    <div
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        theme === "dark"
                          ? "bg-primary/20 text-primary"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {event.duration}h
                    </div>
                    {event.miles_driven > 0 && (
                      <div className="text-xs text-default-500">
                        {event.miles_driven} miles
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
