/**
 * Example App for react-native-swipeable-stack
 * 
 * This demonstrates all major features of the library:
 * - Basic swipe gestures
 * - Custom overlays
 * - Imperative controls (buttons)
 * - Undo functionality
 * - Empty state
 */

import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SwipeableStack, SwipeableStackRef } from '../src';

// Sample data
interface CardItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

const SAMPLE_DATA: CardItem[] = [
  {
    id: '1',
    title: 'The Great Pyramid',
    subtitle: 'Built in 2560 BCE, it was the tallest structure on Earth for 3,800 years.',
    image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800',
    color: '#F59E0B',
  },
  {
    id: '2',
    title: 'Deep Ocean',
    subtitle: 'More people have been to space than the deepest parts of the ocean.',
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
    color: '#3B82F6',
  },
  {
    id: '3',
    title: 'Northern Lights',
    subtitle: 'Aurora Borealis is caused by solar wind particles hitting the atmosphere.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
    color: '#10B981',
  },
  {
    id: '4',
    title: 'Mars Rover',
    subtitle: 'Perseverance has been exploring Mars since February 2021.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800',
    color: '#EF4444',
  },
  {
    id: '5',
    title: 'Ancient Rome',
    subtitle: 'At its peak, Rome had over 1 million inhabitants.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    color: '#8B5CF6',
  },
];

// Card Component
const Card = ({ item }: { item: CardItem }) => (
  <View style={[styles.card, { backgroundColor: item.color }]}>
    <Image
      source={{ uri: item.image }}
      style={styles.cardImage}
      resizeMode="cover"
    />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
    </View>
  </View>
);

// Action Button Component
const ActionButton = ({
  onPress,
  icon,
  color,
  size = 'medium',
}: {
  onPress: () => void;
  icon: string;
  color: string;
  size?: 'small' | 'medium';
}) => (
  <TouchableOpacity
    style={[
      styles.actionButton,
      size === 'small' ? styles.actionButtonSmall : styles.actionButtonMedium,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[styles.actionIcon, { color }]}>{icon}</Text>
  </TouchableOpacity>
);

// Empty State Component
const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>🎉</Text>
    <Text style={styles.emptyTitle}>All Done!</Text>
    <Text style={styles.emptySubtitle}>You've seen all the cards</Text>
    <TouchableOpacity style={styles.resetButton} onPress={onReset}>
      <Text style={styles.resetButtonText}>Start Over</Text>
    </TouchableOpacity>
  </View>
);

export default function App() {
  const stackRef = useRef<SwipeableStackRef>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [key, setKey] = useState(0); // For resetting the stack

  const handleSwipeRight = useCallback((item: CardItem) => {
    console.log('💚 Liked:', item.title);
  }, []);

  const handleSwipeLeft = useCallback((item: CardItem) => {
    console.log('❌ Nope:', item.title);
  }, []);

  const handleEmpty = useCallback(() => {
    setIsEmpty(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsEmpty(false);
    setKey(prev => prev + 1); // Remount the stack
  }, []);

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <EmptyState onReset={handleReset} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
      </View>

      {/* Swipeable Stack */}
      <SwipeableStack
        key={key}
        ref={stackRef}
        data={SAMPLE_DATA}
        keyExtractor={(item) => item.id}
        renderCard={(item) => <Card item={item} />}
        onSwipeRight={handleSwipeRight}
        onSwipeLeft={handleSwipeLeft}
        onEmpty={handleEmpty}
        swipeThreshold={120}
        velocityThreshold={800}
        maxRotation={12}
        renderRightOverlay={() => (
          <View style={styles.overlayLike}>
            <Text style={styles.overlayTextLike}>LIKE</Text>
          </View>
        )}
        renderLeftOverlay={() => (
          <View style={styles.overlayNope}>
            <Text style={styles.overlayTextNope}>NOPE</Text>
          </View>
        )}
        containerStyle={styles.stackContainer}
      />

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <ActionButton
          icon="↩"
          color="#64748B"
          size="small"
          onPress={() => stackRef.current?.undo()}
        />
        <ActionButton
          icon="✕"
          color="#EF4444"
          onPress={() => stackRef.current?.swipeLeft()}
        />
        <ActionButton
          icon="♥"
          color="#EC4899"
          onPress={() => stackRef.current?.swipeRight()}
        />
        <ActionButton
          icon="★"
          color="#6366F1"
          size="small"
          onPress={() => console.log('Bookmark!')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E293B',
  },
  stackContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    width: '90%',
    height: '85%',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardImage: {
    flex: 1,
    width: '100%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 22,
  },
  overlayLike: {
    borderWidth: 4,
    borderColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ rotate: '-20deg' }],
  },
  overlayTextLike: {
    fontSize: 36,
    fontWeight: '800',
    color: '#22C55E',
  },
  overlayNope: {
    borderWidth: 4,
    borderColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transform: [{ rotate: '20deg' }],
  },
  overlayTextNope: {
    fontSize: 36,
    fontWeight: '800',
    color: '#EF4444',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  actionButtonMedium: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  actionIcon: {
    fontSize: 28,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 32,
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
