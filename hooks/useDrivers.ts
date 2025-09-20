import { Driver, HoursSummary, Trip } from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useDrivers = () => {
  return useQuery({
    queryKey: ["drivers"],
    queryFn: async (): Promise<Driver[]> => {
      const response = await apiClient.get("/drivers/");
      return response.data;
    },
  });
};

export const useDriver = (id: number) => {
  return useQuery({
    queryKey: ["drivers", id],
    queryFn: async (): Promise<Driver> => {
      const response = await apiClient.get(`/drivers/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useDriverTrips = (driverId: number) => {
  return useQuery({
    queryKey: ["drivers", driverId, "trips"],
    queryFn: async (): Promise<Trip[]> => {
      const response = await apiClient.get(`/drivers/${driverId}/trips/`);
      return response.data;
    },
    enabled: !!driverId,
  });
};

export const useDriverHoursSummary = (
  driverId: number,
  dateFrom?: string,
  dateTo?: string
) => {
  return useQuery({
    queryKey: ["drivers", driverId, "hours-summary", dateFrom, dateTo],
    queryFn: async (): Promise<HoursSummary> => {
      const params = new URLSearchParams();
      if (dateFrom) params.append("date_from", dateFrom);
      if (dateTo) params.append("date_to", dateTo);

      const response = await apiClient.get(
        `/drivers/${driverId}/hours_summary/?${params.toString()}`
      );
      return response.data;
    },
    enabled: !!driverId,
  });
};

export const useCreateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Driver, "id">): Promise<Driver> => {
      const response = await apiClient.post("/drivers/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
};

export const useUpdateDriver = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Driver>;
    }): Promise<Driver> => {
      const response = await apiClient.patch(`/drivers/${id}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      queryClient.invalidateQueries({ queryKey: ["drivers", data.id] });
    },
  });
};
