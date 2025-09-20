"use client";
import React from "react";
import { Chip } from "@nextui-org/react";

export const MapLegend: React.FC = () => {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <Chip size="sm" color="success" variant="flat">
        A = Origin
      </Chip>
      <Chip size="sm" color="danger" variant="flat">
        B = Destination
      </Chip>
      <Chip size="sm" color="primary" variant="flat">
        D = Driving
      </Chip>
      <Chip size="sm" color="warning" variant="flat">
        O = On Duty
      </Chip>
      <Chip size="sm" color="success" variant="flat">
        R = Rest
      </Chip>
      <Chip size="sm" color="danger" variant="flat">
        F = Fuel
      </Chip>
      <Chip size="sm" color="success" variant="flat">
        M = Meal
      </Chip>
      <Chip size="sm" color="secondary" variant="flat">
        L/U = Load/Unload
      </Chip>
      <Chip size="sm" color="primary" variant="flat">
        — = Driving Route
      </Chip>
      <Chip size="sm" color="default" variant="flat">
        - - = Other Events
      </Chip>
    </div>
  );
};
