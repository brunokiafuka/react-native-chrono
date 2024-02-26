import { Gesture } from "react-native-gesture-handler";
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { useState } from "react";

export const useDraggable = () => {
  const position = useSharedValue({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const dragGesture = Gesture.Pan()
    .activateAfterLongPress(500)
    .onUpdate((event) => {
      position.value = { x: event.translationX, y: event.translationY };
      runOnJS(setIsDragging)(true);
    })
    .onEnd(() => {
      position.value = { x: 0, y: position.value.y };
      runOnJS(setIsDragging)(false);
    });

  // @ts-ignore: ignore type check
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: position.value.y },
        { translateX: position.value.x },
      ],
      zIndex: isDragging ? 100 : 0,
      shadowOffset: {
        shadowColor: isDragging ? "#000" : "transparent",
        width: 0,
        height: isDragging ? 2 : 0,
      },
      shadowOpacity: isDragging ? 0.25 : 0,
      shadowRadius: isDragging ? 3.84 : 0,
      elevation: isDragging ? 5 : 0,
    };
  });

  return { dragGesture, animatedStyles };
};
