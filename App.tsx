import React from "react";
import { View, StyleSheet } from "react-native";
import { Agenda } from "./src/Agenda";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const onDrag = useSharedValue(true);
  const position = useSharedValue(0);

  /* 
  Todo: define a strategy to handle multiple time blocks. 
  -> Each time block should have its own position property which should be used to define it's initial position.
  -> PanGesture animation should be activated after long press
  -> time-blocks should be 
  */

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > -1) {
        position.value = e.translationY;
      }

      // if (onDrag.value) {
      //   position.value = e.translationY;
      // } else {
      //   position.value = END_POSITION + e.translationY;
      // }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onDrag.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onDrag.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

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
