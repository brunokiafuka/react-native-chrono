import { atom } from "recoil";
import type { AgendaEvent } from "../types/event";
import memoize from "lodash.memoize";

type EventItemStore = AgendaEvent & {
  position: { x: number; y: number };
};

export const eventAtom = memoize((event: AgendaEvent) =>
  atom<EventItemStore>({
    key: `event-${event.id}`,
    default: {
      ...event,
      position: { x: 0, y: 0 },
    },
  }),
);
