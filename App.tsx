import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Agenda } from "./src/Agenda";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { appointments } from "./src/fixtures/appointments";
import { Appointment } from "./src/Appointment";

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
        renderItem={({ item, index }) => (
          <Appointment
            key={index}
            type=""
            startDate={item.startDate}
            endDate={item.endDate}
            id={item.id}
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
