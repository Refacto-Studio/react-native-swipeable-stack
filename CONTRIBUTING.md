# Contributing to react-native-swipeable-stack

Thanks for your interest in contributing! 🎉

## Development Setup

```bash
# Clone the repo
git clone https://github.com/Refacto-Studio/react-native-swipeable-stack.git
cd react-native-swipeable-stack

# Install dependencies
yarn install

# Build the library
yarn prepare

# Run the example app
cd example
yarn install
yarn start
```

## Project Structure

```
├── src/                  # Library source code
│   ├── SwipeableStack.tsx
│   ├── SwipeableCard.tsx
│   ├── hooks/
│   └── types/
├── example/              # Example app for testing
├── docs/                 # VitePress documentation
└── lib/                  # Build output (generated)
```

## Making Changes

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make your changes** and test them in the example app

3. **Run checks**:
   ```bash
   yarn typescript  # Type check
   yarn prepare     # Build
   ```

4. **Commit** with a descriptive message:
   ```bash
   git commit -m "feat: add vertical swipe support"
   ```

   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat:` new feature
   - `fix:` bug fix
   - `docs:` documentation
   - `refactor:` code refactoring
   - `perf:` performance improvement
   - `test:` adding tests
   - `chore:` maintenance

5. **Push** and open a PR

## Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Add JSDoc comments for public APIs
- Use meaningful variable names
- Keep functions small and focused

## Performance Guidelines

Since this is an animation library, performance is critical:

- ✅ Run animations on UI thread (worklets)
- ✅ Use `useMemo` for gesture objects
- ✅ Use `Extrapolation.CLAMP` for interpolations
- ✅ Minimize re-renders with `memo`
- ❌ Don't call JS functions in worklets without `runOnJS`
- ❌ Don't use layout props (`top`, `left`) for animations

## Questions?

Open a [Discussion](https://github.com/Refacto-Studio/react-native-swipeable-stack/discussions) or reach out!
