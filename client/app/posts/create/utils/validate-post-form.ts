import { ICreatePostForm } from "@/lib/types/post";

export function validatePostForm(formData: ICreatePostForm): string | null {
  if (formData.title.trim().length < 4) {
    return "Title must contain at least 4 characters";
  }

  if (formData.title.length > 512) {
    return "Title must not exceed 512 characters";
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formData.slug)) {
    return "Slug can contain only lowercase letters, numbers and hyphens";
  }

  if (formData.content && formData.content.trim().length < 15) {
    return "Content must contain at least 15 characters";
  }

  if (formData.schema) {
    try {
      JSON.parse(formData.schema);
    } catch {
      return "Schema must contain valid JSON";
    }
  }

  if (formData.featuredImageUrl) {
    try {
      new URL(formData.featuredImageUrl);
    } catch {
      return "Featured image URL is invalid";
    }
  }

  if (formData.status === "scheduled" && !formData.publishOn) {
    return "Publish date is required for scheduled posts";
  }

  if (
    formData.status === "scheduled" &&
    formData.publishOn &&
    new Date(formData.publishOn) <= new Date()
  ) {
    return "Publish date must be in the future";
  }

  return null;
}
