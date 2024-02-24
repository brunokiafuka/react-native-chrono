import React from "react";
import { View, StyleSheet } from "react-native";
import { Agenda } from "./src/Agenda";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Agenda startHour={8} endHour={18} />
      </View>
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
});
