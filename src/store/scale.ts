import { atom } from "recoil";

export const scaleAtom = atom<number>({
  key: "scale",
  default: 1,
});
