import { View, Text, StyleSheet, Pressable } from "react-native";
import { differenceInHours, addHours, format } from "date-fns";
import { colors } from "./constants/colors";
import { calculateInclusiveHours, randomColor } from "./utils/misc";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  type: string;
  startDate: string;
  endDate: string;
};

export const Appointment = ({ startDate, endDate }: Props) => {
  const [hasLongPressed, setHasLongPressed] = useState(false);
  const height =
    calculateInclusiveHours(new Date(startDate), new Date(endDate)) * 50;
  const backgroundColor = randomColor();
  const position = useSharedValue({ x: 0, y: 0 });

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  const zIndex = 1000 - height;
  const opacity = height > 100 ? 1 : 0.7;

  const dragGesture = Gesture.Pan()
    .enabled(hasLongPressed)
    .onUpdate((event) => {
      position.value = { x: event.x, y: event.translationY };
    })
    .onEnd(() => {
      runOnJS(setHasLongPressed)(false);
    });

  const longPressGesture = Gesture.LongPress().onStart((event) => {
    runOnJS(setHasLongPressed)(true);
    position.value = { x: event.x, y: event.y };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value.y }],
    };
  });

  const gestures = Gesture.Simultaneous(longPressGesture, dragGesture);

  console.log("hasLongPressed", hasLongPressed);
  console.log("position", position.value);
  return (
    <GestureDetector gesture={gestures}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor, height, zIndex, opacity },
          animatedStyles,
        ]}
      >
        <Text>Start Time: {startTime}</Text>
        <Text>End Time: {endTime}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "100%",
    backgroundColor: "purple",
    position: "absolute",
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowColor: "#grey",
    shadowOffset: { height: 2, width: 2 },
    borderRadius: 5,
    padding: 10,
  },
});
