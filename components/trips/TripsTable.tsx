"use client";
import React from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Button,
  Spinner,
} from "@nextui-org/react";
import { Trip } from "@/interface";
import { TripDataFormatter } from "@/interface/tripFormatter";

interface TripsTableProps {
  trips: Trip[];
  isLoading: boolean;
}

export const TripsTable: React.FC<TripsTableProps> = ({ trips, isLoading }) => {
  const getStatusColor = (isCompleted: boolean) => {
    return isCompleted ? "success" : "warning";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Table aria-label="Trips table" className="min-w-full">
      <TableHeader>
        <TableColumn>Date</TableColumn>
        <TableColumn>Driver</TableColumn>
        <TableColumn>Vehicle</TableColumn>
        <TableColumn>Route</TableColumn>
        <TableColumn>Miles</TableColumn>
        <TableColumn>Hours</TableColumn>
        <TableColumn>Status</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {trips.map((trip) => {
          const onDutyHours = TripDataFormatter.calculateOnDutyHours(
            trip.events || []
          );

          return (
            <TableRow key={trip.id}>
              <TableCell>
                <div className="text-sm">
                  <p className="font-medium">
                    {format(parseISO(trip.date), "MMM dd, yyyy")}
                  </p>
                  <p className="text-gray-500">
                    {format(parseISO(trip.date), "EEEE")}
                  </p>
                </div>
              </TableCell>

              <TableCell>
                <div>
                  <Chip variant="flat" size="sm" color="primary">
                    {trip.driver_name}
                  </Chip>
                  {trip.co_driver && (
                    <p className="text-sm text-gray-500">
                      Co-driver:{trip.co_driver_name}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <Chip variant="flat" size="sm" color="primary">
                  {trip.vehicle_info}
                </Chip>
              </TableCell>

              <TableCell>
                <div className="text-sm space-y-1">
                  {trip.origin_location && (
                    <p className="flex items-center">
                      <span className="text-green-600 mr-1">From:</span>
                      {trip.origin_location.city ||
                        trip.origin_location.address}
                    </p>
                  )}
                  {trip.destination_location && (
                    <p className="flex items-center">
                      <span className="text-red-600 mr-1">To:</span>
                      {trip.destination_location.city ||
                        trip.destination_location.address}
                    </p>
                  )}
                  {trip.shipper_and_commodity && (
                    <p className="text-gray-500 text-xs truncate max-w-[200px]">
                      {trip.shipper_and_commodity}
                    </p>
                  )}
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm font-medium">
                  {trip.total_miles_driving?.toLocaleString() || 0}
                </div>
              </TableCell>

              <TableCell>
                <div className="text-sm space-y-1">
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>
                      Drive:{" "}
                      {TripDataFormatter.formatHours(
                        trip.total_driving_hours || 0
                      )}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Total:{" "}
                    {TripDataFormatter.formatHours(
                      (trip.total_driving_hours || 0) + onDutyHours
                    )}
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <Chip
                  color={getStatusColor(trip.is_completed)}
                  variant="flat"
                  size="sm"
                >
                  {trip.is_completed ? "Completed" : "Active"}
                </Chip>
              </TableCell>

              <TableCell>
                <Button
                  as={Link}
                  href={`/trips/${trip.id}`}
                  size="sm"
                  variant="light"
                  color="primary"
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
