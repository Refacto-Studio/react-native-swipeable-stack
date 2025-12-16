import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React Native Swipeable Stack",
  description: "A performant, customizable Tinder-like swipeable card stack for React Native. Built with Reanimated 3+ and Gesture Handler 2+ for silky-smooth 60fps animations.",
  base: '/react-native-swipeable-stack/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Roadmap', link: '/roadmap' },
      { 
        text: 'v1.0.0', 
        items: [
          { text: 'Changelog', link: 'https://github.com/Refacto-Studio/react-native-swipeable-stack/releases' },
          { text: 'npm', link: 'https://www.npmjs.com/package/react-native-swipeable-stack' }
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
          ]
        },
        {
          text: 'Features',
          items: [
            { text: 'Custom Overlays', link: '/guide/overlays' },
            { text: 'Performance Tips', link: '/guide/performance' },
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'SwipeableStack', link: '/api/' },
            { text: 'Hooks', link: '/api/hooks' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Refacto-Studio/react-native-swipeable-stack' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024 Refacto Studio'
    },

    search: {
      provider: 'local'
    }
  }
})
