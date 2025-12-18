# Changelog

All notable changes to this project will be documented in this file.

## 1.0.1 (2025-12-18)

### Added

* fix: update version ([fd5ed79](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/fd5ed7973c69100e4a2b3c4287e695f334bdb144))


### Bug Fixes

* fix: update version ([fd5ed79](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/fd5ed7973c69100e4a2b3c4287e695f334bdb144))

## 1.0.0 (2025-12-17)


### Features

* Add GitHub Pages deployment workflow and a new roadmap documentation page. ([adee8d4](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/adee8d4ad14d1f6d457c8ab6c0a7fbf807baeff4))
* **docs:** Add changelog, update roadmap, and configure VitePress with new dependencies. ([3558e57](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/3558e570fd327fde2ca3731c753e7ea9e75236a2))
* **docs:** done ([ebba8a9](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/ebba8a92ed17f822a954a440a401207105beaad2))
* Implement CI/CD workflows, automated releases, and community contribution standards. ([59d1623](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/59d1623ee156e6526f7c3efb0c490751fc52243f))
* Introduce VitePress documentation with guides and API references, and refine `useSwipeAnimation` hook. ([b82d07e](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/b82d07e908e0a59abcf22ef42571e61f4360afef))


### Bug Fixes

* correct TypeScript declaration file paths in package.json ([bd4ecaf](https://github.com/Refacto-Studio/react-native-swipeable-stack/commit/bd4ecafe843c5af6f0257929711c8b578e6e08fa))

## [1.0.0] - 2025-12-16

### Added
- Initial release
- `SwipeableStack` component with full gesture support
- `SwipeableCard` component for individual cards
- `useSwipeableStack` hook for state management
- `useSwipeGesture` hook for pan gesture handling
- `useSwipeAnimation` hook for animated styles
- `useNextCardAnimation` hook for background card animation
- Imperative API via ref (`swipeLeft`, `swipeRight`, `undo`)
- Customizable overlays (LIKE/NOPE labels)
- Full TypeScript support
- Comprehensive documentation

### Performance
- Memoized gesture objects per Reanimated best practices
- All animations run on UI thread via worklets
- Uses `.get()`/`.set()` API for React Compiler compatibility
- Non-layout properties for optimal animation performance
