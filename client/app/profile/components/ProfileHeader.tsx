"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";

import { IUser } from "@/lib/types/user";
import { uploadAvatar } from "@/lib/api/users";

interface IProfileHeaderProps {
  user: IUser;
}

export default function ProfileHeader({ user }: IProfileHeaderProps) {
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const result = await uploadAvatar(file);

    setAvatarUrl(result.avatarUrl);
  };

  return (
    <Stack spacing={2} sx={{ alignItems: "center" }}>
      <Avatar
        src={avatarUrl ?? undefined}
        alt={`${user.firstName} ${user.lastName}`}
        sx={{
          width: 96,
          height: 96,
          fontSize: "2rem",
          cursor: "pointer",
        }}
        onClick={handleAvatarClick}
      >
        {initials}
      </Avatar>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        hidden
        onChange={handleAvatarChange}
      />

      <Button variant='outlined' onClick={handleAvatarClick}>
        Change avatar
      </Button>

      <Typography component='h1' variant='h4' sx={{ fontWeight: 700 }}>
        {user.firstName} {user.lastName}
      </Typography>

      <Typography color='text.secondary'>{user.email}</Typography>
    </Stack>
  );
}
