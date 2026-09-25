"use client";

import { useAuthStore } from "@/lib/store/auth.store";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { apiFetch } from "@/api/client";
import {
  IAuthContext,
  IAuthProviderProps,
  IRefreshResponse,
} from "@/lib/types/auth";
import { api } from "@/lib/api/axios";
import { IApiResponse } from "@/lib/types/post";

const AuthContext = createContext<IAuthContext | null>(null);

export function AuthProvider({ children }: IAuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken);

  const login = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
    }
  }, [clearAccessToken]);

  const refresh = useCallback(async () => {
    try {
      const response = await apiFetch<IApiResponse<IRefreshResponse>>(
        "/auth/refresh-tokens",
        {
          method: "POST",
        },
      );

      setAccessToken(response.data.accessToken);
    } catch {
      setAccessToken(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      await refresh();
      setIsLoading(false);
    };

    void initializeAuth();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: Boolean(accessToken),
        isLoading,
        login,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
