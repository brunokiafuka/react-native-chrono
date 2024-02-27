import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventAtom, eventPositionAtom } from "../store/event";
import type { AgendaEvent } from "../types/event";
import React from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { useDraggable } from "../hooks/useDraggable";
import { useEventHeight } from "../hooks/useEventHeight";
import { parseISO } from "date-fns";
import { configAtom } from "../store/config";
import { getUpdatedDate } from "../utils/getUpdatedDate";

type EventRendererProps = {
  event: AgendaEvent;
  index: number;
  renderEvent: ({
    event,
    index,
    height,
  }: {
    event: AgendaEvent;
    index: number;
    height: number;
  }) => React.ReactNode;
};

export const EventRenderer = memo(
  ({ event, index, renderEvent }: EventRendererProps) => {
    const { itemSize } = useRecoilValue(configAtom);
    const [eventState, setEvent] = useRecoilState(eventAtom(event));
    const eventPosition = useRecoilValue(eventPositionAtom(event));

    const height = useEventHeight(event);

    const onPositionChanged = (position: { x: number; y: number }) => {
      setEvent((prev) => {
        const oldStart = parseISO(prev.startDate);
        const oldEnd = parseISO(prev.endDate);

        const { newStartDate, newEndDate } = getUpdatedDate(
          position.y,
          itemSize,
          oldStart,
          oldEnd,
        );

        return {
          ...prev,
          startDate: newStartDate.toISOString(),
          endDate: newEndDate.toISOString(),
        };
      });
    };

    const memoizedRenderEvent = React.useMemo(() => {
      return renderEvent({ event: eventState, index, height });
    }, [renderEvent, eventState, index, height]);

    const { dragGesture, animatedStyles } = useDraggable(onPositionChanged);

    console.log("event ->", eventState.id, eventPosition.y);

    return (
      <GestureDetector gesture={dragGesture}>
        <Animated.View style={[animatedStyles, { top: eventPosition.y }]}>
          {memoizedRenderEvent}
        </Animated.View>
      </GestureDetector>
    );
  },
);
