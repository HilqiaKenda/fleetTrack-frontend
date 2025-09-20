"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
  Chip,
  Tabs,
  Tab,
} from "@nextui-org/react";
import { toast } from "sonner";
import { PlusIcon, TrashIcon, ClockIcon } from "lucide-react";
import { useDrivers } from "@/hooks/useDrivers";
import { useVehicles } from "@/hooks/useVehicles";
import { useActiveTrips, useCreateTrip } from "@/hooks/useTrips";
import { useLocations } from "@/hooks/useLocations";
import { SmartLocationInput } from "@/components/location/SmartLocationInput";
import { LocationForm } from "@/components/location/LocationForm";
import {
  EVENT_TYPE_OPTIONS,
  TripFormData,
  tripSchema,
} from "@/lib/validations/trip-schemas";
import { EventLogging } from "@/components/EvenetLogging";

export default function LogPage() {
  const [activeTab, setActiveTab] = useState<"trip" | "event">("trip");
  const [selectedTrip, setSelectedTrip] = useState<number | null>(null);
  const [showNewLocationForm, setShowNewLocationForm] = useState(false);

  const { data: drivers = [] } = useDrivers();
  const { data: vehicles = [] } = useVehicles();
  const { data: activeTrips = [] } = useActiveTrips();
  const { data: locations = [] } = useLocations();

  const createTripMutation = useCreateTrip();

  const tripForm = useForm<TripFormData>({
    // @ts-ignore
    resolver: zodResolver(tripSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      cycle_rule: "70hr/8day",
      initial_events: [
        {
          location_data: {
            address: "",
            city: "",
            state: "",
            latitude: 0,
            longitude: 0,
            country: "USA",
            postal_code: "",
          },
          event_type: "on_duty",
          timestamp: new Date().toISOString().slice(0, 16),
          duration: 0,
          miles_driven: 0,
          notes: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: tripForm.control,
    name: "initial_events",
  });

  useEffect(() => {
    if (activeTrips.length === 1 && !selectedTrip) {
      setSelectedTrip(activeTrips[0].id);
    }
  }, [activeTrips, selectedTrip]);

  const onTripSubmit = async (data: TripFormData) => {
    try {
      const newTrip = await createTripMutation.mutateAsync({
        driver: data.driver,
        co_driver: data.co_driver || undefined,
        vehicle: data.vehicle,
        date: data.date,
        cycle_rule: data.cycle_rule,
        shipper_and_commodity: data.shipper_and_commodity,
        remarks: data.remarks,
        origin_location: data.origin_location,
        destination_location: data.destination_location,
        initial_events: data.initial_events,
      });

      toast.success("Trip created successfully!");
      tripForm.reset({
        date: new Date().toISOString().split("T")[0],
        cycle_rule: "70hr/8day",
        initial_events: [
          {
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
            notes: "",
          },
        ],
      });

      setActiveTab("event");
      setSelectedTrip(newTrip.id);
    } catch (error) {
      toast.error("Failed to create trip");
      console.error("Trip creation error:", error);
    }
  };

  const formatDriverName = (driver: any) => {
    return `${driver.full_name} (${driver.driver_initial})`;
  };

  const formatVehicleName = (vehicle: any) => {
    return `${vehicle.truck_number}${vehicle.make ? ` - ${vehicle.make}` : ""}`;
  };

  const formatLocationName = (location: any) => {
    return `${location.address}${location.city ? `, ${location.city}` : ""}${location.state ? `, ${location.state}` : ""}`;
  };

  const addInitialEvent = () => {
    append({
      location_data: {
        address: "",
        city: "",
        state: "",
        latitude: 0,
        longitude: 0,
        country: "USA",
        postal_code: "",
      },
      event_type: "on_duty",
      timestamp: new Date().toISOString().slice(0, 16),
      duration: 0,
      miles_driven: 0,
      notes: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6 bg-background text-foreground min-h-screen">
      <div className="text-center space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex-1" />
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Trip & Event Logging
            </h1>
            <p className="text-default-600">
              Create new trips and log trip events efficiently
            </p>
          </div>
        </div>

        {activeTrips.length > 0 && (
          <Chip color="success" variant="flat">
            {activeTrips.length} Active Trip
            {activeTrips.length !== 1 ? "s" : ""}
          </Chip>
        )}
      </div>

      <Tabs
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as "trip" | "event")}
        className="w-full"
        classNames={{
          tabList: "bg-default-100 dark:bg-default-50",
          cursor: "bg-primary dark:bg-primary",
          tab: "text-default-600 data-[selected=true]:text-primary-foreground",
        }}
      >
        <Tab key="trip" title="Create Trip">
          <Card className="bg-content1 dark:bg-content1">
            <CardHeader className="bg-content2 dark:bg-content2">
              <h2 className="text-xl font-semibold text-foreground">
                New Trip
              </h2>
            </CardHeader>
            <CardBody>
              <form
                // @ts-ignore
                onSubmit={tripForm.handleSubmit(onTripSubmit)}
                className="space-y-8 p-6 bg-content1 dark:bg-content1 rounded-lg shadow-sm border border-default-200 dark:border-default-700"
              >
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground pb-2 border-b border-default-200 dark:border-default-700">
                    Basic Trip Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                      name="driver"
                      control={tripForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value.toString()] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(
                              selectedKey
                                ? parseInt(selectedKey, 10)
                                : undefined
                            );
                          }}
                          label="Driver *"
                          placeholder="Select a driver"
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
                          {drivers.map((driver) => (
                            <SelectItem
                              key={driver.id}
                              value={driver.id}
                              textValue={formatDriverName(driver)}
                              className="text-foreground"
                            >
                              {formatDriverName(driver)}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="co_driver"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value.toString()] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(
                              selectedKey ? parseInt(selectedKey, 10) : null
                            );
                          }}
                          label="Co-Driver"
                          placeholder="Select a co-driver (optional)"
                          variant="bordered"
                          classNames={{
                            trigger:
                              "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                            value: "text-foreground",
                            listboxWrapper: "bg-content1 dark:bg-content1",
                            popoverContent: "bg-content1 dark:bg-content1",
                          }}
                        >
                          {drivers.map((driver) => (
                            <SelectItem
                              key={driver.id}
                              value={driver.id}
                              textValue={formatDriverName(driver)}
                              className="text-foreground"
                            >
                              {formatDriverName(driver)}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="vehicle"
                      control={tripForm.control}
                      render={({ field, fieldState }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value.toString()] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(
                              selectedKey
                                ? parseInt(selectedKey, 10)
                                : undefined
                            );
                          }}
                          label="Vehicle *"
                          placeholder="Select a vehicle"
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
                          {vehicles.map((vehicle) => (
                            <SelectItem
                              key={vehicle.id}
                              value={vehicle.id}
                              textValue={formatVehicleName(vehicle)}
                              className="text-foreground"
                            >
                              {formatVehicleName(vehicle)}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="date"
                      control={tripForm.control}
                      render={({ field, fieldState }) => (
                        <Input
                          {...field}
                          type="date"
                          label="Trip Date *"
                          isInvalid={!!fieldState.error}
                          errorMessage={fieldState.error?.message}
                          variant="bordered"
                          classNames={{
                            input: "text-foreground",
                            inputWrapper:
                              "border-default-200 dark:border-default-700",
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="cycle_rule"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value] : ["70hr/8day"]
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(selectedKey);
                          }}
                          label="Cycle Rule"
                          variant="bordered"
                          classNames={{
                            trigger:
                              "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                            value: "text-foreground",
                            listboxWrapper: "bg-content1 dark:bg-content1",
                            popoverContent: "bg-content1 dark:bg-content1",
                          }}
                        >
                          <SelectItem
                            key="70hr/8day"
                            value="70hr/8day"
                            className="text-foreground"
                          >
                            70hr/8day
                          </SelectItem>
                          <SelectItem
                            key="60hr/7day"
                            value="60hr/7day"
                            className="text-foreground"
                          >
                            60hr/7day
                          </SelectItem>
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground pb-2 border-b border-default-200 dark:border-default-700 flex-1">
                      Initial Events
                    </h3>
                    <Button
                      type="button"
                      variant="flat"
                      size="sm"
                      onPress={addInitialEvent}
                      startContent={<PlusIcon className="w-4 h-4" />}
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      Add Event
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <Card
                      key={field.id}
                      className="p-4 bg-content2 dark:bg-content2 border border-default-200 dark:border-default-700"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium flex items-center gap-2 text-foreground">
                            <ClockIcon className="w-4 h-4" />
                            Event {index + 1}
                          </h4>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              color="danger"
                              variant="flat"
                              isIconOnly
                              onPress={() => remove(index)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Controller
                            name={`initial_events.${index}.event_type`}
                            control={tripForm.control}
                            render={({ field, fieldState }) => (
                              <Select
                                selectedKeys={field.value ? [field.value] : []}
                                onSelectionChange={(keys) => {
                                  const selectedKey = Array.from(
                                    keys
                                  )[0] as string;
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
                                  listboxWrapper:
                                    "bg-content1 dark:bg-content1",
                                  popoverContent:
                                    "bg-content1 dark:bg-content1",
                                }}
                              >
                                {EVENT_TYPE_OPTIONS.map((option) => (
                                  <SelectItem
                                    key={option.value}
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
                            name={`initial_events.${index}.timestamp`}
                            control={tripForm.control}
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
                                  inputWrapper:
                                    "border-default-200 dark:border-default-700",
                                }}
                              />
                            )}
                          />

                          <Controller
                            name={`initial_events.${index}.duration`}
                            control={tripForm.control}
                            render={({ field, fieldState }) => (
                              <Input
                                {...field}
                                type="number"
                                step="0.1"
                                min="0"
                                value={field.value?.toString()}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                label="Duration (hours) *"
                                isInvalid={!!fieldState.error}
                                errorMessage={fieldState.error?.message}
                                variant="bordered"
                                classNames={{
                                  input: "text-foreground",
                                  inputWrapper:
                                    "border-default-200 dark:border-default-700",
                                }}
                              />
                            )}
                          />

                          <Controller
                            name={`initial_events.${index}.miles_driven`}
                            control={tripForm.control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                min="0"
                                value={field.value?.toString()}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                                label="Miles Driven"
                                placeholder="0"
                                variant="bordered"
                                classNames={{
                                  input: "text-foreground",
                                  inputWrapper:
                                    "border-default-200 dark:border-default-700",
                                }}
                              />
                            )}
                          />
                        </div>

                        <Controller
                          name={`initial_events.${index}.location_data`}
                          control={tripForm.control}
                          render={({ field, fieldState }) => (
                            <SmartLocationInput
                              value={field.value}
                              onChange={field.onChange}
                              label={`Event ${index + 1} Location`}
                              isInvalid={!!fieldState.error}
                              errorMessage={fieldState.error?.message}
                            />
                          )}
                        />

                        <Controller
                          name={`initial_events.${index}.notes`}
                          control={tripForm.control}
                          render={({ field }) => (
                            <Textarea
                              {...field}
                              label="Notes"
                              placeholder="Enter any additional notes about this event"
                              rows={2}
                              variant="bordered"
                              classNames={{
                                input: "text-foreground",
                                inputWrapper:
                                  "border-default-200 dark:border-default-700",
                              }}
                            />
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground pb-2 border-b border-default-200 dark:border-default-700">
                    Route Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Controller
                      name="origin_location"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value.toString()] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(
                              selectedKey ? parseInt(selectedKey, 10) : null
                            );
                          }}
                          label="Origin Location"
                          placeholder="Select origin"
                          variant="bordered"
                          classNames={{
                            trigger:
                              "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                            value: "text-foreground",
                            listboxWrapper: "bg-content1 dark:bg-content1",
                            popoverContent: "bg-content1 dark:bg-content1",
                          }}
                        >
                          {locations.map((location) => (
                            <SelectItem
                              key={location.id}
                              value={location.id}
                              textValue={formatLocationName(location)}
                              className="text-foreground"
                            >
                              {formatLocationName(location)}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />

                    <Controller
                      name="destination_location"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Select
                          selectedKeys={
                            field.value ? [field.value.toString()] : []
                          }
                          onSelectionChange={(keys) => {
                            const selectedKey = Array.from(keys)[0] as string;
                            field.onChange(
                              selectedKey ? parseInt(selectedKey, 10) : null
                            );
                          }}
                          label="Destination Location"
                          placeholder="Select destination"
                          variant="bordered"
                          classNames={{
                            trigger:
                              "border-default-200 dark:border-default-700 bg-content1 dark:bg-content1",
                            value: "text-foreground",
                            listboxWrapper: "bg-content1 dark:bg-content1",
                            popoverContent: "bg-content1 dark:bg-content1",
                          }}
                        >
                          {locations.map((location) => (
                            <SelectItem
                              key={location.id}
                              value={location.id}
                              textValue={formatLocationName(location)}
                              className="text-foreground"
                            >
                              {formatLocationName(location)}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-foreground pb-2 border-b border-default-200 dark:border-default-700">
                    Additional Information
                  </h3>

                  <div className="space-y-4">
                    <Controller
                      name="shipper_and_commodity"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Shipper & Commodity"
                          placeholder="Enter shipper and commodity details"
                          variant="bordered"
                          classNames={{
                            input: "text-foreground",
                            inputWrapper:
                              "border-default-200 dark:border-default-700",
                          }}
                        />
                      )}
                    />

                    <Controller
                      name="remarks"
                      control={tripForm.control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          label="Remarks"
                          placeholder="Enter any additional notes"
                          rows={3}
                          variant="bordered"
                          classNames={{
                            input: "text-foreground",
                            inputWrapper:
                              "border-default-200 dark:border-default-700",
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={createTripMutation.isPending}
                    className="flex-1 font-medium py-3"
                  >
                    Create Trip with Events
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Tab>

        <Tab key="event" title="Log Event">
          <EventLogging
            selectedTrip={selectedTrip}
            onTripSelect={setSelectedTrip}
          />
        </Tab>
      </Tabs>

      {showNewLocationForm && (
        <LocationForm
          onSuccess={() => setShowNewLocationForm(false)}
          onCancel={() => setShowNewLocationForm(false)}
        />
      )}
    </div>
  );
}
