import { useCallback, useState, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import type { SwipeDirection, AnimationConfig } from '../types';

interface UseSwipeableStackOptions<T> {
  /** Data array */
  data: T[];
  /** Initial index (default: 0) */
  initialIndex?: number;
  /** Animation config */
  animationConfig?: AnimationConfig;
  /** Called when swiped left */
  onSwipeLeft?: (item: T, index: number) => void;
  /** Called when swiped right */
  onSwipeRight?: (item: T, index: number) => void;
  /** Called on any swipe completion */
  onSwipeComplete?: (direction: SwipeDirection, item: T, index: number) => void;
  /** Called when all cards are swiped */
  onEmpty?: () => void;
  /** Called when index changes */
  onIndexChange?: (index: number) => void;
}

/**
 * Hook for managing swipeable stack state with imperative controls.
 * Uses .value for compatibility with all Reanimated versions.
 */
export function useSwipeableStack<T>({
  data,
  initialIndex = 0,
  onSwipeLeft,
  onSwipeRight,
  onSwipeComplete,
  onEmpty,
  onIndexChange,
}: UseSwipeableStackOptions<T>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  
  // History for undo functionality
  const swipeHistory = useRef<Array<{ index: number; direction: SwipeDirection }>>([]);
  
  // Shared value for triggering programmatic swipes
  // -1 = trigger left, 0 = idle, 1 = trigger right
  const manualTrigger = useSharedValue(0);
  
  // Shared value to track current swipe progress (for next card animation)
  const swipeProgress = useSharedValue(0);

  /**
   * Handle swipe completion from the card component
   */
  const handleSwipeComplete = useCallback((direction: SwipeDirection) => {
    const item = data[currentIndex];
    if (!item) return;

    // Save to history for undo
    swipeHistory.current.push({ index: currentIndex, direction });
    
    // Reset manual trigger
    manualTrigger.value = 0;
    
    // Call direction-specific callback
    if (direction === 'left') {
      onSwipeLeft?.(item, currentIndex);
    } else {
      onSwipeRight?.(item, currentIndex);
    }
    
    // Call generic callback
    onSwipeComplete?.(direction, item, currentIndex);
    
    // Update index
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
    
    // Check if empty
    if (newIndex >= data.length) {
      onEmpty?.();
    }
  }, [currentIndex, data, onSwipeLeft, onSwipeRight, onSwipeComplete, onIndexChange, onEmpty, manualTrigger]);

  /**
   * Trigger a programmatic swipe to the left
   */
  const swipeLeft = useCallback(() => {
    if (currentIndex >= data.length) return;
    manualTrigger.value = -1;
  }, [currentIndex, data.length, manualTrigger]);

  /**
   * Trigger a programmatic swipe to the right
   */
  const swipeRight = useCallback(() => {
    if (currentIndex >= data.length) return;
    manualTrigger.value = 1;
  }, [currentIndex, data.length, manualTrigger]);

  /**
   * Undo the last swipe
   */
  const undo = useCallback(() => {
    const lastSwipe = swipeHistory.current.pop();
    if (!lastSwipe) return;
    
    const newIndex = lastSwipe.index;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [onIndexChange]);

  // Current and next items for rendering
  const currentItem = data[currentIndex];
  const nextItem = data[currentIndex + 1];
  const isEmpty = currentIndex >= data.length;

  return {
    // State
    currentIndex,
    currentItem,
    nextItem,
    isEmpty,
    
    // Actions
    swipeLeft,
    swipeRight,
    undo,
    handleSwipeComplete,
    
    // Shared values (for internal use by components)
    manualTrigger,
    swipeProgress,
    
    // History
    canUndo: swipeHistory.current.length > 0,
  };
}

export type { UseSwipeableStackOptions };
