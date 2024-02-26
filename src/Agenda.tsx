import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import type { Appointment } from "./types/appointment";
import { Draggable } from "./Draggable";

type Props<T extends Appointment> = {
  startHour: number;
  endHour: number;
  data: T[];
  itemSize: number;
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

export const Agenda = <T extends Appointment>({
  startHour,
  endHour,
  data,
  renderItem,
  itemSize,
  scrollEnabled = true,
  renderTimeSlot,
}: Props<T>) => {
  const timeSlots = generateTimeSlots(startHour, endHour);

  const itemStyle = useMemo(() => ({ height: itemSize }), [itemSize]);

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.timeSlotContainer}>
        {timeSlots.map((item, index) => (
          <View key={index} style={itemStyle}>
            {renderTimeSlot({ item, index })}
          </View>
        ))}
      </View>
      <View style={styles.itemContainer}>
        {data.map((item, index) => (
          <Draggable key={item.id}>{renderItem({ item, index })}</Draggable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeSlotContainer: {},
  itemContainer: {
    flex: 2,
  },
});
