import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import type { TEvent } from "./types/events";
import { Draggable } from "./components/Draggable";
import { Event } from "./components/Event";

type Props<T extends TEvent> = {
  startHour: number;
  endHour: number;
  data: T[];
  itemSize: number;
  scrollEnabled?: boolean;
};

export const Agenda = <T extends TEvent>({
  startHour,
  endHour,
  data,
  itemSize,
  scrollEnabled = true,
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
            {/* Todo: move this into a separated component */}
            <View style={styles.timeSlot}>
              <Text>{item}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.itemContainer}>
        {data.map((item, index) => (
          <Draggable key={item.id}>
            <Event
              key={index}
              type=""
              startDate={item.startDate}
              endDate={item.endDate}
              id={item.id}
            />
          </Draggable>
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
  timeSlot: {
    flex: 1,
    alignItems: "center",
  },
});
