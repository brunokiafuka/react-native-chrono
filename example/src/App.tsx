import React from "react";
import { StyleSheet } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Agenda } from "react-native-chrono";
import { EVENTS } from "./fixtures/events";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Agenda startHour={8} endHour={22} data={EVENTS} itemSize={100} />
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
