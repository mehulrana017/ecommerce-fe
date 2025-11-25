/* eslint-disable no-console */
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import type { Product, ProductFilters, PaginatedResponse } from "@/lib/types/api";

// Get all products
export const useGetProducts = (filters?: ProductFilters) => {
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters as any).toString();
      const endpoint = queryParams ? `/products?${queryParams}` : "/products";
      return apiClient.get<PaginatedResponse<Product>>(endpoint);
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

// Get product by ID
export const useGetProductById = (id: string) => {
  const query = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      return apiClient.get<Product>(`/products/${id}`);
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
