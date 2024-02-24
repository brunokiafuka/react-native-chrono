import { FlashList } from "@shopify/flash-list";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TimeSlot } from "./TimeSlot";
import { generateTimeSlots } from "./utils/generateTimeSlots";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { Appointment } from "./Appointment";
import { appointments } from "./fixtures/appointments";
import { getAppointmentByHour } from "./utils/getAppointmentByHour";

type Props = {
  startHour: number;
  endHour: number;
};

export const Agenda = (props: Props) => {
  const scale = useSharedValue(100);
  const timeSlots = generateTimeSlots(props.startHour, props.endHour);

  const gesture = Gesture.Pinch().onUpdate((envt) => {
    const scale_ = Math.floor(envt.scale);
    if (scale_ === 0) scale.value = withTiming(100, { duration: 200 });
    if (scale_ >= 1 && scale_ <= 3) {
      scale.value = withTiming(100 * scale_);
    }
  });

  return (
    <GestureDetector gesture={gesture}>
      <View style={{ flex: 1 }}>
        <FlashList
          estimatedItemSize={100}
          getItemType={(item) => item.type}
          renderItem={({ item }) => {
            const hour = parseInt(item.time.split(":")[0]);
            const hourAppointments = getAppointmentByHour(hour);
            return (
              <TimeSlot time={item.time} scale={scale}>
                {/* <View style={{ flex: 1, marginLeft: 50 }}> */}
                {hourAppointments.map((appointment, idx) => (
                  <Appointment
                    key={idx}
                    type=""
                    startDate={appointment.startDate}
                    endDate={appointment.endDate}
                  />
                ))}
                {/* </View> */}
              </TimeSlot>
            );
          }}
          data={timeSlots.map((time) => ({ time, type: time + "time" }))}
        />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
});
