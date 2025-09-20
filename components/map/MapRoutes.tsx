"use client";
import React from "react";
import { RouteSegment } from "@/interface/map";
import { Polyline } from "react-leaflet";

interface MapRoutesProps {
  routeCoordinates: [number, number][];
  segments: RouteSegment[];
}

export const MapRoutes: React.FC<MapRoutesProps> = ({
  routeCoordinates,
  segments,
}) => {
  const getSegmentColor = (eventType?: string) => {
    const colors = {
      driving: "#2563eb",
      on_duty: "#f59e0b",
      off_duty: "#6b7280",
      sleeper: "#7c3aed",
      rest_break: "#059669",
      fuel_stop: "#dc2626",
      meal_break: "#65a30d",
      inspection: "#ea580c",
      loading: "#0891b2",
      unloading: "#9333ea",
      other: "#374151",
    };
    return colors[eventType as keyof typeof colors] || "#2563eb";
  };

  const getSegmentWeight = (eventType?: string) => {
    return eventType === "driving" ? 6 : 4;
  };

  const getSegmentOpacity = (eventType?: string) => {
    return eventType === "driving" ? 0.9 : 0.7;
  };

  return (
    <>
      {routeCoordinates.length > 1 && (
        <Polyline
          positions={routeCoordinates}
          pathOptions={{
            color: "#1f2937",
            weight: 8,
            opacity: 0.3,
          }}
        />
      )}

      {segments.map((segment, index) => (
        <Polyline
          key={`segment-${index}`}
          positions={[segment.start, segment.end]}
          pathOptions={{
            color: getSegmentColor(segment.eventType),
            weight: getSegmentWeight(segment.eventType),
            opacity: getSegmentOpacity(segment.eventType),
            dashArray: segment.eventType === "driving" ? undefined : "8, 4",
          }}
        />
      ))}
    </>
  );
};
