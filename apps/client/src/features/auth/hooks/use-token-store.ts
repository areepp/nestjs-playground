import { create } from "zustand";

type State = {
  accessToken: string | null;
};

type Action = {
  updateAccessToken: (token: string | null) => void;
};

export const useTokenStore = create<State & Action>((set) => ({
  accessToken: null,
  updateAccessToken: (token) => set(() => ({ accessToken: token })),
}));
