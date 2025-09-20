"use client";

import React, { useState, useMemo } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";

import {
  locationSchema,
  type LocationFormData,
} from "@/lib/validations/trip-schemas";
import {
  useCreateLocation,
  useLocations,
  useLocationSearch,
} from "@/hooks/useLocations";

interface LocationSearchInputProps {
  value?: number;
  onSelectionChange: (locationId: number | undefined) => void;
  label?: string;
  placeholder?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  isRequired?: boolean;
}

export const LocationSearchInput: React.FC<LocationSearchInputProps> = ({
  value,
  onSelectionChange,
  label = "Location",
  placeholder = "Search or select location",
  isInvalid,
  errorMessage,
  isRequired = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Data hooks
  const { data: locations = [] } = useLocations();
  const { data: searchResults = [] } = useLocationSearch(searchQuery);
  const createLocationMutation = useCreateLocation();

  // Form for new location
  const locationForm = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: "USA",
    },
  });

  // Combined location options
  const allLocations = useMemo(() => {
    const combined = [...locations];
    searchResults.forEach((result) => {
      if (!combined.find((loc) => loc.id === result.id)) {
        combined.push(result);
      }
    });
    return combined.sort((a, b) => a.address.localeCompare(b.address));
  }, [locations, searchResults]);

  // Format location display name
  const formatLocationName = (location: any) => {
    return `${location.address}${location.city ? `, ${location.city}` : ""}${location.state ? `, ${location.state}` : ""}`;
  };

  // Handle new location creation
  const handleCreateLocation = async (data: LocationFormData) => {
    try {
      const newLocation = await createLocationMutation.mutateAsync(data);
      toast.success("Location created successfully!");
      onSelectionChange(newLocation.id);
      locationForm.reset({ country: "USA" });
      onOpenChange();
    } catch (error) {
      toast.error("Failed to create location");
      console.error("Location creation error:", error);
    }
  };

  // Get selected location for display
  const selectedLocation = value
    ? allLocations.find((loc) => loc.id === value)
    : undefined;

  return (
    <>
      <div className="flex gap-2">
        <div className="flex-1">
          <Autocomplete
            label={isRequired ? `${label} *` : label}
            placeholder={placeholder}
            selectedKey={value?.toString()}
            onSelectionChange={(key) =>
              onSelectionChange(key ? Number(key) : undefined)
            }
            inputValue={searchQuery}
            onInputChange={setSearchQuery}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            startContent={<MapPinIcon className="w-4 h-4 text-gray-400" />}
          >
            {allLocations.map((location) => (
              <AutocompleteItem key={location.id} value={location.id}>
                {formatLocationName(location)}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
        <Button
          isIconOnly
          variant="flat"
          onPress={onOpen}
          className="mt-6"
          title="Add new location"
        >
          <PlusIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* New Location Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={locationForm.handleSubmit(handleCreateLocation)}>
              <ModalHeader className="flex flex-col gap-1">
                Add New Location
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Controller
                    name="address"
                    control={locationForm.control}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        label="Address *"
                        placeholder="Enter street address"
                        isInvalid={!!fieldState.error}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="city"
                      control={locationForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="City"
                          placeholder="Enter city"
                        />
                      )}
                    />

                    <Controller
                      name="state"
                      control={locationForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="State"
                          placeholder="Enter state/province"
                        />
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      name="postal_code"
                      control={locationForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Postal Code"
                          placeholder="Enter ZIP/postal code"
                        />
                      )}
                    />

                    <Controller
                      name="country"
                      control={locationForm.control}
                      render={({ field }) => (
                        <Input {...field} label="Country" defaultValue="USA" />
                      )}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={createLocationMutation.isPending}
                >
                  Create Location
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LocationSearchInput;
