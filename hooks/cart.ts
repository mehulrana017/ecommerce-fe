/* eslint-disable no-console */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import type { Cart, AddToCartData, UpdateCartItemData } from "@/lib/types/api";

// Get cart
export const useGetCart = () => {
  const query = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      return apiClient.get<Cart>("/cart");
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

// Add to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: AddToCartData) => {
      return apiClient.post<Cart>("/cart/items", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        title: "Success",
        description: "Item added to cart",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Failed to add item to cart",
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

// Update cart item
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateCartItemData) => {
      return apiClient.put<Cart>(`/cart/items/${data.cartItemId}`, {
        quantity: data.quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        description: "Cart updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Failed to update cart",
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

// Remove from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (cartItemId: string) => {
      return apiClient.delete<Cart>(`/cart/items/${cartItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({
        description: "Item removed from cart",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Failed to remove item from cart",
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
