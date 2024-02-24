import { appointments } from "../fixtures/appointments";

export const getAppointmentByHour = (hour: number) => {
  return appointments.filter((appointment) => {
    const startDate = new Date(appointment.startDate);
    return startDate.getHours() >= hour && startDate.getHours() < hour + 1;
  });
};
