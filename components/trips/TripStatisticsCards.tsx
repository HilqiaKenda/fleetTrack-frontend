"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { TruckIcon, ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface TripStatistics {
  total_trips: number;
  completed_trips: number;
  total_miles?: number;
  total_driving_hours?: number;
}

interface TripStatisticsCardsProps {
  statistics: TripStatistics;
}

export const TripStatisticsCards: React.FC<TripStatisticsCardsProps> = ({
  statistics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardBody className="flex flex-row items-center space-x-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TruckIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Trips
            </p>
            <p className="text-2xl font-bold text-foreground">
              {statistics.total_trips}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center space-x-4">
          <div className="p-2 bg-success/10 rounded-lg">
            <ClockIcon className="w-6 h-6 text-success" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Completed
            </p>
            <p className="text-2xl font-bold text-foreground">
              {statistics.completed_trips}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center space-x-4">
          <div className="p-2 bg-warning/10 rounded-lg">
            <MapPinIcon className="w-6 h-6 text-warning" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Miles
            </p>
            <p className="text-2xl font-bold text-foreground">
              {statistics.total_miles?.toLocaleString() || 0}
            </p>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="flex flex-row items-center space-x-4">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <ClockIcon className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Driving Hours
            </p>
            <p className="text-2xl font-bold text-foreground">
              {statistics.total_driving_hours?.toFixed(1) || 0}h
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
