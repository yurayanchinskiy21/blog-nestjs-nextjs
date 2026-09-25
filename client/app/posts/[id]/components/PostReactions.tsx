import { Chip, Stack, Divider } from "@mui/material";

export default function PostReactions() {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <Chip label='👍 Like' clickable />
        <Chip label='👎 Dislike' clickable />
      </Stack>

      <Divider />
    </>
  );
}
