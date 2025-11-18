import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Play, Pause, Circle, Settings } from 'lucide-react-native';
import { musicStyles } from '../constants/musicStyles';
import Character from '../components/Character';
import SoundIcon from '../components/SoundIcon';
import RecordingModal from '../components/RecordingModal';
import { AudioManager } from '../utils/AudioManager';

const { width } = Dimensions.get('window');
const NUM_CHARACTERS = 7;

interface CharacterSound {
  characterIndex: number;
  soundId: string;
}

export default function MixerScreen() {
  const router = useRouter();
  const { styleId } = useLocalSearchParams<{ styleId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [characterSounds, setCharacterSounds] = useState<(string | null)[]>(
    Array(NUM_CHARACTERS).fill(null)
  );
  const [autoMode, setAutoMode] = useState(false);
  const [recordedActions, setRecordedActions] = useState<any[]>([]);
  const recordingStartTime = useRef<number>(0);
  const autoModeInterval = useRef<NodeJS.Timeout | null>(null);

  const style = musicStyles.find((s) => s.id === styleId) || musicStyles[0];
  const audioManager = useRef(new AudioManager()).current;

  useEffect(() => {
    return () => {
      audioManager.cleanup();
      if (autoModeInterval.current) {
        clearInterval(autoModeInterval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (autoMode) {
      autoModeInterval.current = setInterval(() => {
        const randomCharIndex = Math.floor(Math.random() * NUM_CHARACTERS);
        const randomAction = Math.random();
        
        if (randomAction > 0.5) {
          const randomSound = style.sounds[Math.floor(Math.random() * style.sounds.length)];
          handleSoundAssign(randomCharIndex, randomSound.id);
        } else {
          handleSoundAssign(randomCharIndex, null);
        }
      }, 2000);
    } else {
      if (autoModeInterval.current) {
        clearInterval(autoModeInterval.current);
        autoModeInterval.current = null;
      }
    }

    return () => {
      if (autoModeInterval.current) {
        clearInterval(autoModeInterval.current);
      }
    };
  }, [autoMode]);

  const handleSoundAssign = (characterIndex: number, soundId: string | null) => {
    const newSounds = [...characterSounds];
    const oldSound = newSounds[characterIndex];
    newSounds[characterIndex] = soundId;
    setCharacterSounds(newSounds);

    if (isPlaying) {
      if (oldSound) {
        audioManager.stopSound(oldSound);
      }
      if (soundId) {
        audioManager.playSound(soundId);
      }
    }

    if (isRecording && recordingStartTime.current > 0) {
      const timestamp = Date.now() - recordingStartTime.current;
      setRecordedActions((prev) => [
        ...prev,
        { timestamp, characterIndex, soundId },
      ]);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioManager.stopAll();
      setIsPlaying(false);
    } else {
      characterSounds.forEach((soundId) => {
        if (soundId) {
          audioManager.playSound(soundId);
        }
      });
      setIsPlaying(true);
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      audioManager.stopAll();
      setIsPlaying(false);
      setIsRecording(false);
      setShowRecordingModal(true);
    } else {
      setRecordedActions([]);
      recordingStartTime.current = Date.now();
      setIsRecording(true);
      setIsPlaying(true);
      characterSounds.forEach((soundId) => {
        if (soundId) {
          audioManager.playSound(soundId);
        }
      });
    }
  };

  const handleSaveRecording = () => {
    setShowRecordingModal(false);
  };

  return (
    <LinearGradient colors={style.gradient} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{style.name}</Text>
          <Text style={styles.headerSubtitle}>{style.description}</Text>
        </View>
        <TouchableOpacity
          style={[styles.autoButton, autoMode && styles.autoButtonActive]}
          onPress={() => setAutoMode(!autoMode)}
          activeOpacity={0.7}
        >
          <Settings size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.charactersContainer}>
          <Text style={styles.sectionTitle}>Characters</Text>
          <View style={styles.charactersRow}>
            {Array.from({ length: NUM_CHARACTERS }).map((_, index) => (
              <Character
                key={index}
                index={index}
                isActive={!!characterSounds[index] && isPlaying}
                soundId={characterSounds[index]}
                onClear={() => handleSoundAssign(index, null)}
              />
            ))}
          </View>
        </View>

        <View style={styles.soundsContainer}>
          <Text style={styles.sectionTitle}>Sound Library</Text>
          <View style={styles.soundsGrid}>
            {style.sounds.map((sound) => (
              <SoundIcon
                key={sound.id}
                sound={sound}
                onDragEnd={(characterIndex) => {
                  if (characterIndex !== null) {
                    handleSoundAssign(characterIndex, sound.id);
                  }
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, isPlaying && styles.controlButtonActive]}
          onPress={handlePlayPause}
          activeOpacity={0.8}
        >
          {isPlaying ? (
            <Pause size={28} color="#fff" fill="#fff" />
          ) : (
            <Play size={28} color="#fff" fill="#fff" />
          )}
          <Text style={styles.controlButtonText}>
            {isPlaying ? 'Pause' : 'Play'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.recordButton, isRecording && styles.recordingActive]}
          onPress={handleRecord}
          activeOpacity={0.8}
        >
          <Circle size={24} color="#fff" fill={isRecording ? '#ef4444' : 'transparent'} />
          <Text style={styles.controlButtonText}>
            {isRecording ? 'Stop' : 'Record'}
          </Text>
        </TouchableOpacity>
      </View>

      <RecordingModal
        visible={showRecordingModal}
        onClose={() => setShowRecordingModal(false)}
        onSave={handleSaveRecording}
        recordedActions={recordedActions}
        characterSounds={characterSounds}
        styleId={styleId || 'hip-hop'}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.8,
    marginTop: 2,
  },
  autoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  autoButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  charactersContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginBottom: 16,
  },
  charactersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  soundsContainer: {
    marginBottom: 32,
  },
  soundsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  controls: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    gap: 8,
  },
  controlButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  recordButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.3)',
  },
  recordingActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.5)',
  },
  controlButtonText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
});
