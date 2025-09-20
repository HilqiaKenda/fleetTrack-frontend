"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <Card className="bg-content1 border-danger/20">
        <CardBody className="flex items-center justify-center p-8 text-center">
          <AlertCircleIcon className="w-12 h-12 text-danger mb-4" />
          <p className="text-danger font-medium">{message}</p>
        </CardBody>
      </Card>
    </div>
  );
};
