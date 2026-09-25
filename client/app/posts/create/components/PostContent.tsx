"use client";
import { Stack, TextField, Typography } from "@mui/material";
import { ICreatePostForm } from "@/lib/types/post";
interface IPostContentProps {
  formData: ICreatePostForm;
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}
export default function PostContent({ formData, onChange }: IPostContentProps) {
  return (
    <Stack spacing={2}>
      {" "}
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        {" "}
        Content{" "}
      </Typography>{" "}
      <TextField
        label='Post content'
        value={formData.content}
        onChange={(event) => onChange("content", event.target.value)}
        multiline
        minRows={10}
        fullWidth
        placeholder='Write your post content...'
      />{" "}
    </Stack>
  );
}
