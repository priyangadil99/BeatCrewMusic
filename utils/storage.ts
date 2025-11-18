import AsyncStorage from '@react-native-async-storage/async-storage';

const MIXES_KEY = '@beatcrew_mixes';

export interface Mix {
  id: string;
  name: string;
  styleId: string;
  recordedActions: any[];
  characterSounds: (string | null)[];
  createdAt: string;
}

export async function saveMix(mixData: Omit<Mix, 'id' | 'createdAt'>): Promise<void> {
  try {
    const mixes = await loadMixes();
    const newMix: Mix = {
      ...mixData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    mixes.push(newMix);
    await AsyncStorage.setItem(MIXES_KEY, JSON.stringify(mixes));
  } catch (error) {
    console.error('Error saving mix:', error);
  }
}

export async function loadMixes(): Promise<Mix[]> {
  try {
    const data = await AsyncStorage.getItem(MIXES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading mixes:', error);
    return [];
  }
}

export async function deleteMix(id: string): Promise<void> {
  try {
    const mixes = await loadMixes();
    const filteredMixes = mixes.filter((mix) => mix.id !== id);
    await AsyncStorage.setItem(MIXES_KEY, JSON.stringify(filteredMixes));
  } catch (error) {
    console.error('Error deleting mix:', error);
  }
}
