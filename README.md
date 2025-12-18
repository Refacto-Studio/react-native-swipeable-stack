# react-native-swipeable-stack

<p align="center">
  <img src="https://img.shields.io/npm/v/react-native-swipeable-stack?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/l/react-native-swipeable-stack?style=flat-square" alt="license" />
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-brightgreen?style=flat-square" alt="platforms" />
</p>

A performant, customizable **Tinder-like swipeable card stack** for React Native. Built with **Reanimated 3+** and **Gesture Handler 2+** for silky-smooth 60fps animations.

<p align="center">
  <img src="video/demo.gif" alt="React Native Swipeable Stack Demo" width="300" />
</p>

> **[📖 Read the Documentation](https://refacto-studio.github.io/react-native-swipeable-stack/)**

## ✨ Features

- 🎯 **Smooth Gestures** - Pan gesture with spring physics for natural feel
- ⚡ **60fps Animations** - All animations run on the UI thread
- 🎨 **Customizable Overlays** - LIKE/NOPE labels with opacity transitions
- 🔄 **Undo Support** - Go back to the previous card
- 🎮 **Imperative API** - Trigger swipes from buttons via ref
- 📦 **Typed** - Full TypeScript support
- ⚙️ **Configurable** - Thresholds, animations, styling all customizable

## 📦 Installation

```bash
# With npm
npm install react-native-swipeable-stack

# With yarn
yarn add react-native-swipeable-stack
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react-native-reanimated react-native-gesture-handler
```

And follow their setup guides:
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)

## 🚀 Quick Start

```tsx
import { SwipeableStack, SwipeableStackRef } from 'react-native-swipeable-stack';
import { useRef } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Item {
  id: string;
  title: string;
  image: string;
}

const data: Item[] = [
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
        renderRightOverlay={() => (
          <View style={styles.overlayLike}>
            <Text style={styles.overlayText}>LIKE</Text>
          </View>
        )}
        renderLeftOverlay={() => (
          <View style={styles.overlayNope}>
            <Text style={styles.overlayText}>NOPE</Text>
          </View>
        )}
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
  overlayLike: {
    borderWidth: 4,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 8,
    transform: [{ rotate: '-20deg' }],
  },
  overlayNope: {
    borderWidth: 4,
    borderColor: '#ef4444',
    borderRadius: 8,
    padding: 8,
    transform: [{ rotate: '20deg' }],
  },
  overlayText: { fontSize: 32, fontWeight: '800' },
});
```

## 📖 API Reference

### `<SwipeableStack />`

The main component for rendering a stack of swipeable cards.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | **required** | Array of items to display |
| `renderCard` | `(item: T, index: number) => ReactNode` | **required** | Render function for each card |
| `keyExtractor` | `(item: T) => string` | **required** | Unique key for each item |
| `onSwipeLeft` | `(item: T, index: number) => void` | - | Called when card swiped left |
| `onSwipeRight` | `(item: T, index: number) => void` | - | Called when card swiped right |
| `onSwipeComplete` | `(direction, item, index) => void` | - | Called on any swipe |
| `onEmpty` | `() => void` | - | Called when all cards are swiped |
| `onIndexChange` | `(index: number) => void` | - | Called when current index changes |
| `swipeThreshold` | `number` | `screenWidth * 0.3` | Distance to trigger swipe |
| `velocityThreshold` | `number` | `800` | Velocity to trigger swipe |
| `visibleCards` | `number` | `2` | Number of visible cards in stack |
| `maxRotation` | `number` | `15` | Max rotation angle in degrees |
| `verticalSwipeFriction` | `number` | `0.2` | Dampens vertical movement |
| `disabled` | `boolean` | `false` | Disable gestures |
| `renderLeftOverlay` | `() => ReactNode` | - | Custom "NOPE" overlay |
| `renderRightOverlay` | `() => ReactNode` | - | Custom "LIKE" overlay |
| `overlayConfig` | `OverlayConfig` | see below | Overlay opacity settings |
| `animationConfig` | `AnimationConfig` | see below | Animation physics |
| `containerStyle` | `ViewStyle` | - | Container style |
| `cardWrapperStyle` | `ViewStyle` | - | Card wrapper style |
| `initialIndex` | `number` | `0` | Starting card index |

