import React, { useMemo } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import type { AgendaEvent } from "./types/event";
import { EventRenderer } from "./components/EventRenderer";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { configAtom } from "./store/config";
import Weekdays from "./components/Weekdays";

type Props<T extends AgendaEvent> = {
  startHour: number;
  endHour: number;
  data: T[];
  itemSize: number;
  scrollEnabled?: boolean;
  renderEvent: ({
    event,
    index,
    height,
  }: {
    event: T;
    index: number;
    height: number;
  }) => React.ReactNode;
  renderTimeSlot: ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => React.ReactNode;
};

export const Agenda = <T extends AgendaEvent>({
  startHour,
  endHour,
  data,
  renderEvent,
  itemSize,
  scrollEnabled = true,
  renderTimeSlot,
}: Props<T>) => {
  const setConfig = useSetRecoilState(configAtom);

  const timeSlots = generateTimeSlots(startHour, endHour);

  const itemStyle = useMemo(() => ({ height: itemSize }), [itemSize]);

  const renderTimeSlots = useMemo(() => {
    return timeSlots.map((item, index) => (
      <View key={index} style={itemStyle}>
        {renderTimeSlot({ item, index })}
      </View>
    ));
  }, [timeSlots, renderTimeSlot]);

  const renderEvents = useMemo(() => {
    return data.map((item, index) => (
      <EventRenderer
        renderEvent={renderEvent}
        key={index}
        event={item}
        index={index}
      />
    ));
  }, [data, renderEvent]);

  React.useEffect(() => {
    setConfig({ startHour, endHour, itemSize });
  }, [startHour, endHour, itemSize]);

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Weekdays />
        <View style={styles.timeSlotContainer}>{renderTimeSlots}</View>
        <View style={styles.itemContainer}>{renderEvents}</View>
      </ScrollView>
    </View>
  );
};

export const AgendaProvider = <T extends AgendaEvent>({
  startHour,
  endHour,
  itemSize,
  ...props
}: Props<T>) => {
  return (
    <RecoilRoot>
      <Agenda
        startHour={startHour}
        endHour={endHour}
        itemSize={itemSize}
        {...props}
      />
    </RecoilRoot>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  timeSlotContainer: {},
  itemContainer: {
    flex: 2,
  },
});
