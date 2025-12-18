import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "React Native Swipeable Stack",
  description: "A performant, customizable Tinder-like swipeable card stack for React Native. Built with Reanimated 3+ and Gesture Handler 2+ for silky-smooth 60fps animations.",
  base: '/react-native-swipeable-stack/',
  sitemap: {
    hostname: 'https://refacto-studio.github.io/react-native-swipeable-stack/'
  },
  head: [
    ['meta', { name: 'keywords', content: 'react-native, swipeable-stack, tinder-cards, reanimated, gesture-handler, react-native-component, swipe-cards' }],
    ['meta', { name: 'author', content: 'Refacto Studio' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'React Native Swipeable Stack' }],
    ['meta', { property: 'og:description', content: 'Performant, customizable Tinder-like swipeable card stack for React Native.' }],
    ['meta', { property: 'og:image', content: 'https://refacto-studio.github.io/react-native-swipeable-stack/demo.gif' }],
    ['meta', { property: 'og:url', content: 'https://refacto-studio.github.io/react-native-swipeable-stack/' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'React Native Swipeable Stack' }],
    ['meta', { name: 'twitter:description', content: 'Performant, customizable Tinder-like swipeable card stack for React Native.' }],
    ['meta', { name: 'twitter:image', content: 'https://refacto-studio.github.io/react-native-swipeable-stack/demo.gif' }],
    ['link', { rel: 'icon', href: '/react-native-swipeable-stack/favicon.ico' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Roadmap', link: '/roadmap' },
      { text: 'Changelog', link: '/changelog' },
      { 
        text: 'v1.0.0', 
        items: [
          { text: 'GitHub', link: 'https://github.com/Refacto-Studio/react-native-swipeable-stack' },
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
      copyright: 'Copyright © 2025 Refacto Studio'
    },

    search: {
      provider: 'local'
    }
  }
})
