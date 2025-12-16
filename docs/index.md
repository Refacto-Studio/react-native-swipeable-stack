---
layout: home

hero:
  name: "React Native Swipeable Stack"
  text: "Tinder-like Cards Made Easy"
  tagline: Performant, customizable swipeable card stack with Reanimated 3+ and Gesture Handler 2+
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/Refacto-Studio/react-native-swipeable-stack
    - theme: alt
      text: Roadmap
      link: /roadmap

features:
  - icon: 🎯
    title: Smooth Gestures
    details: Pan gesture with spring physics for a natural, responsive feel on any device.
  - icon: ⚡
    title: 60fps Animations
    details: All animations run on the UI thread via Reanimated worklets - silky smooth performance.
  - icon: 🎨
    title: Customizable Overlays
    details: Create custom LIKE/NOPE labels with opacity transitions that respond to swipe progress.
  - icon: 🔄
    title: Undo Support
    details: Allow users to go back to the previous card with a single method call.
  - icon: 🎮
    title: Imperative API
    details: Trigger swipes programmatically from buttons via ref - perfect for custom action buttons.
  - icon: 📦
    title: Fully Typed
    details: Complete TypeScript support with exported types for all props and callbacks.
---

<style>
.version-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--vp-c-brand-2));
  border-radius: 12px;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}
.version-badge img {
  height: 24px;
}
.badges-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
}
</style>

<div class="badges-container">
  <a href="https://www.npmjs.com/package/react-native-swipeable-stack">
    <img src="https://img.shields.io/npm/v/react-native-swipeable-stack?style=for-the-badge&logo=npm&logoColor=white&color=CB3837" alt="npm version" />
  </a>
  <a href="https://github.com/Refacto-Studio/react-native-swipeable-stack">
    <img src="https://img.shields.io/github/stars/Refacto-Studio/react-native-swipeable-stack?style=for-the-badge&logo=github&color=181717" alt="GitHub stars" />
  </a>
  <a href="https://github.com/Refacto-Studio/react-native-swipeable-stack/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/react-native-swipeable-stack?style=for-the-badge&color=22c55e" alt="license" />
  </a>
  <img src="https://img.shields.io/badge/platforms-iOS%20%7C%20Android-blue?style=for-the-badge" alt="platforms" />
</div>