#### Ref Methods (via `SwipeableStackRef`)

```tsx
const stackRef = useRef<SwipeableStackRef>(null);

// Programmatic swipe left
stackRef.current?.swipeLeft();

// Programmatic swipe right
stackRef.current?.swipeRight();

// Undo last swipe
stackRef.current?.undo();

// Get current index
const index = stackRef.current?.getCurrentIndex();
```

### Animation Config

```tsx
interface AnimationConfig {
  swipeSpring?: {
    stiffness?: number;  // Default: 200
    damping?: number;    // Default: 20
    mass?: number;       // Default: 0.5
  };
  returnSpring?: {
    stiffness?: number;  // Default: 300
    damping?: number;    // Default: 30
  };
  programmaticTiming?: {
    duration?: number;   // Default: 200ms
  };
}
```

### Overlay Config

```tsx
interface OverlayConfig {
  inputRange?: [number, number];   // Default: [0, 0.2] (% of screen)
  outputRange?: [number, number];  // Default: [0, 1] (opacity)
}
```

## 🎣 Hooks

For advanced use cases, you can use the individual hooks:

### `useSwipeableStack`

Manages stack state with imperative controls.

```tsx
import { useSwipeableStack } from 'react-native-swipeable-stack';

const {
  currentIndex,
  currentItem,
  nextItem,
  isEmpty,
  swipeLeft,
  swipeRight,
  undo,
  manualTrigger, // SharedValue for triggering swipes
  swipeProgress, // SharedValue for tracking swipe position
} = useSwipeableStack({
  data: items,
  onSwipeRight: (item) => console.log('Liked', item),
});
```

### `useSwipeGesture`

Creates the pan gesture with spring physics.

```tsx
import { useSwipeGesture } from 'react-native-swipeable-stack';

const { gesture, translateX, translateY } = useSwipeGesture({
  swipeThreshold: 100,
  velocityThreshold: 800,
  screenWidth: 400,
  verticalFriction: 0.2,
  onSwipeComplete: (direction) => console.log(direction),
});
```

### `useSwipeAnimation`

Creates animated styles for card and overlays.

```tsx
import { useSwipeAnimation } from 'react-native-swipeable-stack';

const { animatedCardStyle, leftOverlayStyle, rightOverlayStyle } = useSwipeAnimation({
  translateX,
  translateY,
  screenWidth: 400,
  maxRotation: 15,
  overlayConfig: { inputRange: [0, 80], outputRange: [0, 1] },
});
```

## ⚡ Performance Tips

This library follows [Reanimated's performance best practices](https://docs.swmansion.com/react-native-reanimated/docs/guides/performance/):

### 1. Enable Feature Flags (Reanimated 4+)

Add to your `package.json`:

```json
{
  "reanimated": {
    "staticFeatureFlags": {
      "DISABLE_COMMIT_PAUSING_MECHANISM": true,
      "USE_COMMIT_HOOK_ONLY_FOR_REACT_COMMITS": true,
      "ANDROID_SYNCHRONOUSLY_UPDATE_UI_PROPS": true,
      "IOS_SYNCHRONOUSLY_UPDATE_UI_PROPS": true
    }
  }
}
```

### 2. Enable 120fps on iOS

Add to `Info.plist`:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

### 3. Use Memo for Card Content

```tsx
const MemoizedCard = memo(({ item }) => (
  <View>...</View>
));

<SwipeableStack
  renderCard={(item) => <MemoizedCard item={item} />}
/>
```

## 🔧 Best Practices Applied

- ✅ **Memoized Gestures** - `Gesture.Pan()` wrapped in `useMemo`
- ✅ **UI Thread Animations** - All animations via worklets
- ✅ **Non-layout Props** - Uses `transform` instead of `top/left`
- ✅ **`.get()`/`.set()` API** - React Compiler compatible
- ✅ **Extrapolation.CLAMP** - Prevents value overflow
- ✅ **`runOnJS`** - Callbacks properly bridged to JS thread

## 📄 License

MIT © Refacto Studio

---

<p align="center">
  Made with ❤️ for React Native
</p>
