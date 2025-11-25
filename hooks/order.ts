/* eslint-disable no-console */
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import type { Order, CreateOrderData, PaginatedResponse } from "@/lib/types/api";

// Get all orders
export const useGetOrders = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return apiClient.get<PaginatedResponse<Order>>("/orders");
    },
  });

  return [
    query.refetch,
    {
      isPending: query.isPending,
      error: query.error,
      data: query.data,
    },
  ] as const;
};

// Get order by ID
export const useGetOrderById = (id: string) => {
  const query = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      return apiClient.get<Order>(`/orders/${id}`);
    },
    enabled: !!id,
  });

  return [
    query.refetch,
    {
      isPending: query.isPending,
      error: query.error,
      data: query.data,
    },
  ] as const;
};

// Create order
export const useCreateOrder = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreateOrderData) => {
      return apiClient.post<Order>("/orders", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Order created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Failed to create order",
      });
    },
  });

  return [
    mutation.mutate,
    {
      isPending: mutation.isPending,
      error: mutation.error,
    },
  ] as const;
};
