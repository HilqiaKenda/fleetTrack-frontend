import {
  Trip,
  TripCreateData,
  TripEvent,
  TripEventCreateData,
  TripStatistics,
} from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTrips = () => {
  return useQuery({
    queryKey: ["trips"],
    queryFn: async (): Promise<Trip[]> => {
      const response = await apiClient.get("/trips/");
      return response.data;
    },
  });
};

export const useTrip = (id: number) => {
  return useQuery({
    queryKey: ["trips", id],
    queryFn: async (): Promise<Trip> => {
      const response = await apiClient.get(`/trips/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useActiveTrips = () => {
  return useQuery({
    queryKey: ["trips", "active"],
    queryFn: async (): Promise<Trip[]> => {
      const response = await apiClient.get("/trips/active/");
      return response.data;
    },
  });
};

export const useTripStatistics = (dateFrom?: string, dateTo?: string) => {
  return useQuery({
    queryKey: ["trips", "statistics", dateFrom, dateTo],
    queryFn: async (): Promise<TripStatistics> => {
      const params = new URLSearchParams();
      if (dateFrom) params.append("date_from", dateFrom);
      if (dateTo) params.append("date_to", dateTo);

      const response = await apiClient.get(
        `/trips/statistics/?${params.toString()}`
      );
      return response.data;
    },
  });
};

export const useCreateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TripCreateData): Promise<Trip> => {
      delete data.origin_location;
      delete data.destination_location;

      console.log(data);

      const response = await apiClient.post("/trips/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", "active"] });
    },
  });
};

export const useUpdateTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Trip>;
    }): Promise<Trip> => {
      const response = await apiClient.patch(`/trips/${id}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", data.id] });
      queryClient.invalidateQueries({ queryKey: ["trips", "active"] });
    },
  });
};

export const useAddTripEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      tripId,
      data,
    }: {
      tripId: number;
      data: TripEventCreateData;
    }): Promise<TripEvent> => {
      const response = await apiClient.post(
        `/trips/${tripId}/add_event/`,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["trips", variables.tripId] });
      queryClient.invalidateQueries({ queryKey: ["trip-events"] });
    },
  });
};

export const useCompleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tripId: number): Promise<{ status: string }> => {
      const response = await apiClient.post(`/trips/${tripId}/complete/`);
      return response.data;
    },
    onSuccess: (_, tripId) => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["trips", tripId] });
      queryClient.invalidateQueries({ queryKey: ["trips", "active"] });
    },
  });
};
