import {
  View,
  Text,
  FlatList,
  Pressable,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  generateDates,
  friendlyDateFormat,
  friendlyWeekDayFormat,
} from "../utils/generateDates";
import { getISOWeek, format } from "date-fns";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WEEKDAY_CONTAINER_WIDTH = Math.ceil(WINDOW_WIDTH / 7) - 2;
const WEEKDAY_SIZE = Math.ceil(WINDOW_WIDTH / 7) - 10;

/*
Next up:
1. Auto scroll on defined snap points (L | R)
2. Should we also animate event list?
3. Fix week days on year end or beginning
  >> maybe allow weeks carry over instead of splitting based
  >> Year

*/

export default function Weekdays() {
  // Todo: animate scroll
  const flatListRef = useRef(null);

  const initialWeekNumber = getISOWeek(new Date()) - 1;
  const [activeWeek, _setActiveWeek] = useState(initialWeekNumber);
  const [activeDay, setActiveDay] = useState(format(new Date(), "E d, LLL"));

  // Todo: set initial active week index based on current date
  const [activeWeekdayIdx, setActiveWeekdayIdx] = useState(0);
  // Todo: set initial year based on current date
  const [currentYear, _setActiveYear] = useState("2024");
  const yearWeekDays = generateDates(2023, 2024);

  const renderItem = useCallback(
    ({ item }) => (
      <View
        style={{
          width: WINDOW_WIDTH,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {yearWeekDays[currentYear][item].map((weekDay: string, idx: number) => (
          <View
            key={weekDay}
            style={{
              alignItems: "center",
              width: WEEKDAY_CONTAINER_WIDTH,
            }}
          >
            <Text style={{ color: "#777" }}>
              {friendlyWeekDayFormat(weekDay)}
            </Text>
            <Pressable
              onPress={() => {
                setActiveWeekdayIdx(idx);
                setActiveDay(format(new Date(weekDay), "E d, LLL"));
              }}
              style={{
                marginVertical: 4,
                // Todo: fix the math
                height: WEEKDAY_SIZE,
                width: WEEKDAY_SIZE,
                borderRadius: WEEKDAY_SIZE,
                backgroundColor: activeWeekdayIdx == idx ? "#3498db" : "#fff",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: activeWeekdayIdx == idx ? "#fff" : "#000",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                {friendlyDateFormat(weekDay)}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    ),
    [activeWeekdayIdx, currentYear],
  );

  return (
    <View style={styles.shadow}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, textAlign: "center" }}>{activeDay}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        horizontal
        data={Object.keys(yearWeekDays[currentYear])}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        initialScrollIndex={activeWeek}
        keyExtractor={(item, index) => item + index}
        getItemLayout={(_, index) => ({
          length: WINDOW_WIDTH,
          offset: WINDOW_WIDTH * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
    //backgroundColor: "pink",
  },
});
