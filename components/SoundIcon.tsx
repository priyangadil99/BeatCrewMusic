import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sound } from '../constants/musicStyles';

interface SoundIconProps {
  sound: Sound;
  onDragEnd: (characterIndex: number | null) => void;
}

const CATEGORY_COLORS = {
  beat: '#ef4444',
  bass: '#f97316',
  instrument: '#06b6d4',
  fx: '#8b5cf6',
  vocal: '#ec4899',
};

export default function SoundIcon({ sound, onDragEnd }: SoundIconProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: CATEGORY_COLORS[sound.category] },
      ]}
      activeOpacity={0.8}
      onPress={() => {}}
    >
      <Text style={styles.emoji}>{sound.emoji}</Text>
      <Text style={styles.name}>{sound.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  name: {
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
});
