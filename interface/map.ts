export interface MapPosition {
  lat: number;
  lng: number;
  id: string;
  type: "origin" | "destination" | "event";
  data?: any;
}

export interface RouteSegment {
  start: [number, number];
  end: [number, number];
  eventType?: string;
  distance?: number;
}

export interface JourneyData {
  positions: MapPosition[];
  routeCoordinates: [number, number][];
  segments: RouteSegment[];
  statistics: {
    totalEvents: number;
    drivingEvents: number;
    restEvents: number;
    totalDistance: number;
  };
}
