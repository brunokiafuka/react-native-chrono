import { create } from "zustand";

type ScaleStore = {
  scale: number;
  setScale: (scale: number) => void;
};

export const useScaleStore = create<ScaleStore>((set) => ({
  scale: 1,
  setScale: (scale: number) => set({ scale }),
}));
