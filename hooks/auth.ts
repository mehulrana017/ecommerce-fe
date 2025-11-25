/* eslint-disable no-console */
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/lib/types/api";

// Login hook
export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return apiClient.post<AuthResponse>("/auth/login", credentials);
    },
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      toast({
        title: "Success",
        description: "Login successful",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Login failed",
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

// Register hook
export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      return apiClient.post<AuthResponse>("/auth/register", data);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast({
        title: "Success",
        description: "Registration successful",
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        description: error.message || "Registration failed",
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

// Logout hook
export const useLogout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    toast({
      description: "Logged out successfully",
    });
    // Optionally redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return [logout] as const;
};
