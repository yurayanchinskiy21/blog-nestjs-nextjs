"use client";

import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import { api } from "@/lib/api/axios";
import { useAuth } from "@/context/AuthContext";
import { IApiResponse, IAuthResponse, ISignInRequest } from "@/lib/types/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignInButton from "@/app/auth/GoogleSignInButton";

export default function LoginForm() {
  const { login } = useAuth();

  const [formData, setFormData] = useState<ISignInRequest>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await api.post<IApiResponse<IAuthResponse>>(
        "/auth/sign-in",
        formData,
      );

      login(data.data.accessToken);

      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 420,
        padding: 4,
      }}
    >
      <Stack component='form' spacing={2} onSubmit={handleSubmit}>
        <Typography variant='h5' align='center'>
          Login
        </Typography>

        <TextField
          name='email'
          label='Email'
          type='email'
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name='password'
          label='Password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          required
          fullWidth
        />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <GoogleSignInButton />
        </GoogleOAuthProvider>
        <Button type='submit' variant='contained' size='large'>
          Login
        </Button>
      </Stack>
    </Paper>
  );
}
