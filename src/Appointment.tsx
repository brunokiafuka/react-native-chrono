import { Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { calculateInclusiveHours, randomColor } from "./utils/misc";
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
  const height =
    calculateInclusiveHours(new Date(startDate), new Date(endDate)) * 50;
  const backgroundColor = randomColor();
  const position = useSharedValue({ x: 0, y: 0 });

  const startTime = format(new Date(startDate), "h:mm a");
  const endTime = format(new Date(endDate), "h:mm a");

  const dragGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onUpdate((event) => {
      console.log("event");
      position.value = { x: event.x, y: event.translationY };
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
    zIndex: 9000,
  },
});
