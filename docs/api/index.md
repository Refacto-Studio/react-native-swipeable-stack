# API Reference

## SwipeableStack

The main component for rendering a stack of swipeable cards.

```tsx
import { SwipeableStack } from 'react-native-swipeable-stack';
```

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of items to display |
| `renderCard` | `(item: T, index: number) => ReactNode` | Render function for each card |
| `keyExtractor` | `(item: T) => string` | Unique key for each item |

### Callbacks

| Prop | Type | Description |
|------|------|-------------|
| `onSwipeLeft` | `(item: T, index: number) => void` | Called when card swiped left |
| `onSwipeRight` | `(item: T, index: number) => void` | Called when card swiped right |
| `onSwipeStart` | `(direction: SwipeDirection) => void` | Called when swipe gesture starts |
| `onSwipeComplete` | `(direction: SwipeDirection, item: T, index: number) => void` | Called when swipe animation completes |
| `onEmpty` | `() => void` | Called when all cards are swiped |
| `onIndexChange` | `(index: number) => void` | Called when current index changes |

### Configuration

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `swipeThreshold` | `number` | `screenWidth * 0.3` | Distance to trigger swipe |
| `velocityThreshold` | `number` | `800` | Velocity to trigger swipe |
| `visibleCards` | `number` | `2` | Number of visible cards in stack |
| `maxRotation` | `number` | `15` | Max rotation angle in degrees |
| `verticalSwipeFriction` | `number` | `0.2` | Dampens vertical movement |
| `disabled` | `boolean` | `false` | Disable gestures |
| `initialIndex` | `number` | `0` | Starting card index |
| `animationConfig` | `AnimationConfig` | See below | Animation physics settings |

### Overlays

| Prop | Type | Description |
|------|------|-------------|
| `renderLeftOverlay` | `() => ReactNode` | Custom "NOPE" overlay |
| `renderRightOverlay` | `() => ReactNode` | Custom "LIKE" overlay |
| `overlayConfig` | `OverlayConfig` | Overlay opacity settings |

### Styling

| Prop | Type | Description |
|------|------|-------------|
| `containerStyle` | `ViewStyle` | Container style |
| `cardWrapperStyle` | `ViewStyle` | Card wrapper style |

---

## SwipeableStackRef

Ref handle for imperative control of the stack.

```tsx
const stackRef = useRef<SwipeableStackRef>(null);
```

### Methods

| Method | Type | Description |
|--------|------|-------------|
| `swipeLeft()` | `() => void` | Programmatically swipe left |
| `swipeRight()` | `() => void` | Programmatically swipe right |
| `undo()` | `() => void` | Undo last swipe |
| `getCurrentIndex()` | `() => number` | Get current card index |

### Example

```tsx
// Trigger swipes from buttons
<Button title="Nope" onPress={() => stackRef.current?.swipeLeft()} />
<Button title="Like" onPress={() => stackRef.current?.swipeRight()} />
<Button title="Undo" onPress={() => stackRef.current?.undo()} />
```

---

## AnimationConfig

Configuration for various animation states.

```tsx
interface AnimationConfig {
  swipeSpring?: SpringConfig;    // Swipe-out animation
  returnSpring?: SpringConfig;   // Return-to-center animation
  programmaticTiming?: TimingConfig; // Button-triggered swipes
  nextCardSpring?: SpringConfig; // Next card reveal animation
}
```

### SpringConfig

```tsx
interface SpringConfig {
  stiffness?: number;  // Default: 200 (swipe), 300 (return), 100 (next)
  damping?: number;    // Default: 20 (swipe), 30 (return), 15 (next)
  mass?: number;       // Default: 0.5
  velocity?: number;   // Usually from gesture
}
```

### TimingConfig

```tsx
interface TimingConfig {
  duration?: number;   // Default: 200ms
}
```

### Example

```tsx
<SwipeableStack
  animationConfig={{
    swipeSpring: {
      stiffness: 250,
      damping: 25,
      mass: 0.6,
    },
    returnSpring: {
      stiffness: 400,
      damping: 35,
    },
    programmaticTiming: {
      duration: 300,
    },
  }}
/>
```

---

## OverlayConfig

Configuration for overlay opacity animation.

```tsx
interface OverlayConfig {
  inputRange?: [number, number];   // Default: [0, 0.2]
  outputRange?: [number, number];  // Default: [0, 1]
}
```

| Property | Default | Description |
|----------|---------|-------------|
| `inputRange` | `[0, 0.2]` | Percentage of screen width |
| `outputRange` | `[0, 1]` | Opacity values (0 to 1) |

---

## Types

All types are exported for TypeScript usage:

```tsx
import type {
  SwipeDirection,
  SwipeableStackProps,
  SwipeableStackRef,
  AnimationConfig,
  SpringConfig,
  TimingConfig,
  OverlayConfig,
} from 'react-native-swipeable-stack';
```

### SwipeDirection

```tsx
type SwipeDirection = 'left' | 'right';
```
