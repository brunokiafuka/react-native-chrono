import React from "react";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useDraggable } from "./hooks/useDraggable";

export const Draggable = ({ children }: { children: React.ReactNode }) => {
  const { dragGesture, animatedStyles } = useDraggable();

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={animatedStyles}>{children}</Animated.View>
    </GestureDetector>
  );
};
