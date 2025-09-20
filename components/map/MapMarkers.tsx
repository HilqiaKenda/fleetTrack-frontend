"use client";
import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { format, parseISO } from "date-fns";
import { MapPosition } from "@/interface/map";
import { destinationIcon, eventIcons, originIcon } from "./MapIcons";

interface MapMarkersProps {
  positions: MapPosition[];
}

export const MapMarkers: React.FC<MapMarkersProps> = ({ positions }) => {
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
    <>
      {positions.map((position) => {
        let icon;
        let popupContent;

        switch (position.type) {
          case "origin":
            icon = originIcon;
            popupContent = (
              <Card className="border-0 shadow-none max-w-xs">
                <CardBody className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-success text-lg">
                      Journey Start
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Address:</strong> {position.data.address}
                      </p>
                      {position.data.city && (
                        <p>
                          <strong>Location:</strong> {position.data.city}
                          {position.data.state && `, ${position.data.state}`}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
            break;

          case "destination":
            icon = destinationIcon;
            popupContent = (
              <Card className="border-0 shadow-none max-w-xs">
                <CardBody className="p-3">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-danger text-lg">
                      Journey End
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Address:</strong> {position.data.address}
                      </p>
                      {position.data.city && (
                        <p>
                          <strong>Location:</strong> {position.data.city}
                          {position.data.state && `, ${position.data.state}`}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
            break;

          case "event":
            const { event, index } = position.data;
            icon = eventIcons[event.event_type] || eventIcons.other;
            popupContent = (
              <Card className="border-0 shadow-none max-w-xs">
                <CardBody className="p-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-lg">
                        {formatEventType(event.event_type)}
                      </h4>
                      <Chip
                        size="sm"
                        color={getEventTypeColor(event.event_type) as any}
                        variant="flat"
                      >
                        #{index}
                      </Chip>
                    </div>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>Time:</strong>{" "}
                        {format(parseISO(event.timestamp), "MMM dd, HH:mm")}
                      </p>
                      <p>
                        <strong>Duration:</strong> {event.duration}h
                      </p>
                      <p>
                        <strong>Location:</strong> {event.location.address}
                      </p>
                      {event.location.city && (
                        <p>
                          <strong>City:</strong> {event.location.city}
                          {event.location.state && `, ${event.location.state}`}
                        </p>
                      )}
                      {event.miles_driven > 0 && (
                        <p>
                          <strong>Miles:</strong> {event.miles_driven}
                        </p>
                      )}
                      {event.notes && (
                        <p>
                          <strong>Notes:</strong> {event.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
            break;
        }

        return (
          <Marker
            key={position.id}
            position={[position.lat, position.lng]}
            icon={icon}
          >
            <Popup>{popupContent}</Popup>
          </Marker>
        );
      })}
    </>
  );
};
