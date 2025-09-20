import { Driver, Trip, TripEvent, Vehicle } from ".";
import { TripDisplayData } from "./trip";

export class TripDataFormatter {
  static formatDriverName(driver: number | Driver): string {
    if (typeof driver === "object" && driver) {
      return `${driver.full_name}${driver.driver_initial ? ` (${driver.driver_initial})` : ""}`;
    }
    return `Driver ID: ${driver}`;
  }

  static formatVehicleInfo(vehicle: number | Vehicle): string {
    if (typeof vehicle === "object" && vehicle) {
      const make = vehicle.make ? ` ${vehicle.make}` : "";
      const model = vehicle.model ? ` ${vehicle.model}` : "";
      return `${vehicle.truck_number}${make}${model}`.trim();
    }
    return `Vehicle ID: ${vehicle}`;
  }

  static formatVehicleShort(vehicle: number | Vehicle): string {
    if (typeof vehicle === "object" && vehicle) {
      return vehicle.truck_number;
    }
    return `Vehicle ${vehicle}`;
  }

  static calculateOnDutyHours(events: TripEvent[]): number {
    if (!events || events.length === 0) return 0;

    return events
      .filter((event) => event.event_type === "on_duty")
      .reduce((total, event) => total + (event.duration || 0), 0);
  }

  static formatHours(hours: number): string {
    return `${hours.toFixed(1)}h`;
  }

  static getDriverDisplayName(driver: number | Driver): string {
    if (typeof driver === "object" && driver) {
      return driver.full_name || driver.driver_initial || "Unknown Driver";
    }
    return `Driver ${driver}`;
  }
}

export class TripFormatter {
  static formatDriverName(driver: number | Driver): string {
    if (typeof driver === "object" && driver.full_name) {
      return `${driver.full_name} (${driver.driver_initial})`;
    }
    return `Driver ID: ${driver}`;
  }

  static formatVehicleInfo(vehicle: number | Vehicle): string {
    if (typeof vehicle === "object") {
      const make = vehicle.make ? ` (${vehicle.make}` : "";
      const model = vehicle.model ? ` ${vehicle.model}` : "";
      const closing = make ? ")" : "";
      return `${vehicle.truck_number}${make}${model}${closing}`;
    }
    return `Vehicle ID: ${vehicle}`;
  }

  static formatTripForDisplay(trip: Trip): TripDisplayData {
    return {
      id: trip.id,
      date: trip.date,
      isCompleted: trip.is_completed,
      driverName: trip.driver_name,
      coDriverName: trip.co_driver_name,
      vehicle: trip.vehicle,
      vehicleInfo: trip.vehicle_info,
      cycleRule: trip.cycle_rule,
      shipperAndCommodity: trip.shipper_and_commodity,
      originLocation: trip.origin_location,
      destinationLocation: trip.destination_location,
      remarks: trip.remarks,
      events: trip.events || [],
      totalMilesDriving: trip.total_miles_driving,
      totalDrivingHours: trip.total_driving_hours,
      totalOnDutyHours: trip.total_on_duty_hours,
    };
  }
}
