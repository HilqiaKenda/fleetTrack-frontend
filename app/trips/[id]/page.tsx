"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useTrip } from "@/hooks/useTrips";
import { LoadingState } from "@/components/location/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { TripFormatter } from "@/interface/tripFormatter";
import { EventsTimeline } from "@/components/EventsTimeline";
import { TripRemarks } from "@/components/trip/TripRemarks";
import { TripMapSection } from "@/components/trip/TripMapSection";
import { RouteInformation } from "@/components/trip/RouteInformation";
import { TripHeader } from "@/components/trip/TripHeader";

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
