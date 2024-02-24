export const generateTimeSlots = (startHour: number, endHour: number) => {
  const timeSlots = [];
  for (let i = startHour; i <= endHour; i++) {
    timeSlots.push(`${i}:00`);
    // timeSlots.push(`${i}:30`);
  }
  return timeSlots;
};
