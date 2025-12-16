# 🗺️ Roadmap

<script setup>
const versions = [
  {
    version: 'v1.1.0',
    title: 'Polish & Performance',
    status: 'next',
    sections: [
      {
        emoji: '🎯',
        title: 'High Priority',
        items: [
          { done: false, text: 'Haptic feedback - Add vibration on swipe' },
          { done: false, text: 'Accessibility - VoiceOver/TalkBack support' },
          { done: false, text: 'Unit tests - Jest + React Native Testing Library' },
        ]
      },
      {
        emoji: '🔧',
        title: 'Improvements',
        items: [
          { done: false, text: 'Configurable return animation' },
          { done: false, text: 'Swipe velocity boost option' },
          { done: false, text: 'onSwipeStart callback' },
        ]
      }
    ]
  },
  {
    version: 'v1.2.0',
    title: 'Features',
    status: 'planned',
    sections: [
      {
        emoji: '🚀',
        title: 'New Features',
        items: [
          { done: false, text: 'Vertical swipe (up/down)' },
          { done: false, text: 'Super Like animation (swipe up)' },
          { done: false, text: 'Rewind animation for undo' },
          { done: false, text: 'Infinite scroll with onEndReached' },
          { done: false, text: 'Card peek (3rd card preview)' },
        ]
      },
      {
        emoji: '🎨',
        title: 'Customization',
        items: [
          { done: false, text: 'Custom overlay positions' },
          { done: false, text: 'Rotation origin configuration' },
          { done: false, text: 'Shadow animation on swipe' },
        ]
      }
    ]
  },
  {
    version: 'v2.0.0',
    title: 'Breaking Changes',
    status: 'future',
    sections: [
      {
        emoji: '💥',
        title: 'Major Changes',
        items: [
          { done: false, text: 'Simplified API for better DX' },
          { done: false, text: 'Expo 55+ only' },
          { done: false, text: 'Fabric / New Architecture only' },
          { done: false, text: 'New Architecture optimizations' },
        ]
      }
    ]
  }
]
</script>

<style>
.roadmap-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 24px;
}

.version-card {
  position: relative;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  overflow: hidden;
}

.version-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
}

.version-card.next::before {
  background: linear-gradient(90deg, #22c55e, #10b981);
}

.version-card.planned::before {
  background: linear-gradient(90deg, #3b82f6, #6366f1);
}

.version-card.future::before {
  background: linear-gradient(90deg, #f59e0b, #ef4444);
}

.version-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.version-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.next .version-tag {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.planned .version-tag {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.future .version-tag {
  background: rgba(245, 158, 11, 0.15);
  color: #f59e0b;
}

.version-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.status-badge {
  margin-left: auto;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.next .status-badge {
  background: #22c55e;
  color: white;
}

.planned .status-badge {
  background: #3b82f6;
  color: white;
}

.future .status-badge {
  background: #f59e0b;
  color: white;
}

.section {
  margin-bottom: 16px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-2);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-left: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  font-size: 0.95rem;
}

.item-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--vp-c-divider);
  border-radius: 4px;
  flex-shrink: 0;
}

.item.done .item-checkbox {
  background: #22c55e;
  border-color: #22c55e;
}

.ideas-section {
  margin-top: 40px;
  padding: 24px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
}

.ideas-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--vp-c-text-1);
}

.ideas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.idea-item {
  padding: 12px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}
</style>

<div class="roadmap-container">
  <div v-for="v in versions" :key="v.version" :class="['version-card', v.status]">
    <div class="version-header">
      <span class="version-tag">{{ v.version }}</span>
      <span class="version-title">{{ v.title }}</span>
      <span class="status-badge">
        {{ v.status === 'next' ? 'Up Next' : v.status === 'planned' ? 'Planned' : 'Future' }}
      </span>
    </div>
    <div v-for="section in v.sections" :key="section.title" class="section">
      <div class="section-title">
        <span>{{ section.emoji }}</span>
        <span>{{ section.title }}</span>
      </div>
      <div class="items-list">
        <div v-for="item in section.items" :key="item.text" :class="['item', { done: item.done }]">
          <div class="item-checkbox"></div>
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="ideas-section">
  <div class="ideas-title">
    <span>💡</span>
    <span>Ideas Backlog</span>
  </div>
  <div class="ideas-grid">
    <div class="idea-item">Auto-swipe timer</div>
    <div class="idea-item">Gesture competition with ScrollViews</div>
    <div class="idea-item">Card grouping</div>
    <div class="idea-item">Built-in analytics hooks</div>
    <div class="idea-item">Theming system for overlays</div>
  </div>
</div>

---

::: tip Want to contribute?
Check out the [GitHub repository](https://github.com/Refacto-Studio/react-native-swipeable-stack) and feel free to open issues or pull requests!
:::
