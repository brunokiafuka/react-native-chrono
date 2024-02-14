import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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

export default function App() {
  const onDrag = useSharedValue(true);
  const position = useSharedValue(0);

  /* 
  Todo: define a strategy to handle multiple time blocks. 
  -> Each time block should have its own position property which should be used to define it's initial position.
  -> PanGesture animation should be activated after long press
  -> time-blocks should be 
  */

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > -1) {
        position.value = e.translationY;
      }

      // if (onDrag.value) {
      //   position.value = e.translationY;
      // } else {
      //   position.value = END_POSITION + e.translationY;
      // }
    })
    .onEnd((e) => {
      if (position.value > END_POSITION / 2) {
        position.value = withTiming(END_POSITION, { duration: 100 });
        onDrag.value = false;
      } else {
        position.value = withTiming(0, { duration: 100 });
        onDrag.value = true;
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value }],
  }));

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

            <Animated.View
              style={[
                {
                  width: 300,
                  height: 120,
                  backgroundColor: "blue",
                  position: "absolute",
                  left: 50,
                },
                animatedStyle,
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
