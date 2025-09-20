"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Card, CardBody } from "@nextui-org/react";
import "leaflet/dist/leaflet.css";
import { Trip, TripEvent } from "@/interface";
import { Icon } from "leaflet";
import { JourneyCalculator } from "@/interface/mapUtils";
import { MapLegend } from "../map/MapLegend";
import { MapControls } from "../map/MapControls";
import { MapRoutes } from "../map/MapRoutes";
import { MapMarkers } from "../map/MapMarkers";
import { TripStatistics } from "./TripStatistics";
import { JourneyTimeline } from "../location/JourneyTimeline";

if (typeof window !== "undefined") {
  delete (Icon.Default.prototype as any)._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

interface TripMapProps {
  trip: Trip;
  events: TripEvent[];
}

const TripMap: React.FC<TripMapProps> = ({ trip, events }) => {
  const [journeyData, setJourneyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const processData = async () => {
      setIsLoading(true);
      try {
        const data = JourneyCalculator.processJourneyData(trip, events);
        setJourneyData(data);
      } catch (error) {
        console.error("Failed to process journey data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    processData();
  }, [trip, events]);

  if (isLoading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardBody className="text-center">
          <p className="text-gray-500">Processing journey data...</p>
        </CardBody>
      </Card>
    );
  }

  if (!journeyData?.positions.length) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardBody className="text-center">
          <p className="text-gray-500">
            No location data available for this trip
          </p>
        </CardBody>
      </Card>
    );
  }

  const center: [number, number] =
    journeyData.positions.length > 0
      ? [journeyData.positions[0].lat, journeyData.positions[0].lng]
      : [39.8283, -98.5795];

  const allCoordinates: [number, number][] = journeyData.positions.map(
    (pos: any) => [pos.lat, pos.lng]
  );

  return (
    <div className="w-full space-y-4">
      <MapLegend />

      <div className="h-96 w-full rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
        <MapContainer
          center={center}
          zoom={6}
          className="h-full w-full"
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapControls positions={allCoordinates} />
          <MapRoutes
            routeCoordinates={journeyData.routeCoordinates}
            segments={journeyData.segments}
          />
          <MapMarkers positions={journeyData.positions} />
        </MapContainer>
      </div>

      <TripStatistics trip={trip} statistics={journeyData.statistics} />
      <JourneyTimeline events={events} />

      {isLoading && (
        <div className="mt-2 text-sm text-gray-500 text-center">
          Loading route information...
        </div>
      )}
    </div>
  );
};

export default TripMap;
