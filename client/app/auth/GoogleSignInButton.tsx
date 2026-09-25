"use client";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api/axios";
import { IApiResponse, IAuthResponse } from "@/lib/types/auth";
export default function GoogleSignInButton() {
  const { login } = useAuth();
  const handleError = () => {
    console.log("Login Failed");
  };
  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.log("Google credential is missing");
      return;
    }
    try {
      const { data } = await api.post<IApiResponse<IAuthResponse>>(
        "/auth/google-authentication",
        { token: response.credential },
      );
      login(data.data.accessToken);
    } catch (error) {
      console.error("Google authentication failed:", error);
    }
  };
  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
