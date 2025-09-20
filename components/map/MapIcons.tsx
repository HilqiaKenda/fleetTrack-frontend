"use client";
import { Icon } from "leaflet";

export const createCustomIcon = (
  color: string,
  symbol: string,
  textColor: string = "white"
) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
        <path fill="${color}" stroke="#ffffff" stroke-width="2" d="M16 0C7.163 0 0 7.163 0 16c0 16 16 32 16 32s16-16 16-32C32 7.163 24.837 0 16 0z"/>
        <circle cx="16" cy="16" r="13" fill="${color}" stroke="#ffffff" stroke-width="1"/>
        <text x="16" y="21" font-family="Arial, sans-serif" font-size="11" font-weight="bold" text-anchor="middle" fill="${textColor}">${symbol}</text>
      </svg>
    `)}`,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -48],
  });
};

export const eventIcons = {
  driving: createCustomIcon("#2563eb", "D"),
  on_duty: createCustomIcon("#f59e0b", "O"),
  off_duty: createCustomIcon("#6b7280", "X"),
  sleeper: createCustomIcon("#7c3aed", "S"),
  rest_break: createCustomIcon("#059669", "R"),
  fuel_stop: createCustomIcon("#dc2626", "F"),
  meal_break: createCustomIcon("#65a30d", "M"),
  inspection: createCustomIcon("#ea580c", "I"),
  loading: createCustomIcon("#0891b2", "L"),
  unloading: createCustomIcon("#9333ea", "U"),
  other: createCustomIcon("#374151", "?"),
};

export const originIcon = createCustomIcon("#16a34a", "START", "white");
export const destinationIcon = createCustomIcon("#dc2626", "END", "white");
