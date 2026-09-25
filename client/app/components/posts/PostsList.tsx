"use client";

import { Container, Grid, Stack, Typography } from "@mui/material";

import PostCard from "./PostCard";
import PostsFilters from "./PostsFilters";

import { IPost } from "@/lib/types/post";

interface IPostsListProps {
  posts: IPost[];
}

export default function PostsList({ posts }: IPostsListProps) {
  return (
    <Container maxWidth='lg' sx={{ py: 6 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant='h3' component='h1' sx={{ fontWeight: 800 }}>
          Latest posts
        </Typography>

        <Typography
          variant='body1'
          color='text.secondary'
          sx={{ maxWidth: 650 }}
        >
          Discover the latest stories, ideas, and updates from our blog.
        </Typography>
      </Stack>

      <Stack spacing={3}>
        <PostsFilters />

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
