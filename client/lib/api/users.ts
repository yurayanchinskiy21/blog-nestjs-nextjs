import { api } from "@/lib/api/axios";

export async function uploadAvatar(file: File) {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.post<{
    apiVersion: string;
    data: {
      userId: number;
      avatarUrl: string;
    };
  }>("/users/me/avatar", formData);

  return response.data.data;
}
