import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Music, List } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#d946ef']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Music size={80} color="#fff" strokeWidth={2.5} />
          <Text style={styles.title}>BeatCrew</Text>
          <Text style={styles.subtitle}>Music</Text>
          <Text style={styles.tagline}>Create Your Sound</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.push('/style-selection')}
            activeOpacity={0.8}
          >
            <Music size={24} color="#6366f1" />
            <Text style={styles.primaryButtonText}>Start Mixing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/my-mixes')}
            activeOpacity={0.8}
          >
            <List size={24} color="#fff" />
            <Text style={styles.secondaryButtonText}>My Mixes</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Tap to begin your musical journey</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title: {
    fontSize: 56,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginTop: 20,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 32,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
    opacity: 0.9,
    marginTop: -8,
  },
  tagline: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.8,
    marginTop: 12,
    letterSpacing: 2,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#6366f1',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#fff',
  },
  footer: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.7,
    marginTop: 40,
  },
});
