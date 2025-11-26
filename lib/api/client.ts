/* eslint-disable @typescript-eslint/no-explicit-any */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
    console.log("[API Client] Token found, adding Authorization header");
  } else {
    console.log("[API Client] No token found in localStorage");
  }

  return headers;
};

const handleApiError = (error: any): Error => {
  if (error.message) {
    return new Error(error.message);
  }
  return new Error("An unexpected error occurred");
};

const request = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw {
        message: errorData.message || `Error: ${response.status}`,
        status: response.status,
      };
    }

    return await response.json();
  } catch (err) {
    throw handleApiError(err);
  }
};

export const get = async <T>(endpoint: string): Promise<T> => {
  return request<T>(endpoint, {
    method: "GET",
  });
};

export const post = async <T>(endpoint: string, data?: any): Promise<T> => {
  return request<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const put = async <T>(endpoint: string, data?: any): Promise<T> => {
  return request<T>(endpoint, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const patch = async <T>(endpoint: string, data?: any): Promise<T> => {
  return request<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const del = async <T>(endpoint: string): Promise<T> => {
  return request<T>(endpoint, {
    method: "DELETE",
  });
};

// Export as default object for convenience
export const apiClient = {
  get,
  post,
  put,
  patch,
  delete: del,
};
