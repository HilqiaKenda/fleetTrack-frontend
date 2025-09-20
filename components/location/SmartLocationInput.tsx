"use client";
import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
} from "@nextui-org/react";
import { MapPinIcon, PlusIcon } from "lucide-react";
import { useLocations, useLocationSearch } from "@/hooks/useLocations";
import { LocationData } from "@/lib/validations/trip-schemas";

interface SmartLocationInputProps {
  value?: LocationData;
  onChange: (value: LocationData) => void;
  label?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  placeholder?: string;
}

export const SmartLocationInput: React.FC<SmartLocationInputProps> = ({
  value,
  onChange,
  label = "Location",
  isInvalid,
  errorMessage,
  placeholder = "Search location or enter address",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);

  const { data: locations = [] } = useLocations();
  const { data: searchResults = [] } = useLocationSearch(searchQuery);

  const allLocations = useMemo(() => {
    const combined = [...locations];
    searchResults.forEach((result) => {
      if (!combined.find((loc) => loc.id === result.id)) {
        combined.push(result);
      }
    });
    return combined;
  }, [locations, searchResults]);

  const formatLocationName = (location: any) => {
    return `${location.address}${location.city ? `, ${location.city}` : ""}${location.state ? `, ${location.state}` : ""}`;
  };

  if (isManualEntry) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {label} *
          </label>
          <Button
            size="sm"
            variant="flat"
            onPress={() => setIsManualEntry(false)}
            className="text-sm"
          >
            Use Existing Location
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Input
            value={value?.address || ""}
            onChange={(e) => onChange({ ...value, address: e.target.value })}
            label="Address"
            placeholder="Enter street address"
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            variant="bordered"
            classNames={{
              input: "text-foreground",
              inputWrapper: "border-default-200 dark:border-default-700",
            }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              value={value?.city || ""}
              onChange={(e) => onChange({ ...value, city: e.target.value })}
              label="City"
              placeholder="Enter city"
              variant="bordered"
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-default-200 dark:border-default-700",
              }}
            />
            <Input
              value={value?.state || ""}
              onChange={(e) => onChange({ ...value, state: e.target.value })}
              label="State"
              placeholder="Enter state"
              variant="bordered"
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-default-200 dark:border-default-700",
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input
              value={value?.postal_code || ""}
              onChange={(e) =>
                onChange({ ...value, postal_code: e.target.value })
              }
              label="Postal Code"
              placeholder="Enter postal code"
              variant="bordered"
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-default-200 dark:border-default-700",
              }}
            />
            <Input
              value={value?.country || "USA"}
              onChange={(e) => onChange({ ...value, country: e.target.value })}
              label="Country"
              variant="bordered"
              classNames={{
                input: "text-foreground",
                inputWrapper: "border-default-200 dark:border-default-700",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label} *</label>
        <Button
          size="sm"
          variant="flat"
          onPress={() => setIsManualEntry(true)}
          startContent={<PlusIcon className="w-3 h-3" />}
          className="text-sm"
        >
          New Location
        </Button>
      </div>

      <Autocomplete
        inputValue={searchQuery}
        onInputChange={setSearchQuery}
        onSelectionChange={(key) => {
          if (key) {
            const selectedLocation = allLocations.find(
              (loc) => loc.id === Number(key)
            );
            if (selectedLocation) {
              onChange({
                address: selectedLocation.address,
                city: selectedLocation.city || "",
                state: selectedLocation.state || "",
                country: selectedLocation.country || "USA",
                postal_code: selectedLocation.postal_code || "",
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              });
            }
          }
        }}
        placeholder={placeholder}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        variant="bordered"
        startContent={<MapPinIcon className="w-4 h-4 text-default-400" />}
        aria-label={label}
        classNames={{
          base: "w-full",
          listboxWrapper: "bg-content1 dark:bg-content1",
          popoverContent: "bg-content1 dark:bg-content1",
        }}
      >
        {allLocations.map((location) => (
          <AutocompleteItem
            key={location.id}
            value={location.id}
            className="text-foreground"
          >
            {formatLocationName(location)}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};
