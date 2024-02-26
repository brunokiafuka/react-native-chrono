import { create } from "zustand";

type GridColumnPosition = {
  positions: number[];
  setPosition: (position: number) => void;
};

export const useGridColumnPosition = create<GridColumnPosition>((set) => ({
  positions: [],
  setPosition(position) {
    set((state) => ({ positions: [...state.positions, position] }));
  },
}));
