"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MapIcon } from "lucide-react";
import TripMap from "@/components/trip/TripMap";
import { Trip, TripEvent } from "@/interface";

interface TripMapSectionProps {
  trip: Trip;
  events: TripEvent[];
}

export const TripMapSection: React.FC<TripMapSectionProps> = ({
  trip,
  events,
}) => {
  return (
    <Card className="bg-content1 border-default-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MapIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Trip Route & Events
          </h2>
        </div>
      </CardHeader>
      <CardBody>
        <TripMap events={events} trip={trip} />
      </CardBody>
    </Card>
  );
};
