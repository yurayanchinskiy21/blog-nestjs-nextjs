"use client";

import { Box } from "@mui/material";
import { useState } from "react";

interface IPostFeaturedImageProps {
  src: string;
  alt: string;
}

export default function PostFeaturedImage({
  src,
  alt,
}: IPostFeaturedImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  return (
    <Box
      component='img'
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      sx={{
        display: "block",
        width: "100%",
        height: { xs: 240, md: 400 },
        objectFit: "cover",
      }}
    />
  );
}
