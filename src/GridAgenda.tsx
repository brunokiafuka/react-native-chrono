import React from "react";
import type { Event } from "./types/event";
import { GridAgenda as GA } from "./components/grid/grid-agenda";

type Props<T extends Event> = {
  startHour: number;
  endHour: number;
  data: Array<T[]>;
  estimatedItemSize: number;
  scrollEnabled?: boolean;
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  renderTimeSlot: ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => React.ReactNode;
};

export const GridAgenda = <T extends Event>(props: Props<T>) => {
  return <GA {...props} />;
};

// const styles = StyleSheet.create({});
