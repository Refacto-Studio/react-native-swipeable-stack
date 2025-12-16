# 🗺️ Roadmap

<style>
.roadmap-section {
  margin: 32px 0;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.roadmap-section.next {
  border-top: 4px solid #22c55e;
}

.roadmap-section.planned {
  border-top: 4px solid #3b82f6;
}

.roadmap-section.future {
  border-top: 4px solid #f59e0b;
}

.version-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.version-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.next .version-badge {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.planned .version-badge {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.future .version-badge {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.status-pill {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: white;
}

.next .status-pill { background: #22c55e; }
.planned .status-pill { background: #3b82f6; }
.future .status-pill { background: #f59e0b; }

.ideas-box {
  margin-top: 40px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.ideas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.idea-card {
  padding: 12px 16px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  font-size: 0.9rem;
}
</style>

<div class="roadmap-section next">
  <div class="version-header">
    <span class="version-badge">v1.1.0</span>
    <strong>Polish & Performance</strong>
    <span class="status-pill">Up Next</span>
  </div>

### 🎯 High Priority
- [ ] **Haptic feedback** - Add vibration on swipe
- [ ] **Accessibility** - VoiceOver/TalkBack support
- [ ] **Unit tests** - Jest + React Native Testing Library

### 🔧 Improvements
- [ ] Configurable return animation
- [ ] Swipe velocity boost option
- [ ] `onSwipeStart` callback

</div>

<div class="roadmap-section planned">
  <div class="version-header">
    <span class="version-badge">v1.2.0</span>
    <strong>Features</strong>
    <span class="status-pill">Planned</span>
  </div>

### 🚀 New Features
- [ ] **Vertical swipe** - Up/down in addition to left/right
- [ ] **Super Like** - Swipe up with special animation
- [ ] **Rewind animation** - Smooth animation for undo
- [ ] **Infinite scroll** - `onEndReached` to load more cards
- [ ] **Card peek** - Preview of the 3rd card

### 🎨 Customization
- [ ] Custom overlay positions
- [ ] Rotation origin configuration  
- [ ] Shadow animation on swipe

</div>

<div class="roadmap-section future">
  <div class="version-header">
    <span class="version-badge">v2.0.0</span>
    <strong>Breaking Changes</strong>
    <span class="status-pill">Future</span>
  </div>

### 💥 Major Changes
- [ ] Simplified API for better DX
- [ ] Expo 55+ only
- [ ] Fabric / New Architecture only
- [ ] New Architecture optimizations

</div>

<div class="ideas-box">

### 💡 Ideas Backlog

<div class="ideas-grid">
  <div class="idea-card">Auto-swipe timer</div>
  <div class="idea-card">Gesture competition</div>
  <div class="idea-card">Card grouping</div>
  <div class="idea-card">Analytics hooks</div>
  <div class="idea-card">Theming system</div>
</div>

</div>

---

::: tip Want to contribute?
Check out the [GitHub repository](https://github.com/Refacto-Studio/react-native-swipeable-stack) and feel free to open issues or pull requests!
:::
