import { Location } from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useLocations = () => {
  return useQuery({
    queryKey: ["locations"],
    queryFn: async (): Promise<Location[]> => {
      const response = await apiClient.get("/locations/");
      return response.data;
    },
  });
};

export const useLocation = (id: number) => {
  return useQuery({
    queryKey: ["locations", id],
    queryFn: async (): Promise<Location> => {
      const response = await apiClient.get(`/locations/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useLocationSearch = (query: string) => {
  return useQuery({
    queryKey: ["locations", "search", query],
    queryFn: async (): Promise<Location[]> => {
      const response = await apiClient.get(`/locations/search/`, {
        params: { q: query },
      });
      return response.data;
    },
    enabled: query.length > 0,
  });
};

export const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Location, "id">): Promise<Location> => {
      const response = await apiClient.post("/locations/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
};
