# 🗺️ Roadmap - react-native-swipeable-stack

## v1.1.0 - Polish & Performance

### 🎯 High Priority
- [ ] **Haptic feedback** - Add vibration on swipe (expo-haptics or react-native-haptic-feedback)
- [ ] **Accessibility** - VoiceOver/TalkBack support with labels and alternative gestures
- [ ] **Unit tests** - Jest + React Native Testing Library for hooks and components

### 🔧 Improvements
- [ ] **Configurable return animation** - Allow customizing the spring-back animation
- [ ] **Swipe velocity boost** - Option to speed up animation based on swipe velocity
- [ ] **onSwipeStart callback** - Notify when gesture begins

---

## v1.2.0 - Features

### 🚀 New Features
- [ ] **Vertical swipe** - Option to enable up/down in addition to left/right
- [ ] **Super Like** - Swipe up with special animation (like Tinder)
- [ ] **Rewind animation** - Smooth animation for undo (card sliding back from the side)
- [ ] **Infinite scroll** - Support `onEndReached` to dynamically load more cards
- [ ] **Card peek** - Preview of the 3rd card with smaller scale

### 🎨 Customization
- [ ] **Custom overlay positions** - Allow overlays at bottom, center, etc.
- [ ] **Rotation origin** - Configure rotation pivot point
- [ ] **Shadow animation** - Shadow that changes with swipe progress

---

## v1.3.0 - Advanced

### 📦 Architecture
- [ ] **Extract to monorepo** - Move to a separate GitHub repository
- [ ] **Storybook** - Add stories to visualize all states
- [ ] **Documentation site** - Site with Docusaurus or VitePress
- [ ] **Automatic changelog** - Semantic release + conventional commits

### ⚡ Performance
- [ ] **React Compiler ready** - Full migration to `.get()/.set()` when stable
- [ ] **Worklet optimization** - Profiling and worklet optimization
- [ ] **Memory cleanup** - Ensure shared values are properly cleaned up

---

## v2.0.0 - Breaking Changes

### 💥 Potential Breaking Changes
- [ ] **Simplified API** - Review props for better consistency
- [ ] **Expo 55+ only** - Drop support for older Expo versions
- [ ] **Fabric only** - Drop old architecture support if relevant
- [ ] **New Architecture optimizations** - Use Reanimated feature flags

---

## 💡 Ideas (Low Priority)

- [ ] Auto-swipe timer - Automatic swipe after X seconds
- [ ] Gesture competition - Support with ScrollViews
- [ ] Card grouping - Group multiple cards together
- [ ] Analytics hooks - Built-in metrics (swipe rate, time per card)
- [ ] Theming system - Theme system for overlays
