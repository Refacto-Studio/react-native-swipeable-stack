import { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated';
import type { OverlayConfig } from '../types';

interface UseSwipeAnimationOptions {
  /** Shared value for X translation */
  translateX: SharedValue<number>;
  /** Shared value for Y translation */
  translateY: SharedValue<number>;
  /** Screen width for interpolation calculations */
  screenWidth: number;
  /** Maximum rotation angle in degrees */
  maxRotation: number;
  /** Overlay opacity configuration */
  overlayConfig: Required<OverlayConfig>;
}

/**
 * Hook that creates animated styles for card transformation and overlay opacity.
 * Uses .value for direct access (matches original implementation)
 */
export function useSwipeAnimation({
  translateX,
  translateY,
  screenWidth,
  maxRotation,
  overlayConfig,
}: UseSwipeAnimationOptions) {
  /**
   * Animated style for the card
   * Uses transform properties only (non-layout) for optimal performance
   */
  const animatedCardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-screenWidth, 0, screenWidth],
      [-maxRotation, 0, maxRotation],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
      zIndex: 10,
    };
  });

  /**
   * Animated style for right overlay (e.g., "LIKE" label)
   * Fades in as card moves right
   */
  const rightOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [0, screenWidth * 0.2],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  /**
   * Animated style for left overlay (e.g., "NOPE" label)
   * Fades in as card moves left
   */
  const leftOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value,
      [-screenWidth * 0.2, 0],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return {
    animatedCardStyle,
    rightOverlayStyle,
    leftOverlayStyle,
  };
}

interface UseNextCardAnimationOptions {
  /** Shared value tracking top card's X position */
  topCardTranslateX: SharedValue<number>;
  /** Screen width for interpolation */
  screenWidth: number;
  /** Minimum scale when card is behind (default: 0.92) */
  minScale?: number;
  /** Minimum opacity when card is behind (default: 0.6) */
  minOpacity?: number;
}

/**
 * Hook for animating the "next" card in the stack.
 * Scales up and increases opacity as the top card is swiped away.
 */
export function useNextCardAnimation({
  topCardTranslateX,
  screenWidth,
  minScale = 0.92,
  minOpacity = 0.6,
}: UseNextCardAnimationOptions) {
  const animatedNextCardStyle = useAnimatedStyle(() => {
    // Scale from minScale to 1 as top card moves away
    const scale = interpolate(
      Math.abs(topCardTranslateX.value),
      [0, screenWidth],
      [minScale, 1],
      Extrapolation.CLAMP
    );
    
    // Opacity from minOpacity to 1 as top card moves away
    const opacity = interpolate(
      Math.abs(topCardTranslateX.value),
      [0, screenWidth * 0.5],
      [minOpacity, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return { animatedNextCardStyle };
}
