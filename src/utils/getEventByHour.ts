// export const getAppointmentByHour = <
//   T = { startDate: string; endDate: string },
// >(
//   appointments: T[],
//   hour: number,
// ) => {
//   return appointments.filter((appointment) => {
//     const startDate = new Date(appointment.startDate);
//     return startDate.getHours() >= hour && startDate.getHours() < hour + 1;
//   });
// };
