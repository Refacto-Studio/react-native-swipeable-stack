# Custom Overlays

Overlays are visual feedback elements (like "LIKE" and "NOPE" labels) that appear while the user swipes a card. Their opacity animates based on the swipe progress.

## Basic Usage

```tsx
<SwipeableStack
  data={data}
  renderCard={renderCard}
  keyExtractor={(item) => item.id}
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
```

## Styling Overlays

Create engaging overlay styles with rotation and borders:

```tsx
const styles = StyleSheet.create({
  overlayLike: {
    position: 'absolute',
    top: 50,
    left: 30,
    borderWidth: 4,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 12,
    transform: [{ rotate: '-20deg' }],
  },
  overlayNope: {
    position: 'absolute',
    top: 50,
    right: 30,
    borderWidth: 4,
    borderColor: '#ef4444',
    borderRadius: 8,
    padding: 12,
    transform: [{ rotate: '20deg' }],
  },
  overlayText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
  },
});
```

## Overlay Configuration

Control how quickly the overlay appears using `overlayConfig`:

```tsx
<SwipeableStack
  overlayConfig={{
    // Input range: percentage of screen width (0 to 0.2 = 0% to 20%)
    inputRange: [0, 0.15],
    // Output range: opacity (0 = transparent, 1 = fully visible)
    outputRange: [0, 1],
  }}
  // ...other props
/>
```

### Configuration Options

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `inputRange` | `[number, number]` | `[0, 0.2]` | Percentage of screen width for interpolation |
| `outputRange` | `[number, number]` | `[0, 1]` | Opacity values (start, end) |

### Examples

**Quick fade-in (appears faster):**
```tsx
overlayConfig={{
  inputRange: [0, 0.1],   // 10% of screen width
  outputRange: [0, 1],
}}
```

**Slow fade-in with partial opacity:**
```tsx
overlayConfig={{
  inputRange: [0, 0.4],   // 40% of screen width
  outputRange: [0, 0.8],  // Max 80% opacity
}}
```

## Using Custom Components

You can use any React component as an overlay:

```tsx
import LottieView from 'lottie-react-native';

<SwipeableStack
  renderRightOverlay={() => (
    <LottieView
      source={require('./heart-animation.json')}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  )}
  // ...other props
/>
```

::: tip
Overlays are absolutely positioned inside the card wrapper. Use `position: 'absolute'` with `top`, `left`, `right`, or `bottom` to position them precisely.
:::
