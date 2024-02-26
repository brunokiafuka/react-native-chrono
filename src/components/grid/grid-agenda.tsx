import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { generateTimeSlots } from "../../utils/generateTimeSlots";
import type { Event } from "../../types/event";
import { GridAgendaColumn } from "./grid-column";

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

export const GridAgenda = <T extends Event>({
  startHour,
  endHour,
  data,
  renderItem,
  estimatedItemSize,
  scrollEnabled = true,
  renderTimeSlot,
}: Props<T>) => {
  const timeSlots = generateTimeSlots(startHour, endHour);

  const itemStyle = useMemo(
    () => ({ height: estimatedItemSize }),
    [estimatedItemSize],
  );

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
      <GridAgendaColumn
        data={data}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
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
    flexDirection: "row",
  },
});
