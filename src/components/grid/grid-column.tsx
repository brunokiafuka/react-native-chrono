import React from "react";
import { StyleSheet, View, type LayoutChangeEvent } from "react-native";
import { Draggable } from "../../Draggable";
import type { Event } from "../../types/event";
import { useGridColumnPosition } from "../../store/grid-column-position";

export const GridAgendaColumn = <T extends Event>({
  data,
  renderItem,
}: {
  data: Array<T[]>;
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  estimatedItemSize: number;
}) => {
  const setPosition = useGridColumnPosition((state) => state.setPosition);

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const x = nativeEvent.layout.x;
    setPosition(x);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={{ flex: 1 }} onLayout={onLayout}>
          {item.map((item, index) => (
            <Draggable key={item.id}>{renderItem({ item, index })}</Draggable>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
});
