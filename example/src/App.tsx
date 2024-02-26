import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Agenda } from "react-native-chrono";
import { appointments } from "./fixtures/appointments";
import { Appointment } from "./Appointment";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Agenda
        startHour={8}
        endHour={22}
        data={appointments}
        itemSize={100}
        renderTimeSlot={({ item }) => {
          return (
            <View style={styles.timeSlot}>
              <Text>{item}</Text>
            </View>
          );
        }}
        renderEvent={({ event, index }) => (
          <Appointment
            key={index}
            type=""
            startDate={event.startDate}
            endDate={event.endDate}
            id={event.id}
          />
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    marginTop: 70,
    flexDirection: "row",
  },
  timeSlot: {
    flex: 1,
    alignItems: "center",
  },
});
