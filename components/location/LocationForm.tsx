"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { toast } from "sonner";
import { useCreateLocation } from "@/hooks/useLocations";
import {
  LocationFormData,
  locationSchema,
} from "@/lib/validations/trip-schemas";

interface LocationFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const LocationForm: React.FC<LocationFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const createLocationMutation = useCreateLocation();

  const locationForm = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      country: "USA",
    },
  });

  const onLocationSubmit = async (data: LocationFormData) => {
    try {
      await createLocationMutation.mutateAsync(data);
      toast.success("Location created successfully!");
      locationForm.reset({ country: "USA" });
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create location");
      console.error("Location creation error:", error);
    }
  };

  return (
    <Card className="bg-content1 dark:bg-content1 border border-default-200 dark:border-default-700">
      <CardHeader className="bg-content2 dark:bg-content2">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-lg font-semibold text-foreground">
            Add New Location
          </h3>
          {onCancel && (
            <Button size="sm" variant="flat" onPress={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={locationForm.handleSubmit(onLocationSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="md:col-span-2"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />

            <Controller
              name="city"
              control={locationForm.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="City"
                  placeholder="Enter city"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
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
                  placeholder="Enter state"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />

            <Controller
              name="postal_code"
              control={locationForm.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Postal Code"
                  placeholder="Enter postal code"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />

            <Controller
              name="country"
              control={locationForm.control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Country"
                  defaultValue="USA"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              color="primary"
              isLoading={createLocationMutation.isPending}
            >
              Create Location
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="flat"
                onPress={() => {
                  locationForm.reset({ country: "USA" });
                  onCancel();
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
