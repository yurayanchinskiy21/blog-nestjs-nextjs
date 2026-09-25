"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

interface IThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: IThemeRegistryProps) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}
