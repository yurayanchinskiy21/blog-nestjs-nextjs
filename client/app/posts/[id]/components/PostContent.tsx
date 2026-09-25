import { Divider, Typography } from "@mui/material";

interface IPostContentProps {
  content: string | null;
}

export default function PostContent({ content }: IPostContentProps) {
  return (
    <>
      <Typography
        component='div'
        variant='body1'
        sx={{
          fontSize: "1.1rem",
          lineHeight: 1.8,
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Typography>

      <Divider />
    </>
  );
}
