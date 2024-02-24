import { differenceInHours, differenceInMinutes } from "date-fns";
import { colors } from "../constants/colors";

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export function calculateAppointmentHeight(start: Date, end: Date) {
  const hourHeight = 100;

  const height = differenceInHours(end, start);
  const minutes = (differenceInMinutes(end, start) / 60) * hourHeight;

  return height + minutes;
}
