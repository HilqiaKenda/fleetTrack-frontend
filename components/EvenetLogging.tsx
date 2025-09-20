"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Input,
  Textarea,
  Button,
} from "@nextui-org/react";
import { toast } from "sonner";
import { useActiveTrips, useAddTripEvent } from "@/hooks/useTrips";
import { useCreateTripEvent } from "@/hooks/useTripEvents";
import { SmartLocationInput } from "./location/SmartLocationInput";
import {
  eventSchema,
  EventFormData,
  EVENT_TYPE_OPTIONS,
} from "@/lib/validations/trip-schemas";

interface EventLoggingProps {
  selectedTrip?: number | null;
  onTripSelect?: (tripId: number | null) => void;
}

export const EventLogging: React.FC<EventLoggingProps> = ({
  selectedTrip,
  onTripSelect,
}) => {
  const { data: activeTrips = [] } = useActiveTrips();
  const createEventMutation = useCreateTripEvent();
  const addTripEventMutation = useAddTripEvent();

  const eventForm = useForm<EventFormData>({
    // @ts-ignore
    resolver: zodResolver(eventSchema),
    defaultValues: {
      trip: selectedTrip || undefined,
      location_data: {
        address: "",
        city: "",
        latitude: 0,
        longitude: 0,
        state: "",
        country: "USA",
        postal_code: "",
      },
      event_type: "on_duty",
      timestamp: new Date().toISOString().slice(0, 16),
      duration: 0,
      miles_driven: 0,
    },
  });

  React.useEffect(() => {
    if (selectedTrip) {
      eventForm.setValue("trip", selectedTrip);
    }
  }, [selectedTrip, eventForm]);

  const onEventSubmit = async (data: EventFormData) => {
    try {
      if (activeTrips.some((trip) => trip.id === data.trip)) {
        await addTripEventMutation.mutateAsync({
          tripId: data.trip,
          data: {
            // @ts-ignore
            location_data: data.location_data,
            event_type: data.event_type,
            timestamp: data.timestamp,
            duration: data.duration,
            miles_driven: data.miles_driven,
            notes: data.notes,
          },
        });
      } else {
        // @ts-ignore
        await createEventMutation.mutateAsync(data);
      }

      toast.success("Event logged successfully!");
      eventForm.reset({
        trip: selectedTrip || undefined,
        location_data: {
          address: "",
          city: "",
          state: "",
          country: "USA",
          postal_code: "",
        },
        event_type: "on_duty",
        timestamp: new Date().toISOString().slice(0, 16),
        duration: 0,
        miles_driven: 0,
      });
    } catch (error) {
      toast.error("Failed to log event");
      console.error("Event creation error:", error);
    }
  };

  const formatTripName = (trip: any) => {
    const driverName =
      typeof trip.driver === "object"
        ? trip.driver.full_name
        : `Driver ${trip.driver}`;
    return `Trip #${trip.id} - ${driverName} (${trip.date})`;
  };

  return (
    <Card className="bg-content1 dark:bg-content1">
      <CardHeader className="bg-content2 dark:bg-content2">
        <h2 className="text-xl font-semibold text-foreground">
          Log Trip Event
        </h2>
      </CardHeader>
      <CardBody>
        <form
          // @ts-ignore
          onSubmit={eventForm.handleSubmit(onEventSubmit)}
          className="space-y-6 p-6 bg-content1 dark:bg-content1 rounded-lg shadow-sm border border-default-200 dark:border-default-700"
        >
          <Controller
            name="trip"
            control={eventForm.control}
            render={({ field, fieldState }) => (
              <Select
                selectedKeys={field.value ? [field.value.toString()] : []}
                onSelectionChange={(keys) => {
                  const selectedKey = Array.from(keys)[0] as string;
                  const tripId = selectedKey
                    ? parseInt(selectedKey, 10)
                    : undefined;
                  field.onChange(tripId);
                  onTripSelect?.(tripId || null);
                }}
                label="Trip *"
                placeholder="Select a trip"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
                variant="bordered"
                classNames={{
                  trigger:
                    "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                  value: "text-foreground",
                  listboxWrapper: "bg-content1 dark:bg-content1",
                  popoverContent: "bg-content1 dark:bg-content1",
                }}
              >
                {activeTrips.map((trip) => (
                  <SelectItem
                    key={trip.id}
                    value={trip.id}
                    textValue={formatTripName(trip)}
                    className="text-foreground"
                  >
                    {formatTripName(trip)}
                  </SelectItem>
                ))}
              </Select>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="event_type"
              control={eventForm.control}
              render={({ field, fieldState }) => (
                <Select
                  selectedKeys={field.value ? [field.value] : []}
                  onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    field.onChange(selectedKey);
                  }}
                  label="Event Type *"
                  placeholder="Select event type"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  variant="bordered"
                  classNames={{
                    trigger:
                      "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                    value: "text-foreground",
                    listboxWrapper: "bg-content1 dark:bg-content1",
                    popoverContent: "bg-content1 dark:bg-content1",
                  }}
                >
                  {EVENT_TYPE_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      textValue={option.label}
                      className="text-foreground"
                    >
                      <div className="flex items-center gap-2">
                        <span>{option.icon}</span>
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </Select>
              )}
            />

            <Controller
              name="timestamp"
              control={eventForm.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="datetime-local"
                  label="Event Time *"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />

            <Controller
              name="duration"
              control={eventForm.control}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="number"
                  step="0.1"
                  min="0"
                  value={field.value?.toString()}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  label="Duration (hours) *"
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />

            <Controller
              name="miles_driven"
              control={eventForm.control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min="0"
                  value={field.value?.toString()}
                  onChange={(e) =>
                    field.onChange(parseFloat(e.target.value) || 0)
                  }
                  label="Miles Driven"
                  placeholder="0"
                  variant="bordered"
                  classNames={{
                    input: "text-foreground",
                    inputWrapper: "border-default-200 dark:border-default-700",
                  }}
                />
              )}
            />
          </div>

          <Controller
            name="location_data"
            control={eventForm.control}
            render={({ field, fieldState }) => (
              <SmartLocationInput
                value={field.value}
                onChange={field.onChange}
                label="Event Location"
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="notes"
            control={eventForm.control}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Notes"
                placeholder="Enter any additional notes about this event"
                rows={3}
                variant="bordered"
                classNames={{
                  input: "text-foreground",
                  inputWrapper: "border-default-200 dark:border-default-700",
                }}
              />
            )}
          />

          <div className="flex gap-3">
            <Button
              type="submit"
              color="primary"
              isLoading={
                createEventMutation.isPending || addTripEventMutation.isPending
              }
              className="flex-1"
            >
              Log Event
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
