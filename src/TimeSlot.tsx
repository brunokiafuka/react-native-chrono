import { View, Text, StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  time: string;
  scale: SharedValue<number>;
  children: React.ReactNode;
};

export const TimeSlot = ({ time, scale, children }: Props) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: scale.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.slot}>
        <Text style={styles.text}>{time}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.children}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  slot: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {},
  children: {
    marginTop: -7,
    flex: 1,
    marginLeft: 40,
    alignItems: "center",
  },
  line: {
    height: 2,
    marginLeft: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
