import { format } from "date-fns";

/**
 * This function generates weeks within a year
 * each week will contain an array with the respective days
 * E.g.: {2024: { 1: [ 'DD-MM-YYYY', ...] } }
 * */
export function generateDates(minYear: number, maxYear: number): TWeeksInYear {
  const result = {};

  for (let year = minYear; year <= maxYear; year++) {
    for (let i = 1; i <= 365; i++) {
      const currentDate = new Date(year, 0, i);

      const weekNumber = Math.floor((i - 1) / 7) + 1;
      // const dayOfMonth = currentDate.getDate();
      // const month = currentDate.getMonth() + 1;
      // const yearStr = currentDate.getFullYear();
      const formattedDate = currentDate;

      if (!result[year]) {
        result[year] = {};
      }

      if (!result[year][weekNumber]) {
        result[year][weekNumber] = [];
      }

      result[year][weekNumber].push(formattedDate);
    }
  }

  return result;
}

export function friendlyDateFormat(date: string): string {
  return new Date(date).getDate().toString().padStart(2, "0");
}
export function friendlyWeekDayFormat(date: string): string {
  return format(date, "EEEE").substring(0, 3);
}
