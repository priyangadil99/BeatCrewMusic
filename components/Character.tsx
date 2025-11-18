import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { X } from 'lucide-react-native';

interface CharacterProps {
  index: number;
  isActive: boolean;
  soundId: string | null;
  onClear: () => void;
}

const CHARACTER_EMOJIS = ['🎤', '🎸', '🥁', '🎹', '🎺', '🎷', '🎻'];
const CHARACTER_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
];

export default function Character({ index, isActive, soundId, onClear }: CharacterProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isActive) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: 300, easing: Easing.ease }),
          withTiming(1, { duration: 300, easing: Easing.ease })
        ),
        -1,
        false
      );
      rotation.value = withRepeat(
        withSequence(
          withTiming(-5, { duration: 200, easing: Easing.ease }),
          withTiming(5, { duration: 400, easing: Easing.ease }),
          withTiming(0, { duration: 200, easing: Easing.ease })
        ),
        -1,
        false
      );
    } else {
      scale.value = withTiming(1, { duration: 300 });
      rotation.value = withTiming(0, { duration: 300 });
    }
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.character,
          { backgroundColor: CHARACTER_COLORS[index % CHARACTER_COLORS.length] },
          isActive && styles.characterActive,
          animatedStyle,
        ]}
      >
        <Text style={styles.emoji}>{CHARACTER_EMOJIS[index % CHARACTER_EMOJIS.length]}</Text>
        {soundId && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={onClear}
            activeOpacity={0.7}
          >
            <X size={12} color="#fff" strokeWidth={3} />
          </TouchableOpacity>
        )}
      </Animated.View>
      {soundId && <View style={styles.indicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 6,
  },
  character: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  characterActive: {
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  emoji: {
    fontSize: 32,
  },
  clearButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ef4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
  },
});
