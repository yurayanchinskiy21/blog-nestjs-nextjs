"use client";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";

import { ICreatePostForm, ITag } from "@/lib/types/post";

interface IPostTagsProps {
  formData: ICreatePostForm;
  tags: ITag[];
  onChange: <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => void;
}

export default function PostTags({ formData, tags, onChange }: IPostTagsProps) {
  return (
    <Stack spacing={2}>
      <Typography variant='h6' sx={{ fontWeight: 700 }}>
        Tags
      </Typography>

      <FormControl fullWidth>
        <InputLabel id='post-tags-label'>Tags</InputLabel>

        <Select
          labelId='post-tags-label'
          multiple
          value={formData.tags}
          onChange={(event) => {
            const value = event.target.value;

            onChange(
              "tags",
              typeof value === "string"
                ? value.split(",").map(Number)
                : value.map(Number),
            );
          }}
          input={<OutlinedInput label='Tags' />}
          renderValue={(selected) =>
            tags
              .filter((tag) => selected.includes(tag.id))
              .map((tag) => tag.name)
              .join(", ")
          }
        >
          {tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Checkbox checked={formData.tags.includes(tag.id)} />
              <ListItemText primary={tag.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
