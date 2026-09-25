import { IPost } from "@/lib/types/post";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
interface IPostCardProps {
  post: IPost;
}
export default function PostCard({ post }: IPostCardProps) {
  return (
    <Card
      component={Link}
      href={`/posts/${post.id}`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        textDecoration: "none",
        color: "text.primary",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
      }}
    >
      {" "}
      <CardContent
        sx={{ p: 3, display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        {" "}
        <Stack
          direction='row'
          sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
        >
          {" "}
          <Chip label={post.status} size='small' variant='outlined' />{" "}
          <Typography variant='caption' color='text.secondary'>
            {" "}
            #{post.id}{" "}
          </Typography>{" "}
        </Stack>{" "}
        <Typography
          variant='h5'
          component='h2'
          sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1.5 }}
        >
          {" "}
          {post.title}{" "}
        </Typography>{" "}
        <Typography
          variant='body1'
          color='text.secondary'
          sx={{
            lineHeight: 1.7,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {" "}
          {post.content}{" "}
        </Typography>{" "}
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{ mt: "auto", pt: 3 }}
        >
          {" "}
          Read more →{" "}
        </Typography>{" "}
      </CardContent>{" "}
    </Card>
  );
}
