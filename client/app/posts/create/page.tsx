"use client";
import { Container, Paper, Stack, Typography } from "@mui/material";
import PostCreateForm from "./components/PostCreateForm";
import ProtectedRoute from "@/lib/components/ProtectedRoute";
export default function CreatePostPage() {
  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      {" "}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        {" "}
        <Stack spacing={4}>
          {" "}
          <Typography component='h1' variant='h4' sx={{ fontWeight: 700 }}>
            {" "}
            Create post{" "}
          </Typography>{" "}
          <ProtectedRoute>
            <PostCreateForm />{" "}
          </ProtectedRoute>
        </Stack>{" "}
      </Paper>{" "}
    </Container>
  );
}
