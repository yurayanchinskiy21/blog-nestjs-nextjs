"use client";

import PostCard from "@/app/components/posts/PostCard";
import { api } from "@/lib/api/axios";
import { IApiResponse, IPaginatedPosts } from "@/lib/types/post";
import { Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";


interface IProfilePostsProps {
  userId: number;
}

export default function ProfilePosts({ userId }: IProfilePostsProps) {
  const [posts, setPosts] = useState<IPaginatedPosts | null>(null);

  useEffect(() => {
    const getUserPosts = async () => {
      const response = await api.get<IApiResponse<IPaginatedPosts>>(
        `/posts/user/${userId}`,
      );

      setPosts(response.data.data);
    };

    void getUserPosts();
  }, [userId]);

  if (!posts) {
    return <Typography>Loading posts...</Typography>;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Posts ({posts.meta.totalItems})
      </Typography>

      {posts.data.length > 0 ? (
        <Grid container spacing={3}>
          {posts.data.map((post) => (
            <Grid key={post.id} size={{ xs: 12, sm: 6 }}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="text.secondary">
          This user has no posts yet.
        </Typography>
      )}
    </Stack>
  );
}
