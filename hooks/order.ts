/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import type { Order, CreateOrderData } from "@/lib/types/api";

// Get all orders
export const useGetOrders = () => {
  const query = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return apiClient.get<Order[]>("/orders");
    },
    enabled: false, // Don't auto-fetch, only fetch when refetch() is called
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
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateOrderData) => {
      return apiClient.post<Order>("/orders", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
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

// Cancel order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (orderId: string) => {
      return apiClient.post(`/orders/${orderId}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: error.message || "Failed to cancel order",
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
