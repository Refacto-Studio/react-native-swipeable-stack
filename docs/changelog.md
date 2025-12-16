# 📋 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-12-16 🎉

::: tip First Release!
This is the initial stable release of react-native-swipeable-stack.
:::

### ✨ Added

| Feature | Description |
|---------|-------------|
| `SwipeableStack` | Main component with full gesture support |
| `SwipeableCard` | Individual card component |
| `useSwipeableStack` | Hook for state management |
| `useSwipeGesture` | Hook for pan gesture handling |
| `useSwipeAnimation` | Hook for animated styles |
| `useNextCardAnimation` | Hook for background card animation |
| Imperative API | `swipeLeft()`, `swipeRight()`, `undo()` via ref |
| Overlays | Customizable LIKE/NOPE labels |
| TypeScript | Full type support with exported types |

### ⚡ Performance

- ✅ Memoized gesture objects per Reanimated best practices
- ✅ All animations run on UI thread via worklets
- ✅ Uses `.get()`/`.set()` API for React Compiler compatibility
- ✅ Non-layout properties (`transform`) for optimal performance
- ✅ `Extrapolation.CLAMP` to prevent value overflow

### 📦 Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-native": ">=0.70.0",
  "react-native-gesture-handler": ">=2.0.0",
  "react-native-reanimated": ">=3.0.0"
}
```

---

## Coming Soon

See our [Roadmap](/roadmap) for upcoming features:

- 🎯 **v1.1.0** - Haptic feedback, accessibility, unit tests
- 🚀 **v1.2.0** - Vertical swipe, Super Like, infinite scroll
- 💥 **v2.0.0** - Simplified API, New Architecture only
