"use client";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { LatLngBounds } from "leaflet";

interface MapControlsProps {
  positions: [number, number][];
}

export const MapControls: React.FC<MapControlsProps> = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 0) {
      try {
        if (positions.length === 1) {
          map.setView(positions[0], 10);
        } else {
          const bounds = new LatLngBounds(positions);
          map.fitBounds(bounds, {
            padding: [30, 30],
            maxZoom: 12,
          });
        }
      } catch (error) {
        console.warn("Error fitting bounds:", error);
      }
    }
  }, [positions, map]);

  return null;
};
