# Performance Tips

This library is built with performance in mind. Here are additional optimizations you can apply.

## Enable Reanimated Feature Flags

For Reanimated 4+, enable these feature flags in your `package.json`:

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

## Enable 120fps on iOS

For ProMotion-enabled devices, add to your `Info.plist`:

```xml
<key>CADisableMinimumFrameDurationOnPhone</key>
<true/>
```

## Memoize Card Content

Always memoize your card components to prevent unnecessary re-renders:

```tsx
import { memo } from 'react';

const CardContent = memo(({ item }: { item: CardItem }) => (
  <View style={styles.card}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <Text style={styles.title}>{item.title}</Text>
  </View>
));

// Usage
<SwipeableStack
  renderCard={(item) => <CardContent item={item} />}
  // ...other props
/>
```

## Best Practices Applied

This library already implements these performance best practices:

| Practice | Description |
|----------|-------------|
| ✅ Memoized Gestures | `Gesture.Pan()` wrapped in `useMemo` |
| ✅ UI Thread Animations | All animations via worklets |
| ✅ Non-layout Props | Uses `transform` instead of `top/left` |
| ✅ `.get()`/`.set()` API | React Compiler compatible |
| ✅ Extrapolation.CLAMP | Prevents value overflow |
| ✅ `runOnJS` | Callbacks properly bridged to JS thread |

## Reduce Visible Cards

If you don't need a stacked effect, set `visibleCards={1}`:

```tsx
<SwipeableStack
  visibleCards={1}
  // ...other props
/>
```

::: tip
Fewer visible cards = fewer components rendered = better performance.
:::

## Image Optimization

For image-heavy cards, consider:

1. **Use FastImage**: Replace `<Image>` with `react-native-fast-image` for better caching
2. **Preload Images**: Load images before they're needed
3. **Optimize Size**: Serve appropriately sized images

```tsx
import FastImage from 'react-native-fast-image';

const CardContent = memo(({ item }) => (
  <FastImage
    source={{ uri: item.image, priority: FastImage.priority.high }}
    style={styles.image}
    resizeMode={FastImage.resizeMode.cover}
  />
));
```
