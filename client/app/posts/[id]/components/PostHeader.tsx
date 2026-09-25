import { IPost } from "@/lib/types/post";
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";

interface IPostHeaderProps {
  post: IPost;
}

export default function PostHeader({ post }: IPostHeaderProps) {
  const firstName = post.author?.firstName || "Unknown";
  const lastName = post.author?.lastName || "";

  const authorName = `${firstName} ${lastName}`.trim();

  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  return (
    <>
      {post.tags?.length > 0 && (
        <Stack direction='row' spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {post.tags.map((tag) => (
            <Chip key={tag.id} label={tag.name} size='small' />
          ))}
        </Stack>
      )}

      <Typography
        component='h1'
        variant='h2'
        sx={{
          fontSize: { xs: "2rem", md: "3rem" },
          lineHeight: 1.15,
          fontWeight: 700,
        }}
      >
        {post.title || "Unknown title"}
      </Typography>

      <Stack direction='row' spacing={2} sx={{ alignItems: "center" }}>
        <Avatar>
          {firstInitial}
          {lastInitial}
        </Avatar>

        <Box>
          <Typography sx={{ fontWeight: 600 }}>{authorName}</Typography>

          <Typography variant='body2' color='text.secondary'>
            {post.publishOn
              ? `Published ${new Date(post.publishOn).toLocaleDateString()}`
              : "Publication date unknown"}
          </Typography>
        </Box>
      </Stack>

      <Divider />
    </>
  );
}
