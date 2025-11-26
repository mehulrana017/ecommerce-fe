import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";

interface CreateCheckoutSessionResponse {
  sessionId: string;
  url: string;
}

// Create checkout session and redirect to Stripe
export const useCreateCheckoutSession = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      return apiClient.post<CreateCheckoutSessionResponse>(
        "/checkout/create-session"
      );
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout URL
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Checkout Error",
        description: error.message || "Failed to start checkout process",
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
