"use client";
import { ErrorState } from "@/components/ErrorState";
import { EventsTimeline } from "@/components/EventsTimeline";
import { LoadingState } from "@/components/location/LoadingState";
import { RouteInformation } from "@/components/trip/RouteInformation";
import { TripHeader } from "@/components/trip/TripHeader";
import { TripMapSection } from "@/components/trip/TripMapSection";
import { TripRemarks } from "@/components/trip/TripRemarks";
import { useTrip } from "@/hooks/useTrips";
import { TripFormatter } from "@/interface/tripFormatter";
import { useParams } from "next/navigation";
import React from "react";

export default function SingleTrip() {
  const params = useParams();
  const tripId = params?.id ? Number(params.id) : undefined;

  const { data: trip, isLoading, error } = useTrip(tripId as number);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message="Failed to load trip data" />;
  }

  if (!trip) {
    return <ErrorState message="Trip not found" />;
  }

  const formattedTrip = TripFormatter.formatTripForDisplay(trip);

  return (
    <div className="space-y-6 p-4 bg-background min-h-screen">
      <TripHeader trip={formattedTrip} />
      <RouteInformation trip={formattedTrip} />
      <TripMapSection trip={trip} events={formattedTrip.events} />
      <TripRemarks trip={formattedTrip} />
      <EventsTimeline events={formattedTrip.events} />
    </div>
  );
}
