"use client";
import React from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

interface TripsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export const TripsFilter: React.FC<TripsFilterProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) => {
  return (
    <Card>
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search trips by driver, vehicle, or commodity..."
            startContent={<SearchIcon className="w-4 h-4" />}
            value={searchTerm}
            onValueChange={onSearchChange}
            className="flex-1"
          />

          <Select
            placeholder="Filter by status"
            selectedKeys={[statusFilter]}
            onSelectionChange={(keys) =>
              onStatusChange(Array.from(keys)[0] as string)
            }
            className="w-full md:w-48"
            aria-label="Filter trips by status"
          >
            <SelectItem key="all">All Trips</SelectItem>
            <SelectItem key="active">Active</SelectItem>
            <SelectItem key="completed">Completed</SelectItem>
          </Select>

          <Button
            variant="bordered"
            startContent={<AdjustmentsHorizontalIcon className="w-4 h-4" />}
          >
            More Filters
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
