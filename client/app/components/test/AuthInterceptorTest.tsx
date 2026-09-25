"use client";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "@/lib/api/axios";
import { useAuthStore } from "@/lib/store/auth.store";
export default function AuthInterceptorTest() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const invalidateToken = () => {
    setAccessToken("invalid-token");
    console.log("Access token replaced with invalid token");
  };
  const testRequest = async () => {
    try {
      const response = await api.get("/users/1");
      console.log("Request successful:", response.data);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  return (
    <Stack spacing={2}>
      {" "}
      <Typography variant='h6'> Axios Interceptor Test </Typography>{" "}
      <Button variant='outlined' onClick={invalidateToken}>
        {" "}
        Invalidate Access Token{" "}
      </Button>{" "}
      <Button variant='contained' onClick={testRequest}>
        {" "}
        Test Protected Request{" "}
      </Button>{" "}
    </Stack>
  );
}
