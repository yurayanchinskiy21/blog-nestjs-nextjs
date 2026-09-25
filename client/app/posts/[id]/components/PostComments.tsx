"use client";
import { api } from "@/lib/api/axios";
import { IApiResponse, IComment } from "@/lib/types/post";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
interface IPostCommentsProps {
  postId: number;
  comments: IComment[];
}
export default function PostComments({
  postId,
  comments: initialComments,
}: IPostCommentsProps) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setError("Comment cannot be empty");
      return;
    }
    if (trimmedContent.length > 1024) {
      setError("Comment must not exceed 1024 characters");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await api.post<IApiResponse<IComment>>(
        `/comments/posts/${postId}/comments`,
        { content: trimmedContent },
      );
      setComments((previous) => [response.data.data, ...previous]);
      setContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      setError("Failed to create comment");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Box>
      {" "}
      <Typography component='h5' variant='h5' sx={{ fontWeight: 700, mb: 3 }}>
        {" "}
        Comments ({comments.length}){" "}
      </Typography>{" "}
      <Stack spacing={2} sx={{ mb: 4 }}>
        {" "}
        <TextField
          multiline
          minRows={3}
          fullWidth
          label='Write a comment'
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          disabled={isLoading}
          slotProps={{ htmlInput: { maxLength: 1024 } }}
        />{" "}
        {error && <Alert severity='error'>{error}</Alert>}{" "}
        <Box>
          {" "}
          <Button
            variant='contained'
            onClick={handleSubmit}
            loading={isLoading}
            disabled={!content.trim()}
          >
            {" "}
            Add comment{" "}
          </Button>{" "}
        </Box>{" "}
      </Stack>{" "}
      {comments.length > 0 ? (
        <Stack spacing={2}>
          {" "}
          {comments.map((comment) => (
            <Paper
              key={comment.id}
              variant='outlined'
              sx={{ p: 2, borderRadius: 2 }}
            >
              {" "}
              <Stack direction='row' spacing={2}>
                {" "}
                <Avatar sx={{ width: 40, height: 40 }}>
                  {" "}
                  {comment.user?.firstName?.charAt(0)}{" "}
                  {comment.user?.lastName?.charAt(0)}{" "}
                </Avatar>{" "}
                <Box sx={{ flex: 1 }}>
                  {" "}
                  <Typography sx={{ fontWeight: 600 }}>
                    {" "}
                    {comment.user?.firstName} {comment.user?.lastName}{" "}
                  </Typography>{" "}
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ mb: 1 }}
                  >
                    {" "}
                    {new Date(comment.createdAt).toLocaleDateString()}{" "}
                  </Typography>{" "}
                  <Typography>{comment.content}</Typography>{" "}
                </Box>{" "}
              </Stack>{" "}
            </Paper>
          ))}{" "}
        </Stack>
      ) : (
        <Typography color='text.secondary'> No comments yet. </Typography>
      )}{" "}
    </Box>
  );
}
