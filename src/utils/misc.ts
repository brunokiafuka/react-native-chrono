import { differenceInHours, differenceInMinutes } from "date-fns";
import { colors } from "../constants/colors";

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export function calculateAppointmentHeight(start: Date, end: Date) {
  const hourHeight = 100;

  const hourDiff = differenceInHours(end, start);
  const minutes = (differenceInMinutes(end, start) / 60) * hourHeight;

  const height = hourDiff + minutes;
  const minHeight = 70;

  return height <= minHeight ? minHeight : height;
}
