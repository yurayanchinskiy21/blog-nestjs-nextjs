"use client";

import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api/axios";
import { IApiResponse, ICreatePostForm, IPost, ITag } from "@/lib/types/post";
import { validatePostForm } from "../utils/validate-post-form";
import PostAdvanced from "./PostAdvanced";
import PostBasicInfo from "./PostBasicInfo";
import PostContent from "./PostContent";
import PostCreateActions from "./PostCreateActions";
import PostMedia from "./PostMedia";
import PostPublishSettings from "./PostPublishSettings";
import PostTags from "./PostTags";
import axios from "axios";

export default function PostCreateForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<ICreatePostForm>({
    title: "",
    postType: "post",
    slug: "",
    status: "draft",
    content: "",
    schema: "",
    featuredImageUrl: "",
    publishOn: "",
    tags: [],
  });

  const [tags, setTags] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = <K extends keyof ICreatePostForm>(
    field: K,
    value: ICreatePostForm[K],
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api.get<IApiResponse<ITag[]>>("/tags");

        setTags(response.data.data);
      } catch (error) {
        console.error("Failed to load tags:", error);
      }
    };

    void getTags();
  }, []);

  const handleSubmit = async () => {
    const validationError = validatePostForm(formData);

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await api.post<IApiResponse<IPost>>("/posts", {
        title: formData.title,
        postType: formData.postType,
        slug: formData.slug,
        status: formData.status,
        content: formData.content || undefined,
        schema: formData.schema || undefined,
        featuredImageUrl: formData.featuredImageUrl || undefined,
        publishOn: formData.publishOn || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
      });

      router.push(`/posts/${response.data.data.id}`);
    } catch (error) {
      console.error("Post creation failed:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setError(message || "Failed to create post");
      } else {
        setError("Failed to create post");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={4}>
      <PostBasicInfo formData={formData} onChange={handleChange} />

      <PostContent formData={formData} onChange={handleChange} />

      <PostPublishSettings formData={formData} onChange={handleChange} />

      <PostMedia formData={formData} onChange={handleChange} />

      <PostTags formData={formData} tags={tags} onChange={handleChange} />

      <PostAdvanced formData={formData} onChange={handleChange} />

      <PostCreateActions
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
      />
    </Stack>
  );
}
