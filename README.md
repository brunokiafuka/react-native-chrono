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
import { Agenda } from "react-native-chrono";
// ...

const events = [
  {
    id: "1",
    startDate: "2024-02-23T07:00:55.304Z",
    endDate: "2024-02-23T07:50:55.304Z",
  },
]

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
      <View key={item.id}>
        <Text>{item.startDate}</Text>
        <Text>{item.endDate}</Text>
      </View>
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
