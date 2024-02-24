import { Text, StyleSheet, View } from "react-native";
import { format } from "date-fns";
import { calculateAppointmentHeight, randomColor } from "./utils/misc";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

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
  const y = (hour - startHour) * 100;

  const position = useSharedValue({ x: 0, y: y });

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  const dragGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onStart((event) => {
      position.value = { x: 0, y: event.absoluteY };
    })
    .onUpdate((event) => {
      position.value = { x: event.x, y: event.absoluteY };
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: position.value.y }],
    };
  });

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View
        style={[styles.container, { backgroundColor, height }, animatedStyles]}
      >
        <Text>Start Time: {startTime}</Text>
        <Text>End Time: {endTime}</Text>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    position: "absolute",
    borderRadius: 5,
    padding: 10,
    alignSelf: "flex-end",
    marginTop: 10,
    right: 15,
  },
});
