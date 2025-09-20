import { TripEvent, TripEventCreateData } from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTripEvents = (tripId?: number) => {
  return useQuery({
    queryKey: ["trip-events", tripId],
    queryFn: async (): Promise<TripEvent[]> => {
      const params = tripId ? `?trip=${tripId}` : "";
      const response = await apiClient.get(`/trip-events/${params}`);
      return response.data;
    },
  });
};

export const useTripEvent = (id: number) => {
  return useQuery({
    queryKey: ["trip-events", id],
    queryFn: async (): Promise<TripEvent> => {
      const response = await apiClient.get(`/trip-events/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useRecentTripEvents = (hours: number = 24) => {
  return useQuery({
    queryKey: ["trip-events", "recent", hours],
    queryFn: async (): Promise<TripEvent[]> => {
      const response = await apiClient.get(
        `/trip-events/recent/?hours=${hours}`
      );
      return response.data;
    },
  });
};

export const useCreateTripEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TripEventCreateData): Promise<TripEvent> => {
      const response = await apiClient.post("/trip-events/", data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trip-events"] });
      queryClient.invalidateQueries({ queryKey: ["trips", data.trip] });
    },
  });
};

export const useUpdateTripEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<TripEventCreateData>;
    }): Promise<TripEvent> => {
      const response = await apiClient.patch(`/trip-events/${id}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["trip-events"] });
      queryClient.invalidateQueries({ queryKey: ["trip-events", data.id] });
      queryClient.invalidateQueries({ queryKey: ["trips", data.trip] });
    },
  });
};
