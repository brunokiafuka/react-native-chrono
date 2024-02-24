import { Text, StyleSheet, View } from "react-native";
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
    calculateInclusiveHours(new Date(startDate), new Date(endDate)) * 100;
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
      position.value = { x: 0, y: position.value.y };
    })
    .onUpdate((event) => {
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
    paddingLeft: 52,
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
