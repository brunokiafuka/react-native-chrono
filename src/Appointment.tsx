import { Text, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { calculateAppointmentHeight, randomColor } from "./utils/misc";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useState } from "react";

type Props = {
  type: string;
  startDate: string;
  endDate: string;
};

export const Appointment = ({ startDate, endDate }: Props) => {
  const height = calculateAppointmentHeight(
    new Date(startDate),
    new Date(endDate),
  );
  const backgroundColor = randomColor();

  const hour = new Date(startDate).getHours();

  const startHour = 8;
  const top = (hour - startHour) * 100;

  const position = useSharedValue({ x: 0, y: 0 });

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  const [isDragging, setIsDragging] = useState(false);

  const dragGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onUpdate((event) => {
      position.value = { x: event.x, y: event.translationY };
      runOnJS(setIsDragging)(true);
    })
    .onEnd(() => {
      runOnJS(setIsDragging)(false);
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value.y }],
      zIndex: isDragging ? 100 : 0,
    };
  });

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor, height, top },
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
    width: "100%",
    position: "absolute",
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-end",
  },
});
