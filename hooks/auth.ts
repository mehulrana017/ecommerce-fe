/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api/client";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/context/AppContext";
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from "@/lib/types/api";

// Login hook
export const useLogin = () => {
  const { setToken, setCurrentUser } = useAppContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      return apiClient.post<AuthResponse>("/auth/login", credentials);
    },
    onSuccess: (data) => {
      setToken(data.token);
      setCurrentUser(data.user);

      toast({
        title: "Success",
        description: "Login successful",
      });

      setTimeout(() => {
        router.push("/");
      }, 100);
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
  const { setToken, setCurrentUser } = useAppContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      return apiClient.post<AuthResponse>("/auth/register", data);
    },
    onSuccess: (data) => {
      setToken(data.token);
      setCurrentUser(data.user);

      toast({
        title: "Success",
        description: "Registration successful",
      });

      setTimeout(() => {
        router.push("/");
      }, 100);
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
  const { dispatch } = useAppContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    toast({
      description: "Logged out successfully",
    });

    // Redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return [logout] as const;
};
