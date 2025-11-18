import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { musicStyles } from '../constants/musicStyles';

const { width } = Dimensions.get('window');

export default function StyleSelectionScreen() {
  const router = useRouter();

  const handleStyleSelect = (styleId: string) => {
    router.push({
      pathname: '/mixer',
      params: { styleId },
    });
  };

  return (
    <LinearGradient
      colors={['#6366f1', '#8b5cf6', '#d946ef']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Your Style</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {musicStyles.map((style) => (
            <TouchableOpacity
              key={style.id}
              style={styles.styleCard}
              onPress={() => handleStyleSelect(style.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={style.gradient}
                style={styles.styleGradient}
              >
                <Text style={styles.styleEmoji}>{style.emoji}</Text>
                <Text style={styles.styleName}>{style.name}</Text>
                <Text style={styles.styleDescription}>{style.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  styleCard: {
    width: width > 768 ? (width - 80) / 3 : (width - 56) / 2,
    aspectRatio: 1,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  styleGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  styleEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  styleName: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  styleDescription: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
});
