import { Carrier } from "@/interface";
import { apiClient } from "@/service/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCarriers = () => {
  return useQuery({
    queryKey: ["carriers"],
    queryFn: async (): Promise<Carrier[]> => {
      const response = await apiClient.get("/carriers/");
      return response.data;
    },
  });
};

export const useCarrier = (id: number) => {
  return useQuery({
    queryKey: ["carriers", id],
    queryFn: async (): Promise<Carrier> => {
      const response = await apiClient.get(`/carriers/${id}/`);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreateCarrier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Carrier, "id">): Promise<Carrier> => {
      const response = await apiClient.post("/carriers/", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carriers"] });
    },
  });
};

export const useUpdateCarrier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Carrier>;
    }): Promise<Carrier> => {
      const response = await apiClient.patch(`/carriers/${id}/`, data);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["carriers"] });
      queryClient.invalidateQueries({ queryKey: ["carriers", data.id] });
    },
  });
};
