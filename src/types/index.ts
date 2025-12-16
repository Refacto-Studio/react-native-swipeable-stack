import type { ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';

/**
 * Direction of the swipe action
 */
export type SwipeDirection = 'left' | 'right';

/**
 * Configuration for spring animations
 */
export interface SpringConfig {
  /** Stiffness of the spring. Higher = faster, snappier. Default: 200 */
  stiffness?: number;
  /** Damping factor. Higher = less oscillation. Default: 20 */
  damping?: number;
  /** Mass of the animated object. Lower = faster. Default: 0.5 */
  mass?: number;
  /** Initial velocity. Usually from gesture. Default: 0 */
  velocity?: number;
}

/**
 * Configuration for timing animations
 */
export interface TimingConfig {
  /** Duration in milliseconds. Default: 200 */
  duration?: number;
}

/**
 * Animation configuration for various swipe states
 */
export interface AnimationConfig {
  /** Spring config for swipe-out animation */
  swipeSpring?: SpringConfig;
  /** Spring config for return-to-center animation */
  returnSpring?: SpringConfig;
  /** Timing config for programmatic swipe */
  programmaticTiming?: TimingConfig;
  /** Spring config for next card reveal animation */
  nextCardSpring?: SpringConfig;
}

/**
 * Configuration for overlay opacity animation
 */
export interface OverlayConfig {
  /** Input range for opacity interpolation. Default: [0, screenWidth * 0.2] */
  inputRange?: [number, number];
  /** Output range for opacity. Default: [0, 1] */
  outputRange?: [number, number];
}

/**
 * Ref handle for imperative control of the stack
 */
export interface SwipeableStackRef {
  /** Programmatically swipe the top card to the left */
  swipeLeft: () => void;
  /** Programmatically swipe the top card to the right */
  swipeRight: () => void;
  /** Undo the last swipe (go back to previous card) */
  undo: () => void;
  /** Get the current card index */
  getCurrentIndex: () => number;
}

/**
 * Props for the SwipeableStack component
 */
export interface SwipeableStackProps<T> {
  /** Array of data items to display */
  data: T[];
  
  /** Render function for each card */
  renderCard: (item: T, index: number) => React.ReactNode;
  
  /** Key extractor for React list optimization */
  keyExtractor: (item: T) => string;
  
  // --- Callbacks ---
  
  /** Called when a card is swiped left */
  onSwipeLeft?: (item: T, index: number) => void;
  
  /** Called when a card is swiped right */
  onSwipeRight?: (item: T, index: number) => void;
  
  /** Called when swipe gesture starts */
  onSwipeStart?: (direction: SwipeDirection) => void;
  
  /** Called when swipe animation completes */
  onSwipeComplete?: (direction: SwipeDirection, item: T, index: number) => void;
  
  /** Called when all cards have been swiped */
  onEmpty?: () => void;
  
  /** Called when index changes (including undo) */
  onIndexChange?: (index: number) => void;
  
  // --- Configuration ---
  
  /** Distance threshold to trigger swipe (default: 30% of screen width) */
  swipeThreshold?: number;
  
  /** Velocity threshold to trigger swipe (default: 800) */
  velocityThreshold?: number;
  
  /** Number of cards visible in the stack (default: 2) */
  visibleCards?: number;
  
  /** Animation configuration */
  animationConfig?: AnimationConfig;
  
  /** Maximum rotation angle in degrees (default: 15) */
  maxRotation?: number;
  
  /** Horizontal friction for Y translation (default: 0.2) */
  verticalSwipeFriction?: number;
  
  // --- Overlays ---
  
  /** Custom left overlay (e.g., "NOPE" label) */
  renderLeftOverlay?: () => React.ReactNode;
  
  /** Custom right overlay (e.g., "LIKE" label) */
  renderRightOverlay?: () => React.ReactNode;
  
  /** Overlay opacity configuration */
  overlayConfig?: OverlayConfig;
  
  // --- Styling ---
  
  /** Container style */
  containerStyle?: ViewStyle;
  
  /** Card wrapper style */
  cardWrapperStyle?: ViewStyle;
  
  /** Initial index (default: 0) */
  initialIndex?: number;
  
  /** Disable swipe gestures */
  disabled?: boolean;
}

/**
 * Internal props for SwipeableCard component
 */
export interface SwipeableCardProps {
  /** Content to render inside the card */
  children: React.ReactNode;
  
  /** Callback when swipe completes */
  onSwipeComplete: (direction: SwipeDirection) => void;
  
  /** Shared value for progress tracking (for next card animation) */
  swipeProgress: SharedValue<number>;
  
  /** Shared value for manual trigger (-1 left, 0 idle, 1 right) */
  manualTrigger: SharedValue<number>;
  
  /** Animation configuration */
  animationConfig?: AnimationConfig;
  
  /** Swipe threshold in pixels */
  swipeThreshold: number;
  
  /** Velocity threshold */
  velocityThreshold: number;
  
  /** Maximum rotation */
  maxRotation: number;
  
  /** Vertical friction */
  verticalSwipeFriction: number;
  
  /** Screen width for calculations */
  screenWidth: number;
  
  /** Left overlay content */
  leftOverlay?: React.ReactNode;
  
  /** Right overlay content */
  rightOverlay?: React.ReactNode;
  
  /** Overlay configuration */
  overlayConfig: OverlayConfig;
  
  /** Whether gestures are disabled */
  disabled?: boolean;
  
  /** Card wrapper style */
  style?: ViewStyle;
}

/**
 * Return type for useSwipeGesture hook
 */
export interface UseSwipeGestureReturn {
  /** The pan gesture object */
  gesture: ReturnType<typeof import('react-native-gesture-handler').Gesture.Pan>;
  /** Animated X translation */
  translateX: SharedValue<number>;
  /** Animated Y translation */
  translateY: SharedValue<number>;
}

/**
 * Return type for useSwipeAnimation hook
 */
export interface UseSwipeAnimationReturn {
  /** Animated style for the card */
  animatedCardStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;
  /** Animated style for left overlay opacity */
  leftOverlayStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;
  /** Animated style for right overlay opacity */
  rightOverlayStyle: ReturnType<typeof import('react-native-reanimated').useAnimatedStyle>;
}

/**
 * Return type for useSwipeableStack hook (imperative API)
 */
export interface UseSwipeableStackReturn<T> {
  /** Current index in the data array */
  currentIndex: number;
  /** Current visible item */
  currentItem: T | undefined;
  /** Next visible item */
  nextItem: T | undefined;
  /** Swipe left programmatically */
  swipeLeft: () => void;
  /** Swipe right programmatically */
  swipeRight: () => void;
  /** Undo last swipe */
  undo: () => void;
  /** Whether the stack is empty */
  isEmpty: boolean;
}

/**
 * Default values for configuration
 */
export const DEFAULT_CONFIG = {
  swipeThreshold: 0.3, // 30% of screen width
  velocityThreshold: 800,
  visibleCards: 2,
  maxRotation: 15,
  verticalSwipeFriction: 0.2,
  initialIndex: 0,
  animationConfig: {
    swipeSpring: {
      stiffness: 200,
      damping: 20,
      mass: 0.5,
    },
    returnSpring: {
      stiffness: 300,
      damping: 30,
    },
    programmaticTiming: {
      duration: 200,
    },
    nextCardSpring: {
      stiffness: 100,
      damping: 15,
    },
  },
  overlayConfig: {
    inputRange: [0, 0.2] as [number, number], // Will be multiplied by screenWidth at runtime
    outputRange: [0, 1] as [number, number],
  },
} as const;
