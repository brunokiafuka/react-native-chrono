import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Pressable as RNPressable,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

const hours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
];

const END_POSITION = 300;

const Pressable = Animated.createAnimatedComponent(RNPressable);

const SAMPLE_SLOT_POSITION = {
  "key-1": 0,
  "key-2": 200,
} as { [key: string]: number };

export default function App() {
  const onDrag = useSharedValue(true);
  const [active, setActive] = useState("key-1");
  const [isDragging, setDragging] = useState(false);

  const position = useSharedValue(SAMPLE_SLOT_POSITION);

  /* 
Todo: Define strategy to handle action when dragging stops, debounce!!! 
  */

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > -1) {
        console.log(position.value);
        position.value = {
          ...position.value,
          [`${active}`]: e.translationY,
        };
        //   console.log(position.value);
      }

      // if (onDrag.value) {
      //   position.value = e.translationY;
      // } else {
      //   position.value = END_POSITION + e.translationY;
      // }
    })
    .onEnd((e) => {
      // define final Y position
      if (position.value[active] > END_POSITION / 2) {
        position.value = {
          ...position.value,
          [`${active}`]: e.translationY,
        };
        onDrag.value = false;
      } else {
        position.value = {
          ...position.value,
          [`${active}`]: e.translationY, //withTiming(0, { duration: 100 }),
        };
        onDrag.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: position.value[active],
        },
      ],
    };
  }, [active]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ width: "100%", height: 50, backgroundColor: "red" }} />

      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
          <View>
            <FlatList
              data={hours}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 40,
                    alignItems: "center",
                  }}
                >
                  <Text>{item}</Text>
                  <View
                    style={{
                      marginLeft: 5,
                      backgroundColor: "#000",
                      width: "100%",
                      height: StyleSheet.hairlineWidth,
                    }}
                  />
                </View>
              )}
            />

            {isDragging && (
              <Animated.View
                style={[
                  {
                    width: 300,
                    height: 120,
                    backgroundColor: "green",
                    position: "absolute",
                    left: 50,
                  },
                  animatedStyle,
                ]}
              />
            )}

            <Pressable
              onLongPress={() => {
                setActive("key-1");
                setDragging(!isDragging);
              }}
              style={[
                {
                  width: 300,
                  height: 120,
                  backgroundColor: "blue",
                  position: "absolute",
                  left: 50,
                  opacity: isDragging && active == "key-1" ? 0 : 1,
                  transform: [{ translateY: position.value["key-1"] }],
                },
              ]}
            />

            <Pressable
              onLongPress={() => {
                setActive("key-2");
                setDragging(!isDragging);
              }}
              style={[
                {
                  width: 300,
                  height: 120,
                  backgroundColor: "red",
                  position: "absolute",
                  left: 50,
                  opacity: isDragging && active == "key-2" ? 0 : 1,
                  transform: [{ translateY: position.value["key-2"] }],
                },
              ]}
            />
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
