import { api } from "./axios";
import type { IApiResponse, IAuthResponse } from "@/lib/types/auth";

export async function refreshAccessToken(): Promise<string> {
  const { data } = await api.post<IApiResponse<IAuthResponse>>(
    "/auth/refresh-tokens",
  );

  return data.data.accessToken;
}
