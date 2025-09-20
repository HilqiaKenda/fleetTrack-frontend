"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MapPinIcon, FlagIcon } from "lucide-react";
import { TripDisplayData } from "@/interface/trip";

interface RouteInformationProps {
  trip: TripDisplayData;
}

export const RouteInformation: React.FC<RouteInformationProps> = ({ trip }) => {
  if (!trip.originLocation && !trip.destinationLocation) {
    return null;
  }

  return (
    <Card className="bg-content1 border-default-200">
      <CardHeader>
        <h2 className="text-lg font-semibold text-foreground">
          Route Information
        </h2>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trip.originLocation && (
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <MapPinIcon className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-default-600 mb-1 font-medium">
                  Origin
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    {trip.originLocation.address}
                  </p>
                  {trip.originLocation.city && (
                    <p className="text-sm text-default-500">
                      {trip.originLocation.city}
                      {trip.originLocation.state &&
                        `, ${trip.originLocation.state}`}
                      {trip.originLocation.country &&
                        ` ${trip.originLocation.country}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {trip.destinationLocation && (
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <FlagIcon className="w-5 h-5 text-danger" />
              </div>
              <div>
                <p className="text-sm text-default-600 mb-1 font-medium">
                  Destination
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-foreground">
                    {trip.destinationLocation.address}
                  </p>
                  {trip.destinationLocation.city && (
                    <p className="text-sm text-default-500">
                      {trip.destinationLocation.city}
                      {trip.destinationLocation.state &&
                        `, ${trip.destinationLocation.state}`}
                      {trip.destinationLocation.country &&
                        ` ${trip.destinationLocation.country}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
