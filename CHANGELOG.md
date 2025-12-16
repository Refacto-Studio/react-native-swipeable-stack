# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-12-16

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
