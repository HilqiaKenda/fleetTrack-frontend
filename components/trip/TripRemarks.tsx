"use client";
import React from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { MessageSquareIcon } from "lucide-react";
import { TripDisplayData } from "@/interface/trip";

interface TripRemarksProps {
  trip: TripDisplayData;
}

export const TripRemarks: React.FC<TripRemarksProps> = ({ trip }) => {
  if (!trip.remarks) {
    return null;
  }

  return (
    <Card className="bg-content1 border-default-200">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <MessageSquareIcon className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Remarks</h2>
        </div>
      </CardHeader>
      <CardBody>
        <p className="whitespace-pre-wrap text-foreground">{trip.remarks}</p>
      </CardBody>
    </Card>
  );
};
