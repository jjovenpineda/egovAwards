import { create } from "zustand";

export const useUserStore = create((set) => ({
  userInfo: null,
  setUserInfo: (data: any) => set({ userInfo: data }),
}));

export const useDraftStore = create((set) => ({
  draftInfo: null,
  setDraftInfo: (data: any) => set({ draftInfo: data }),
}));

export const useDraftIDStore = create((set) => ({
  draftID: null,
  setDraftID: (data: any) => set({ draftID: data }),
}));
