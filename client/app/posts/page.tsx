import { apiFetch } from "@/api/client";
import PostsList from "@/app/components/posts/PostsList";
import { IApiResponse, IPaginatedPosts } from "@/lib/types/post";

interface IPostsPageProps {
  searchParams: Promise<{
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}

export default async function PostsPage({ searchParams }: IPostsPageProps) {
  const params = await searchParams;

  const query = new URLSearchParams();

  if (params.search) {
    query.set("search", params.search);
  }

  if (params.sortBy) {
    query.set("sortBy", params.sortBy);
  }

  if (params.sortOrder) {
    query.set("sortOrder", params.sortOrder);
  }

  const response = await apiFetch<IApiResponse<IPaginatedPosts>>(
    `/posts?${query.toString()}`,
  );

  return <PostsList posts={response.data.data} />;
}
