# 📆 react-native-chrono 📆

An awesome react native agenda

> [!WARNING]
> This package is still under development and should not be used in production apps.

## Installation

```sh
npm install react-native-chrono
```

or

```sh
yarn add react-native-chrono
```

## Usage

```js
import { Agenda, Appointment } from "react-native-chrono";
// ...

const events = []

 <Agenda
    startHour={8}
    endHour={22}
    data={events}
    itemSize={100}
    renderTimeSlot={({ item }) => {
      return (
        <View style={styles.timeSlot}>
          <Text>{item}</Text>
        </View>
      );
    }}
    renderItem={({ item, index }) => (
      <Appointment
        key={index}
        type=""
        startDate={item.startDate}
        endDate={item.endDate}
        id={item.id}
      />
    )}
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Happy hacking 🚀

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
