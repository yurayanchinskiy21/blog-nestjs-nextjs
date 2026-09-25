"use client";
import { MenuItem, Stack, TextField } from "@mui/material";
import { ICreatePostForm } from "@/lib/types/post";
interface IPostBasicInfoProps {
  formData: ICreatePostForm;
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}
export default function PostBasicInfo({
  formData,
  onChange,
}: IPostBasicInfoProps) {
  return (
    <Stack spacing={2}>
      {" "}
      <TextField
        label='Title'
        value={formData.title}
        onChange={(event) => onChange("title", event.target.value)}
        fullWidth
        required
      />{" "}
      <TextField
        label='Slug'
        value={formData.slug}
        onChange={(event) => onChange("slug", event.target.value)}
        fullWidth
        required
        helperText='Use lowercase letters, numbers and hyphens.'
      />{" "}
      <TextField
        select
        label='Post type'
        value={formData.postType}
        onChange={(event) => onChange("postType", event.target.value)}
        fullWidth
        required
      >
        {" "}
        <MenuItem value='post'>Post</MenuItem>{" "}
        <MenuItem value='page'>Page</MenuItem>{" "}
        <MenuItem value='story'>Story</MenuItem>{" "}
        <MenuItem value='series'>Series</MenuItem>{" "}
      </TextField>{" "}
      <TextField
        select
        label='Status'
        value={formData.status}
        onChange={(event) => onChange("status", event.target.value)}
        fullWidth
        required
      >
        {" "}
        <MenuItem value='draft'>Draft</MenuItem>{" "}
        <MenuItem value='scheduled'>Scheduled</MenuItem>{" "}
        <MenuItem value='review'>Review</MenuItem>{" "}
        <MenuItem value='published'>Published</MenuItem>{" "}
      </TextField>{" "}
    </Stack>
  );
}
