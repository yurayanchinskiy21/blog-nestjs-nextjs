"use client";

import { api } from "@/lib/api/axios";
import { IApiResponse } from "@/lib/types/post";
import { IUser } from "@/lib/types/user";
import { Container, Paper, Stack } from "@mui/material";
import { useEffect, useState } from "react";

import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import ChangePassword from "./ChangePassword";

export default function ProfileContent() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const getMe = async () => {
      const response = await api.get<IApiResponse<IUser>>("/users/me");

      setUser(response.data.data);
    };

    void getMe();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack spacing={5}>
          <ProfileHeader user={user} />
          <ProfileInfo user={user} onUpdate={setUser} />
          <ChangePassword />
          <ProfilePosts userId={user.id} />
        </Stack>
      </Paper>
    </Container>
  );
}
