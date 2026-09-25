"use client";

import { Stack, Typography } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

import { ICreatePostForm } from "@/lib/types/post";

interface IPostPublishSettingsProps {
  formData: ICreatePostForm;
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}

export default function PostPublishSettings({
  formData,
  onChange,
}: IPostPublishSettingsProps) {
  if (formData.status !== "scheduled") {
    return null;
  }

  return (
    <Stack spacing={2}>
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Publishing
      </Typography>

      <DateTimePicker
        label='Publish on'
        value={formData.publishOn ? dayjs(formData.publishOn) : null}
        onChange={(value) => {
          onChange("publishOn", value ? value.toISOString() : "");
        }}
        minDateTime={dayjs()}
      />
    </Stack>
  );
}
