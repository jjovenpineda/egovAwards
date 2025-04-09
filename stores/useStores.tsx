// stores/useUserStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: null,
  setUserInfo: (data: any) => set({ userInfo: data }),
}));
