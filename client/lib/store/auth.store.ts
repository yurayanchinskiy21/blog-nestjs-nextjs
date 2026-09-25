import { create } from "zustand";
import { IAuthStore } from "../types/store";

export const useAuthStore = create<IAuthStore>((set) => ({
  accessToken: null,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearAccessToken: () => {
    set({ accessToken: null });
  },
}));
