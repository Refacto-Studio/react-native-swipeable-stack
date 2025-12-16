import { Gesture } from 'react-native-gesture-handler';
import {
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import type { SwipeDirection } from '../types';

interface UseSwipeGestureOptions {
  /** Threshold distance to trigger swipe */
  swipeThreshold: number;
  /** Velocity threshold to trigger swipe */
  velocityThreshold: number;
  /** Screen width for exit animation */
  screenWidth: number;
  /** Friction for vertical movement (0-1) */
  verticalFriction: number;
  /** Called when swipe completes */
  onSwipeComplete: (direction: SwipeDirection) => void;
  /** Whether gestures are disabled */
  disabled?: boolean;
}

/**
 * Hook that creates a pan gesture for swipeable cards.
 * Uses .value for direct access (more compatible with all Reanimated versions)
 */
export function useSwipeGesture({
  swipeThreshold,
  velocityThreshold,
  screenWidth,
  verticalFriction,
  onSwipeComplete,
  disabled = false,
}: UseSwipeGestureOptions) {
  // Shared values for translation
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Create gesture - NOT memoized to ensure it always has fresh refs
  // This matches the original working implementation
  const gesture = Gesture.Pan()
    .enabled(!disabled)
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;
      translateY.value = event.translationY * verticalFriction;
    })
    .onEnd((event) => {
      'worklet';
      const absTranslation = Math.abs(event.translationX);
      const absVelocity = Math.abs(event.velocityX);
      
      // Check if swipe threshold is met
      if (absTranslation > swipeThreshold || absVelocity > velocityThreshold) {
        const direction = event.translationX > 0 ? 1 : -1;
        const targetX = direction * screenWidth * 1.5;
        
        // Use withTiming for faster callback (callback fires after animation duration)
        // This is much faster than withSpring which waits for spring to settle
        translateX.value = withTiming(
          targetX,
          { duration: 250 },
          () => {
            'worklet';
            runOnJS(onSwipeComplete)(direction > 0 ? 'right' : 'left');
          }
        );
      } else {
        // Return to center with spring for nice feel
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  return {
    gesture,
    translateX,
    translateY,
  };
}

export function triggerProgrammaticSwipe() {
  // Placeholder - not used in current implementation
}
