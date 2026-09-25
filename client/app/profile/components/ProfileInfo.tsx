"use client";

import { api } from "@/lib/api/axios";
import { IUser } from "@/lib/types/user";
import { Alert, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface IProfileInfoProps {
  user: IUser;
  onUpdate: (user: IUser) => void;
}

export default function ProfileInfo({ user, onUpdate }: IProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const handleEdit = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);

    setError(null);
    setSuccess(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);

    setError(null);
    setSuccess(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.patch("/users/me", {
        firstName,
        lastName,
        email,
      });

      onUpdate(response.data.data);
      setIsEditing(false);
      setSuccess(true);
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction='row'
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant='h6' sx={{ fontWeight: 700 }}>
          Personal information
        </Typography>

        {!isEditing && (
          <Button variant='outlined' onClick={handleEdit}>
            Edit
          </Button>
        )}
      </Stack>

      {success && (
        <Alert severity='success'>Profile updated successfully.</Alert>
      )}

      {error && <Alert severity='error'>{error}</Alert>}

      {isEditing ? (
        <Stack spacing={2}>
          <TextField
            label='First name'
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            fullWidth
            disabled={isSaving}
          />

          <TextField
            label='Last name'
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            fullWidth
            disabled={isSaving}
          />

          <TextField
            label='Email'
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
            disabled={isSaving}
          />

          <Stack direction='row' spacing={2}>
            <Button
              variant='contained'
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>

            <Button
              variant='outlined'
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography color='text.secondary'>First name</Typography>
            <Typography>{user.firstName}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography color='text.secondary'>Last name</Typography>
            <Typography>{user.lastName}</Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography color='text.secondary'>Email</Typography>
            <Typography>{user.email}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
