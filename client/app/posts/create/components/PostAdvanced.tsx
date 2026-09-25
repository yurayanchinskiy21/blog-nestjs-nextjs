"use client";

import { Stack, TextField, Typography } from "@mui/material";

import { ICreatePostForm } from "@/lib/types/post";

interface IPostAdvancedProps {
  formData: ICreatePostForm;
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}

export default function PostAdvanced({
  formData,
  onChange,
}: IPostAdvancedProps) {
  return (
    <Stack spacing={2}>
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Advanced
      </Typography>

      <TextField
        label='Schema'
        value={formData.schema}
        onChange={(event) => onChange("schema", event.target.value)}
        multiline
        minRows={6}
        fullWidth
        placeholder='{"@context":"https://schema.org","@type":"Article"}'
        helperText='Optional JSON-LD schema.'
      />
    </Stack>
  );
}
