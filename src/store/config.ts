import { atom } from "recoil";

type Config = {
  startHour: number;
  endHour: number;
  itemSize: number;
};

export const configAtom = atom<Config>({
  key: "config",
  default: {
    startHour: 0,
    endHour: 24,
    itemSize: 100,
  },
});
