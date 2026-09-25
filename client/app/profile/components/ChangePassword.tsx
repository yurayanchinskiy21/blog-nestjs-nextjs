"use client";

import { api } from "@/lib/api/axios";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useState } from "react";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setIsSaving(true);

    try {
      await api.patch("/users/me/password", {
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess(true);
    } catch {
      setError(
        "Failed to change password. Please check your current password.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Change password
      </Typography>
      {success && (
        <Alert severity='success'>Password changed successfully.</Alert>
      )}
      {error && <Alert severity='error'>{error}</Alert>}
      <TextField
        label='Current password'
        type={showCurrentPassword ? "text" : "password"}
        value={currentPassword}
        onChange={(event) => setCurrentPassword(event.target.value)}
        fullWidth
        disabled={isSaving}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowCurrentPassword((previous) => !previous)}
                  edge='end'
                  disabled={isSaving}
                >
                  {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label='New password'
        type={showNewPassword ? "text" : "password"}
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        fullWidth
        disabled={isSaving}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowNewPassword((previous) => !previous)}
                  edge='end'
                  disabled={isSaving}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        label='Confirm new password'
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        fullWidth
        disabled={isSaving}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  edge='end'
                  disabled={isSaving}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant='contained'
        onClick={handleChangePassword}
        disabled={
          isSaving || !currentPassword || !newPassword || !confirmPassword
        }
        sx={{ alignSelf: "flex-start" }}
      >
        {isSaving ? "Changing..." : "Change password"}
      </Button>
    </Stack>
  );
}
