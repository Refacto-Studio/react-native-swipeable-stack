import React, { memo, forwardRef, useImperativeHandle, useCallback, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate, 
  Extrapolation,
} from 'react-native-reanimated';
import { SwipeableCard } from './SwipeableCard';
import type {
  SwipeableStackProps,
  SwipeableStackRef,
  SwipeDirection,
} from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

/**
 * SwipeableStack - Main component for a Tinder-like swipeable card stack
 * Matches the original HomeContent.tsx implementation
 */
function SwipeableStackComponent<T>(
  {
    data,
    renderCard,
    keyExtractor,
    onSwipeLeft,
    onSwipeRight,
    onSwipeComplete,
    onEmpty,
    onIndexChange,
    swipeThreshold = SCREEN_WIDTH * 0.3,
    velocityThreshold = 800,
    visibleCards = 2,
    animationConfig,
    maxRotation = 15,
    verticalSwipeFriction = 0.2,
    renderLeftOverlay,
    renderRightOverlay,
    overlayConfig = { inputRange: [0, 0.2], outputRange: [0, 1] },
    containerStyle,
    cardWrapperStyle,
    initialIndex = 0,
    disabled = false,
  }: SwipeableStackProps<T>,
  ref: React.ForwardedRef<SwipeableStackRef>
) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // Shared values for coordination (matches original)
  const currentSwipeX = useSharedValue(0);
  const manualTrigger = useSharedValue(0); // 0=idle, 1=right, -1=left
  const [swipeHistory, setSwipeHistory] = useState<SwipeDirection[]>([]);

  const handleSwipeComplete = useCallback((direction: SwipeDirection) => {
    // 1. Reset manual trigger immediately
    manualTrigger.value = 0;
    
    // 2. Get current item before incrementing
    const currentItem = data[currentIndex];
    
    // 3. Update index first so React renders new card immediately
    // The new SwipeableCard will mount with translateX=0 and sync to currentSwipeX
    // via useAnimatedReaction, so we DON'T reset currentSwipeX here
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // 4. Update history for undo
    setSwipeHistory(prev => [...prev, direction]);
    
    // 5. Call callbacks (after state update to not block re-render)
    if (direction === 'left' && onSwipeLeft && currentItem) {
      onSwipeLeft(currentItem, currentIndex);
    } else if (direction === 'right' && onSwipeRight && currentItem) {
      onSwipeRight(currentItem, currentIndex);
    }
    
    if (onSwipeComplete && currentItem) {
      onSwipeComplete(direction, currentItem, currentIndex);
    }
    
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
    
    // 6. Check if empty
    if (newIndex >= data.length && onEmpty) {
      onEmpty();
    }
  }, [currentIndex, data, onSwipeLeft, onSwipeRight, onSwipeComplete, onIndexChange, onEmpty, manualTrigger]);

  // Button actions
  const swipeLeft = useCallback(() => {
    manualTrigger.value = -1;
  }, [manualTrigger]);

  const swipeRight = useCallback(() => {
    manualTrigger.value = 1;
  }, [manualTrigger]);

  const undo = useCallback(() => {
    if (currentIndex > 0 && swipeHistory.length > 0) {
      setCurrentIndex(prev => prev - 1);
      setSwipeHistory(prev => prev.slice(0, -1));
    }
  }, [currentIndex, swipeHistory.length]);

  // Expose imperative methods via ref
  useImperativeHandle(ref, () => ({
    swipeLeft,
    swipeRight,
    undo,
    getCurrentIndex: () => currentIndex,
  }), [swipeLeft, swipeRight, undo, currentIndex]);

  // Next card animation (matches original exactly)
  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      Math.abs(currentSwipeX.value),
      [0, SCREEN_WIDTH],
      [0.92, 1],
      Extrapolation.CLAMP
    );
    
    const opacity = interpolate(
      Math.abs(currentSwipeX.value),
      [0, SCREEN_WIDTH * 0.5],
      [0.6, 1],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity,
      zIndex: 9,
    };
  });

  // Render overlays
  const leftOverlay = renderLeftOverlay?.();
  const rightOverlay = renderRightOverlay?.();

  // If empty, show nothing (parent handles via onEmpty callback)
  if (currentIndex >= data.length) {
    return (
      <GestureHandlerRootView style={[styles.container, containerStyle]}>
        {/* Empty state handled by parent */}
      </GestureHandlerRootView>
    );
  }

  const currentItem = data[currentIndex];
  const nextItem = data[currentIndex + 1];

  return (
    <GestureHandlerRootView style={[styles.container, containerStyle]}>
      <View style={styles.cardsContainer}>
        {/* Background Card */}
        {nextItem && visibleCards >= 2 && (
          <Animated.View
            key={keyExtractor(nextItem)}
            style={[styles.cardWrapper, cardWrapperStyle, nextCardStyle]}
          >
            {renderCard(nextItem, currentIndex + 1)}
          </Animated.View>
        )}

        {/* Top Card - Remounts on key change -> resets internal state */}
        {currentItem && (
          <SwipeableCard
            key={keyExtractor(currentItem)}
            onSwipeComplete={handleSwipeComplete}
            swipeProgress={currentSwipeX}
            manualTrigger={manualTrigger}
            swipeThreshold={swipeThreshold}
            velocityThreshold={velocityThreshold}
            maxRotation={maxRotation}
            verticalFriction={verticalSwipeFriction}
            animationConfig={animationConfig}
            leftOverlay={leftOverlay}
            rightOverlay={rightOverlay}
            overlayConfig={overlayConfig}
            disabled={disabled}
            style={cardWrapperStyle}
          >
            {renderCard(currentItem, currentIndex)}
          </SwipeableCard>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

// ForwardRef with generics
export const SwipeableStack = memo(forwardRef(SwipeableStackComponent)) as <T>(
  props: SwipeableStackProps<T> & { ref?: React.ForwardedRef<SwipeableStackRef> }
) => React.ReactElement | null;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
