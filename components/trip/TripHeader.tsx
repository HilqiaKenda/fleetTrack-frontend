"use client";
import React from "react";
import { format, parseISO } from "date-fns";
import {
  UserIcon,
  UsersIcon,
  TruckIcon,
  ClockIcon,
  PackageIcon,
} from "lucide-react";
import { TripDisplayData } from "@/interface/trip";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";

interface TripHeaderProps {
  trip: TripDisplayData;
}

interface InfoCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "warning" | "danger" | "success";
}

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card className="bg-content2 border border-divider hover:shadow-md transition-shadow">
      <CardBody className="p-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-${color}/10`}>
            <div className={`text-${color}`}>{icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-default-500 uppercase tracking-wide font-medium">
              {title}
            </p>
            <p className="font-semibold text-foreground truncate" title={value}>
              {value}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const TripHeader: React.FC<TripHeaderProps> = ({ trip }) => {
  return (
    <div className="space-y-6">
      <Card className="bg-content1 border-default-200">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start w-full">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Trip #{trip.id}
              </h1>
              <p className="text-default-600 text-lg">
                {format(parseISO(trip.date), "EEEE, MMMM dd, yyyy")}
              </p>
            </div>
            <Chip
              color={trip.isCompleted ? "success" : "warning"}
              variant="flat"
              size="lg"
            >
              {trip.isCompleted ? "Completed" : "In Progress"}
            </Chip>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard
          title="Driver"
          value={trip.driverName}
          icon={<UserIcon className="w-5 h-5" />}
          color="primary"
        />

        {trip.coDriverName && (
          <InfoCard
            title="Co-Driver"
            value={trip.coDriverName}
            icon={<UsersIcon className="w-5 h-5" />}
            color="secondary"
          />
        )}

        <InfoCard
          title="Vehicle"
          value={trip.vehicleInfo}
          icon={<TruckIcon className="w-5 h-5" />}
          color="warning"
        />

        <InfoCard
          title="Cycle Rule"
          value={trip.cycleRule}
          icon={<ClockIcon className="w-5 h-5" />}
          color="danger"
        />
      </div>

      {trip.shipperAndCommodity && (
        <Card className="bg-content2 border border-divider">
          <CardBody className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-success/10">
                <PackageIcon className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-default-500 uppercase tracking-wide font-medium mb-1">
                  Shipper & Commodity
                </p>
                <p className="font-semibold text-foreground">
                  {trip.shipperAndCommodity}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
