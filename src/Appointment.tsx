import { Text, StyleSheet, View } from "react-native";
import { format, getHours, getMinutes } from "date-fns";
import { calculateAppointmentHeight, randomColor } from "./utils/misc";

type Props = {
  type: string;
  startDate: string;
  endDate: string;
  id: string;
};

export const Appointment = ({ startDate, endDate }: Props) => {
  const height = calculateAppointmentHeight(
    new Date(startDate),
    new Date(endDate),
  );
  const backgroundColor = randomColor();

  const startHour = 8;
  const hourHeight = 100;
  const hours = getHours(new Date(startDate));
  const minutes = getMinutes(new Date(startDate));
  const top = hourHeight * (hours - startHour) + (minutes * hourHeight) / 60;

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  return (
    <View style={[styles.container, { backgroundColor, height, top: top }]}>
      <Text>Start Time: {startTime}</Text>
      <Text>End Time: {endTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    borderRadius: 5,
    padding: 3,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
});
