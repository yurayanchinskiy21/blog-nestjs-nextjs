"use client";

import { Alert, Button, Stack } from "@mui/material";

interface IPostCreateActionsProps {
  isLoading: boolean;
  error: string;
  onSubmit: () => void;
}

export default function PostCreateActions({
  isLoading,
  error,
  onSubmit,
}: IPostCreateActionsProps) {
  return (
    <Stack spacing={2}>
      {error && <Alert severity='error'>{error}</Alert>}

      <Button
        variant='contained'
        size='large'
        onClick={onSubmit}
        loading={isLoading}
      >
        Create Post
      </Button>
    </Stack>
  );
}
