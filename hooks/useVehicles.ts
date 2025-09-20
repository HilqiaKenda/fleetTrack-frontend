import { Trip, Vehicle } from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useVehicles = () => {
  return useQuery({
    queryKey: ["vehicles"],
    queryFn: async (): Promise<Vehicle[]> => {
      const response = await apiClient.get("/vehicles/");
      return response.data;
    },
  });
};

export const useVehicle = (id: number | Vehicle) => {
  return useQuery({
    queryKey: ["vehicles", id],
    queryFn: async (): Promise<Vehicle> => {
      const response = await apiClient.get(`/vehicles/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useVehicleTrips = (vehicleId: number) => {
  return useQuery({
    queryKey: ["vehicles", vehicleId, "trips"],
    queryFn: async (): Promise<Trip[]> => {
      const response = await apiClient.get(`/vehicles/${vehicleId}/trips/`);
      return response.data;
    },
    enabled: !!vehicleId,
  });
};

export const useCreateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Vehicle, "id">): Promise<Vehicle> => {
      const response = await apiClient.post("/vehicles/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
};

export const useUpdateVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Vehicle>;
    }): Promise<Vehicle> => {
      const response = await apiClient.patch(`/vehicles/${id}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["vehicles", data.id] });
    },
  });
};
