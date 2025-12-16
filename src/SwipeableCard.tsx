import React, { memo, useCallback } from 'react';
import { StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedReaction,
  withTiming,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { useSwipeAnimation } from './hooks/useSwipeAnimation';
import type { SwipeDirection, AnimationConfig, OverlayConfig } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface SwipeableCardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  
  /** Callback when swipe completes */
  onSwipeComplete: (direction: SwipeDirection) => void;
  
  /** Shared value to sync swipe progress for next card animation */
  swipeProgress: SharedValue<number>;
  
  /** Shared value for manual trigger (-1 left, 0 idle, 1 right) */
  manualTrigger: SharedValue<number>;
  
  /** Swipe threshold in pixels */
  swipeThreshold?: number;
  
  /** Velocity threshold */
  velocityThreshold?: number;
  
  /** Maximum rotation in degrees */
  maxRotation?: number;
  
  /** Vertical movement friction (0-1) */
  verticalFriction?: number;
  
  /** Animation configuration */
  animationConfig?: AnimationConfig;
  
  /** Left overlay (e.g., "NOPE" label) */
  leftOverlay?: React.ReactNode;
  
  /** Right overlay (e.g., "LIKE" label) */
  rightOverlay?: React.ReactNode;
  
  /** Overlay opacity configuration */
  overlayConfig?: OverlayConfig;
  
  /** Whether gestures are disabled */
  disabled?: boolean;
  
  /** Card wrapper style */
  style?: ViewStyle;
}

/**
 * SwipeableCard - A single card with pan gesture and animations
 * Matches the original HomeContent.tsx TopCard implementation
 */
function SwipeableCardComponent({
  children,
  onSwipeComplete,
  swipeProgress,
  manualTrigger,
  swipeThreshold = SCREEN_WIDTH * 0.3,
  velocityThreshold = 800,
  maxRotation = 15,
  verticalFriction = 0.2,
  animationConfig,
  leftOverlay,
  rightOverlay,
  disabled = false,
  style,
}: SwipeableCardProps) {
  // Stable callback ref
  const handleSwipeComplete = useCallback((direction: SwipeDirection) => {
    onSwipeComplete(direction);
  }, [onSwipeComplete]);

  // Create gesture and get shared values
  const { gesture, translateX, translateY } = useSwipeGesture({
    swipeThreshold,
    velocityThreshold,
    screenWidth: SCREEN_WIDTH,
    verticalFriction,
    onSwipeComplete: handleSwipeComplete,
    disabled,
  });

  // Sync local translateX to parent swipeProgress for next card animation
  useAnimatedReaction(
    () => translateX.value,
    (currentX) => {
      swipeProgress.value = currentX;
    }
  );

  // Listen for manual trigger (button-triggered swipes)
  useAnimatedReaction(
    () => manualTrigger.value,
    (triggerValue) => {
      if (triggerValue !== 0) {
        const targetX = triggerValue * SCREEN_WIDTH * 1.5;
        const duration = animationConfig?.programmaticTiming?.duration ?? 200;
        
        translateX.value = withTiming(targetX, { duration }, () => {
          'worklet';
          const direction: SwipeDirection = triggerValue > 0 ? 'right' : 'left';
          runOnJS(handleSwipeComplete)(direction);
        });
      }
    }
  );

  // Get animated styles
  const { animatedCardStyle, leftOverlayStyle, rightOverlayStyle } = useSwipeAnimation({
    translateX,
    translateY,
    screenWidth: SCREEN_WIDTH,
    maxRotation,
    overlayConfig: {
      inputRange: [0, SCREEN_WIDTH * 0.2],
      outputRange: [0, 1],
    },
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cardWrapper, style, animatedCardStyle]}>
        {children}
        
        {/* Right overlay (LIKE) - shows when swiping right */}
        {rightOverlay && (
          <Animated.View style={[styles.overlayContainer, styles.rightOverlay, rightOverlayStyle]}>
            {rightOverlay}
          </Animated.View>
        )}
        
        {/* Left overlay (NOPE) - shows when swiping left */}
        {leftOverlay && (
          <Animated.View style={[styles.overlayContainer, styles.leftOverlay, leftOverlayStyle]}>
            {leftOverlay}
          </Animated.View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}

// Simple memo - no custom comparison needed
export const SwipeableCard = memo(SwipeableCardComponent);

const styles = StyleSheet.create({
  cardWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 100,
  },
  leftOverlay: {
    right: 40,
  },
  rightOverlay: {
    left: 40,
  },
});

export type { SwipeableCardProps };
