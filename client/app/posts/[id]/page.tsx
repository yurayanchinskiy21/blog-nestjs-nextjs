import { apiFetch } from "@/api/client";
import { IApiResponse, IPost } from "@/lib/types/post";
import { Box, Container, Paper, Stack } from "@mui/material";
import PostComments from "./components/PostComments";
import PostContent from "./components/PostContent";
import PostFeaturedImage from "./components/PostFeaturedImage";
import PostHeader from "./components/PostHeader";
import PostReactions from "./components/PostReactions";

interface IPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PostPage({ params }: IPostPageProps) {
  const { id } = await params;

  const response = await apiFetch<IApiResponse<IPost>>(`/posts/${id}`);

  const post = response.data;

  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {post.featuredImageUrl?.trim() && (
          <PostFeaturedImage src={post.featuredImageUrl} alt={post.title} />
        )}

        <Box sx={{ p: { xs: 3, md: 5 } }}>
          <Stack spacing={3}>
            <PostHeader post={post} />

            <PostContent content={post.content} />

            <PostReactions />

            <PostComments postId={post.id} comments={post.comments} />
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
