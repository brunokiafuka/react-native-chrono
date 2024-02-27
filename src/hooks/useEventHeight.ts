import { differenceInHours, differenceInMinutes } from "date-fns";
import { useRecoilValue } from "recoil";
import { configAtom } from "../store/config";
import type { AgendaEvent } from "../types/event";

export function useEventHeight(event: AgendaEvent) {
  const { itemSize } = useRecoilValue(configAtom);

  const hourDiff = differenceInHours(event.endDate, event.startDate);
  const minutes =
    (differenceInMinutes(event.endDate, event.startDate) / 60) * itemSize;

  const height = hourDiff + minutes;

  const minHeight = 30;

  return height <= minHeight ? minHeight : height;
}
