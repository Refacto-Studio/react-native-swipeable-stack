# Getting Started

## Installation

::: code-group

```bash [npm]
npm install react-native-swipeable-stack
```

```bash [yarn]
yarn add react-native-swipeable-stack
```

```bash [pnpm]
pnpm add react-native-swipeable-stack
```

:::

### Peer Dependencies

This library requires `react-native-reanimated` and `react-native-gesture-handler` as peer dependencies:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

Make sure to follow their setup guides:
- [React Native Reanimated Setup](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- [React Native Gesture Handler Setup](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)

::: warning Babel Configuration
Don't forget to add the Reanimated babel plugin to your `babel.config.js`:

```js
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```
:::

## Quick Start

Here's a minimal example to get you started:

```tsx
import { SwipeableStack, SwipeableStackRef } from 'react-native-swipeable-stack';
import { useRef } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

interface CardItem {
  id: string;
  title: string;
  image: string;
}

const data: CardItem[] = [
  { id: '1', title: 'Card 1', image: 'https://picsum.photos/400/600' },
  { id: '2', title: 'Card 2', image: 'https://picsum.photos/400/601' },
  { id: '3', title: 'Card 3', image: 'https://picsum.photos/400/602' },
];

export default function App() {
  const stackRef = useRef<SwipeableStackRef>(null);

  return (
    <View style={styles.container}>
      <SwipeableStack
        ref={stackRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderCard={(item) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
        onSwipeRight={(item) => console.log('Liked:', item.title)}
        onSwipeLeft={(item) => console.log('Nope:', item.title)}
        onEmpty={() => console.log('No more cards!')}
      />
      
      {/* Action Buttons */}
      <View style={styles.buttons}>
        <Button title="✕" onPress={() => stackRef.current?.swipeLeft()} />
        <Button title="↺" onPress={() => stackRef.current?.undo()} />
        <Button title="♥" onPress={() => stackRef.current?.swipeRight()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { 
    width: 340, 
    height: 500, 
    borderRadius: 20, 
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  image: { flex: 1 },
  title: { padding: 16, fontSize: 24, fontWeight: 'bold' },
  buttons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    padding: 20 
  },
});
```

## Next Steps

- Learn about [Custom Overlays](/guide/overlays) to add LIKE/NOPE labels
- Explore the [API Reference](/api/) for all available props
- Check out [Performance Tips](/guide/performance) for optimal animations
