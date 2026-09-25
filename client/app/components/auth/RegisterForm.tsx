"use client";

import { useState } from "react";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

import { api } from "@/lib/api/axios";
import { ICreateUserRequest } from "@/lib/types/auth";

export default function RegisterForm() {
  const [formData, setFormData] = useState<ICreateUserRequest>({
    firstName: "",
    lastName: "",
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
      const response = await api.post("/users", formData);

      console.log("User created:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
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
        <Typography variant='h5' sx={{ textAlign: "center" }}>
          Create account
        </Typography>

        <TextField
          name='firstName'
          label='First name'
          value={formData.firstName}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          name='lastName'
          label='Last name'
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
        />

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

        <Button type='submit' variant='contained' size='large'>
          Register
        </Button>
      </Stack>
    </Paper>
  );
}
