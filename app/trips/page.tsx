"use client";

import { useTrips, useTripStatistics } from "@/hooks/useTrips";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { TripsFilter } from "@/components/trips/TripsFilter";
import { TripsTable } from "@/components/trips/TripsTable";
import { TripDataFormatter } from "@/interface/tripFormatter";
import { TripStatisticsCards } from "@/components/trips/TripStatisticsCards";

export default function TripsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<any>(null);

  const { data: trips, isLoading, error } = useTrips();
  const { data: statistics } = useTripStatistics(
    dateRange?.start ? format(dateRange.start, "yyyy-MM-dd") : undefined,
    dateRange?.end ? format(dateRange.end, "yyyy-MM-dd") : undefined
  );

  const rowsPerPage = 10;

  const filteredTrips = useMemo(() => {
    if (!trips) return [];

    return trips.filter((trip) => {
      const driverName = TripDataFormatter.getDriverDisplayName(
        trip.driver
      ).toLowerCase();
      const coDriverName = trip.co_driver
        ? TripDataFormatter.getDriverDisplayName(trip.co_driver).toLowerCase()
        : "";
      const vehicleInfo = TripDataFormatter.formatVehicleInfo(
        trip.vehicle
      ).toLowerCase();
      const shipperInfo = trip.shipper_and_commodity?.toLowerCase() || "";

      const searchLower = searchTerm.toLowerCase();

      const matchesSearch =
        driverName.includes(searchLower) ||
        coDriverName.includes(searchLower) ||
        vehicleInfo.includes(searchLower) ||
        shipperInfo.includes(searchLower);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && trip.is_completed) ||
        (statusFilter === "active" && !trip.is_completed);

      return matchesSearch && matchesStatus;
    });
  }, [trips, searchTerm, statusFilter]);

  const paginatedTrips = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredTrips.slice(start, start + rowsPerPage);
  }, [filteredTrips, page]);

  const totalPages = Math.ceil(filteredTrips.length / rowsPerPage);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="max-w-md">
          <CardBody className="text-center">
            <p className="text-danger">Error loading trips: {error.message}</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Trips Dashboard
          </h1>
          <p className="text-default-600">
            Manage and monitor all trips with detailed information
          </p>
        </div>
        <Button
          color="primary"
          startContent={<PlusIcon className="w-4 h-4" />}
          as={Link}
          href="/log"
          size="lg"
        >
          Create New Trip
        </Button>
      </div>

      {statistics && <TripStatisticsCards statistics={statistics} />}

      <TripsFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <Card>
        <CardHeader className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              All Trips ({filteredTrips.length})
            </h2>
            <p className="text-sm text-default-600">
              Showing {paginatedTrips.length} of {filteredTrips.length} trips
            </p>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <TripsTable trips={paginatedTrips} isLoading={isLoading} />

          {totalPages > 1 && (
            <div className="flex justify-center p-4">
              <Pagination
                total={totalPages}
                page={page}
                onChange={setPage}
                showControls
                className="gap-2"
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
