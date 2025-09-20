"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

export const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="bg-content1">
        <CardBody className="flex items-center justify-center p-8">
          <Spinner size="lg" />
          <p className="mt-4 text-default-600">Loading trip details...</p>
        </CardBody>
      </Card>
    </div>
  );
};
