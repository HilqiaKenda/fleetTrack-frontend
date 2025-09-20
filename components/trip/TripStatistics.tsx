"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Trip } from "@/interface";

interface TripStatisticsProps {
  trip: Trip;
  statistics: {
    totalEvents: number;
    drivingEvents: number;
    restEvents: number;
    totalDistance: number;
  };
}

export const TripStatistics: React.FC<TripStatisticsProps> = ({
  trip,
  statistics,
}) => {
  return (
    <Card className="mt-4">
      <CardBody>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div className="p-3 bg-primary/10 rounded-lg">
            <p className="text-2xl font-bold text-primary">
              {statistics.totalEvents}
            </p>
            <p className="text-sm text-gray-600">Total Events</p>
          </div>
          <div className="p-3 bg-success/10 rounded-lg">
            <p className="text-2xl font-bold text-success">
              {statistics.drivingEvents}
            </p>
            <p className="text-sm text-gray-600">Driving Events</p>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg">
            <p className="text-2xl font-bold text-warning">
              {statistics.restEvents}
            </p>
            <p className="text-sm text-gray-600">Rest Events</p>
          </div>
          <div className="p-3 bg-secondary/10 rounded-lg">
            <p className="text-2xl font-bold text-secondary">
              {trip.total_miles_driving}
            </p>
            <p className="text-sm text-gray-600">Trip Miles</p>
          </div>
          <div className="p-3 bg-danger/10 rounded-lg">
            <p className="text-2xl font-bold text-danger">
              {trip.total_driving_hours}h
            </p>
            <p className="text-sm text-gray-600">Drive Hours</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
