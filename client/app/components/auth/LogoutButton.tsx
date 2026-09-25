"use client";

import { Button } from "@mui/material";

import { useAuth } from "@/context/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button variant='outlined' color='error' onClick={handleLogout}>
      Logout
    </Button>
  );
}
