/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { useAppContext } from "@/context/AppContext";
import type { Product, ProductFilters } from "@/lib/types/api";
import type { PaginatedApiResponse } from "@/lib/types/common";

// Get all products
export const useGetProducts = (filters?: ProductFilters) => {
  const { setProducts } = useAppContext();

  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters as any).toString();
      const endpoint = queryParams ? `/products?${queryParams}` : "/products";
      const response = await apiClient.get<PaginatedApiResponse<Product>>(
        endpoint
      );

      // Update global state
      if (response.data) {
        setProducts(response.data);
      }

      return response;
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

// Search products without updating global state
export const useSearchProducts = (filters?: ProductFilters) => {
  const query = useQuery({
    queryKey: ["search-products", filters],
    queryFn: async () => {
      const queryParams = new URLSearchParams(filters as any).toString();
      const endpoint = queryParams ? `/products?${queryParams}` : "/products";
      const response = await apiClient.get<PaginatedApiResponse<Product>>(
        endpoint
      );
      return response;
    },
    enabled: !!filters?.search, // Only run when there's a search query
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
    },
  ] as const;
};
