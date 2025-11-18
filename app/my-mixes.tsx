import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Play, Trash2 } from 'lucide-react-native';
import { loadMixes, deleteMix, Mix } from '../utils/storage';
import { format } from 'date-fns';

export default function MyMixesScreen() {
  const router = useRouter();
  const [mixes, setMixes] = useState<Mix[]>([]);

  useEffect(() => {
    loadSavedMixes();
  }, []);

  const loadSavedMixes = async () => {
    const savedMixes = await loadMixes();
    setMixes(savedMixes);
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      'Delete Mix',
      'Are you sure you want to delete this mix?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteMix(id);
            loadSavedMixes();
          },
        },
      ]
    );
  };

  const renderMixItem = ({ item }: { item: Mix }) => (
    <View style={styles.mixCard}>
      <View style={styles.mixInfo}>
        <Text style={styles.mixName}>{item.name}</Text>
        <Text style={styles.mixDate}>
          {format(new Date(item.createdAt), 'MMM dd, yyyy · HH:mm')}
        </Text>
        <Text style={styles.mixStyle}>{item.styleId}</Text>
      </View>
      <View style={styles.mixActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Play size={20} color="#6366f1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
          activeOpacity={0.7}
        >
          <Trash2 size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <Text style={styles.headerTitle}>My Mixes</Text>
      </View>

      {mixes.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No saved mixes yet</Text>
          <Text style={styles.emptyText}>
            Create and record your first mix to see it here!
          </Text>
        </View>
      ) : (
        <FlatList
          data={mixes}
          renderItem={renderMixItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  mixCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mixInfo: {
    flex: 1,
  },
  mixName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  mixDate: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#6b7280',
    marginBottom: 4,
  },
  mixStyle: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#6366f1',
    textTransform: 'capitalize',
  },
  mixActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
  },
});
