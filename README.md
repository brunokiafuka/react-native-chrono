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

const EVENTS: TAgendaData = []

 <GestureHandlerRootView style={styles.container}>
      <Agenda startHour={8} endHour={22} data={EVENTS} itemSize={100} />
</GestureHandlerRootView>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

Happy hacking 🚀

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
