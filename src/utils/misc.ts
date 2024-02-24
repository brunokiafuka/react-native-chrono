import { differenceInHours } from "date-fns";
import { colors } from "../constants/colors";

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export function calculateInclusiveHours(start: Date, end: Date) {
  const hoursDifference = differenceInHours(end, start);
  return hoursDifference + 1;
}
