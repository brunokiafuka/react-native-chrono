import { atom, selector } from "recoil";
import type { AgendaEvent } from "../types/event";
import memoize from "lodash.memoize";
import { configAtom } from "./config";
import { differenceInHours, setHours } from "date-fns";

type EventItemStore = AgendaEvent & {
  // position: { x: number; y: number };
};

export const eventAtom = memoize((event: AgendaEvent) =>
  atom<EventItemStore>({
    key: `event-${event.id}`,
    default: {
      ...event,
    },
  }),
);

export const eventPositionAtom = memoize((event: AgendaEvent) =>
  selector({
    key: `event-position-${event.id}${event.startDate}${event.endDate}`,
    get: ({ get }) => {
      const { itemSize, startHour } = get(configAtom);
      const { startDate } = get(eventAtom(event));

      const timelineStartDate = setHours(startDate, startHour);
      const hoursDifference = differenceInHours(startDate, timelineStartDate);
      const y = hoursDifference * itemSize;

      return { y, x: 0 };
    },
  }),
);
