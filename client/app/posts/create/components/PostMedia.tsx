"use client";

import { Stack, TextField, Typography } from "@mui/material";

import { ICreatePostForm } from "@/lib/types/post";

interface IPostMediaProps {
  formData: ICreatePostForm;
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}

export default function PostMedia({ formData, onChange }: IPostMediaProps) {
  return (
    <Stack spacing={2}>
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Media
      </Typography>

      <TextField
        label='Featured image URL'
        value={formData.featuredImageUrl}
        onChange={(event) => onChange("featuredImageUrl", event.target.value)}
        fullWidth
        placeholder='https://example.com/image.jpg'
        helperText='Optional. Must be a valid image URL.'
      />
    </Stack>
  );
}
