import { addHours } from "date-fns";

const calculateHoursMoved = (positionY: number, hourHeight: number) => {
  return positionY / hourHeight;
};

const addHoursToDate = (date: Date | string, hours: number) => {
  return addHours(date, hours);
};

export const getUpdatedDate = (
  positionY: number,
  hourHeight: number,
  oldStartDate: Date | string,
  oldEndDate: Date | string,
) => {
  const hoursMoved = calculateHoursMoved(positionY, hourHeight);

  let newStartDate = addHoursToDate(new Date(oldStartDate), hoursMoved);
  let newEndDate = addHoursToDate(new Date(oldEndDate), hoursMoved);

  return { newStartDate, newEndDate };
};
