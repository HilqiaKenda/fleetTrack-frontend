import { Trip, TripEvent, Driver, Vehicle, Location } from "@/interface";

export interface TripDisplayData {
  id: number;
  date: string;
  isCompleted: boolean;
  driverName: string;
  coDriverName?: string;
  vehicle: number;
  vehicleInfo: string;
  cycleRule: string;
  shipperAndCommodity?: string;
  originLocation?: Location;
  destinationLocation?: Location;
  remarks?: string;
  events: TripEvent[];
  totalMilesDriving: number;
  totalDrivingHours: number;
  totalOnDutyHours: number;
}
