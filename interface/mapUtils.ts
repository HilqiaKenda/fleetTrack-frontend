"use client";
import { Trip, TripEvent } from "@/interface";
import { MapPosition, RouteSegment, JourneyData } from "./map";

export class JourneyCalculator {
  static getJourneyPositions(trip: Trip, events: TripEvent[]): MapPosition[] {
    const positions: MapPosition[] = [];

    if (trip.origin_location?.latitude && trip.origin_location?.longitude) {
      positions.push({
        lat: trip.origin_location.latitude,
        lng: trip.origin_location.longitude,
        id: "origin",
        type: "origin",
        data: trip.origin_location,
      });
    }

    const sortedEvents = [...events].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    sortedEvents.forEach((event, index) => {
      if (
        typeof event.location === "object" &&
        event.location.latitude &&
        event.location.longitude
      ) {
        positions.push({
          lat: event.location.latitude,
          lng: event.location.longitude,
          id: `event-${event.id}`,
          type: "event",
          data: { event, index: index + 1 },
        });
      }
    });

    if (
      trip.destination_location?.latitude &&
      trip.destination_location?.longitude
    ) {
      const lastPosition = positions[positions.length - 1];
      const destLat = trip.destination_location.latitude;
      const destLng = trip.destination_location.longitude;

      if (
        !lastPosition ||
        Math.abs(lastPosition.lat - destLat) > 0.001 ||
        Math.abs(lastPosition.lng - destLng) > 0.001
      ) {
        positions.push({
          lat: destLat,
          lng: destLng,
          id: "destination",
          type: "destination",
          data: trip.destination_location,
        });
      }
    }

    return positions;
  }

  static createRouteSegments(positions: MapPosition[]): RouteSegment[] {
    const segments: RouteSegment[] = [];

    for (let i = 0; i < positions.length - 1; i++) {
      const current = positions[i];
      const next = positions[i + 1];

      segments.push({
        start: [current.lat, current.lng],
        end: [next.lat, next.lng],
        eventType: next.data?.event?.event_type,
        distance: this.calculateDistance(
          current.lat,
          current.lng,
          next.lat,
          next.lng
        ),
      });
    }

    return segments;
  }

  static createSmoothRoute(positions: MapPosition[]): [number, number][] {
    if (positions.length < 2) return positions.map((p) => [p.lat, p.lng]);

    const smoothRoute: [number, number][] = [];

    for (let i = 0; i < positions.length; i++) {
      const current = positions[i];
      smoothRoute.push([current.lat, current.lng]);

      if (i < positions.length - 1) {
        const next = positions[i + 1];
        const distance = this.calculateDistance(
          current.lat,
          current.lng,
          next.lat,
          next.lng
        );

        const intermediateCount = Math.min(Math.floor(distance * 50), 6);

        for (let j = 1; j <= intermediateCount; j++) {
          const ratio = j / (intermediateCount + 1);
          const interpolatedLat =
            current.lat + (next.lat - current.lat) * ratio;
          const interpolatedLng =
            current.lng + (next.lng - current.lng) * ratio;
          smoothRoute.push([interpolatedLat, interpolatedLng]);
        }
      }
    }

    return smoothRoute;
  }

  static calculateDistance(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  static calculateStatistics(events: TripEvent[]): {
    totalEvents: number;
    drivingEvents: number;
    restEvents: number;
    totalDistance: number;
  } {
    return {
      totalEvents: events.length,
      drivingEvents: events.filter((e) => e.event_type === "driving").length,
      restEvents: events.filter((e) =>
        ["rest_break", "sleeper", "off_duty"].includes(e.event_type)
      ).length,
      totalDistance: events.reduce(
        (sum, event) => sum + (event.miles_driven || 0),
        0
      ),
    };
  }

  static processJourneyData(trip: Trip, events: TripEvent[]): JourneyData {
    const positions = this.getJourneyPositions(trip, events);
    const routeCoordinates = this.createSmoothRoute(positions);
    const segments = this.createRouteSegments(positions);
    const statistics = this.calculateStatistics(events);

    return {
      positions,
      routeCoordinates,
      segments,
      statistics,
    };
  }
}
