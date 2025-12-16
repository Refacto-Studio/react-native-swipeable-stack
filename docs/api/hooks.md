# Hooks

For advanced use cases, you can use the individual hooks to build custom implementations.

## useSwipeableStack

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
} = useSwipeableStack({
  data: items,
  onSwipeRight: (item) => console.log('Liked', item),
  onSwipeLeft: (item) => console.log('Noped', item),
  onEmpty: () => console.log('Stack empty'),
});
```

### Parameters

| Option | Type | Description |
|--------|------|-------------|
| `data` | `T[]` | Array of items |
| `initialIndex` | `number` | Starting index (default: 0) |
| `onSwipeLeft` | `(item: T, index: number) => void` | Left swipe callback |
| `onSwipeRight` | `(item: T, index: number) => void` | Right swipe callback |
| `onSwipeComplete` | `(direction, item, index) => void` | Any swipe callback |
| `onEmpty` | `() => void` | Stack empty callback |
| `onIndexChange` | `(index: number) => void` | Index change callback |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `currentIndex` | `number` | Current card index |
| `currentItem` | `T \| undefined` | Current visible item |
| `nextItem` | `T \| undefined` | Next item in stack |
| `isEmpty` | `boolean` | Whether stack is empty |
| `swipeLeft` | `() => void` | Trigger left swipe |
| `swipeRight` | `() => void` | Trigger right swipe |
| `undo` | `() => void` | Undo last swipe |

---

## useSwipeGesture

Creates the pan gesture with spring physics.

```tsx
import { useSwipeGesture } from 'react-native-swipeable-stack';

const { gesture, translateX, translateY } = useSwipeGesture({
  swipeThreshold: 120,
  velocityThreshold: 800,
  screenWidth: 400,
  verticalFriction: 0.2,
  animationConfig: {
    swipeSpring: { stiffness: 200, damping: 20 },
    returnSpring: { stiffness: 300, damping: 30 },
  },
  onSwipeComplete: (direction) => console.log('Swiped:', direction),
});
```

### Parameters

| Option | Type | Description |
|--------|------|-------------|
| `swipeThreshold` | `number` | Distance to trigger swipe |
| `velocityThreshold` | `number` | Velocity to trigger swipe |
| `screenWidth` | `number` | Screen width for calculations |
| `verticalFriction` | `number` | Dampens Y movement (0-1) |
| `animationConfig` | `AnimationConfig` | Spring configurations |
| `onSwipeComplete` | `(direction: SwipeDirection) => void` | Swipe callback |
| `disabled` | `boolean` | Disable gesture |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `gesture` | `PanGesture` | Gesture Handler pan gesture |
| `translateX` | `SharedValue<number>` | Animated X position |
| `translateY` | `SharedValue<number>` | Animated Y position |

---

## useSwipeAnimation

Creates animated styles for card and overlays.

```tsx
import { useSwipeAnimation } from 'react-native-swipeable-stack';

const { 
  animatedCardStyle, 
  leftOverlayStyle, 
  rightOverlayStyle 
} = useSwipeAnimation({
  translateX,
  translateY,
  screenWidth: 400,
  maxRotation: 15,
  overlayConfig: { 
    inputRange: [0, 80], 
    outputRange: [0, 1] 
  },
});
```

### Parameters

| Option | Type | Description |
|--------|------|-------------|
| `translateX` | `SharedValue<number>` | X translation value |
| `translateY` | `SharedValue<number>` | Y translation value |
| `screenWidth` | `number` | Screen width for rotation calc |
| `maxRotation` | `number` | Max rotation in degrees |
| `overlayConfig` | `OverlayConfig` | Overlay opacity config |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `animatedCardStyle` | `AnimatedStyle` | Style for card (transform + rotation) |
| `leftOverlayStyle` | `AnimatedStyle` | Style for left overlay (opacity) |
| `rightOverlayStyle` | `AnimatedStyle` | Style for right overlay (opacity) |

---

## useNextCardAnimation

Creates animated style for the background card (scale + opacity).

```tsx
import { useNextCardAnimation } from 'react-native-swipeable-stack';

const nextCardStyle = useNextCardAnimation({
  swipeProgress: translateX,
  screenWidth: 400,
});

// Apply to the next card
<Animated.View style={[styles.card, nextCardStyle]}>
  {renderCard(nextItem)}
</Animated.View>
```

### Parameters

| Option | Type | Description |
|--------|------|-------------|
| `swipeProgress` | `SharedValue<number>` | Current swipe X position |
| `screenWidth` | `number` | Screen width for interpolation |

### Return Value

Returns an `AnimatedStyle` with:
- `scale`: Interpolates from 0.92 to 1
- `opacity`: Interpolates from 0.6 to 1

---

## Building a Custom Stack

Here's how you might combine these hooks for a fully custom implementation:

```tsx
import {
  useSwipeableStack,
  useSwipeGesture,
  useSwipeAnimation,
  useNextCardAnimation,
} from 'react-native-swipeable-stack';

function CustomStack({ data }) {
  const { currentItem, nextItem, swipeLeft, swipeRight } = useSwipeableStack({
    data,
    onSwipeComplete: (dir, item) => console.log(dir, item),
  });

  const { gesture, translateX, translateY } = useSwipeGesture({
    swipeThreshold: 120,
    velocityThreshold: 800,
    screenWidth: SCREEN_WIDTH,
    onSwipeComplete: (direction) => {
      direction === 'left' ? swipeLeft() : swipeRight();
    },
  });

  const { animatedCardStyle } = useSwipeAnimation({
    translateX,
    translateY,
    screenWidth: SCREEN_WIDTH,
    maxRotation: 15,
  });

  const nextCardStyle = useNextCardAnimation({
    swipeProgress: translateX,
    screenWidth: SCREEN_WIDTH,
  });

  return (
    <GestureHandlerRootView>
      {nextItem && (
        <Animated.View style={nextCardStyle}>
          <Card item={nextItem} />
        </Animated.View>
      )}
      <GestureDetector gesture={gesture}>
        <Animated.View style={animatedCardStyle}>
          <Card item={currentItem} />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
```
