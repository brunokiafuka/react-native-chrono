import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { randomColor } from "./utils/misc";

type Props = {
  type: string;
  startDate: string;
  endDate: string;
  id: string;
  height: number;
};

export const Appointment = ({ startDate, endDate, height }: Props) => {
  const backgroundColor = randomColor();

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  return (
    <View style={[styles.container, { backgroundColor, height }]}>
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
