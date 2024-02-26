import { memo } from "react";
import { useRecoilState } from "recoil";
import { eventAtom } from "../store/event";
import type { AgendaEvent } from "../types/event";
import React from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useDraggable } from "../hooks/useDraggable";

type EventRendererProps = {
  event: AgendaEvent;
  index: number;
  renderEvent: ({
    event,
    index,
  }: {
    event: AgendaEvent;
    index: number;
  }) => React.ReactNode;
};

export const EventRenderer = memo(
  ({ event, index, renderEvent }: EventRendererProps) => {
    const [eventState, updateEventState] = useRecoilState(eventAtom(event));

    const onPositionChange = (position: { x: number; y: number }) => {
      updateEventState((prev) => ({
        ...prev,
        position,
      }));
    };

    const { dragGesture, animatedStyles } = useDraggable(onPositionChange);

    const memoizedRenderEvent = React.useMemo(
      () => renderEvent({ event, index }),
      [event, index],
    );

    console.log({ eventState });

    return (
      <GestureDetector gesture={dragGesture}>
        <Animated.View style={animatedStyles}>
          {memoizedRenderEvent}
        </Animated.View>
      </GestureDetector>
    );
  },
);
