export interface Sound {
  id: string;
  name: string;
  category: 'beat' | 'bass' | 'instrument' | 'fx' | 'vocal';
  emoji: string;
}

export interface MusicStyle {
  id: string;
  name: string;
  description: string;
  emoji: string;
  gradient: string[];
  sounds: Sound[];
}

export const musicStyles: MusicStyle[] = [
  {
    id: 'hip-hop',
    name: 'Hip-Hop',
    description: 'Urban beats',
    emoji: '🎤',
    gradient: ['#f59e0b', '#f97316', '#dc2626'],
    sounds: [
      { id: 'hh-beat-1', name: 'Kick', category: 'beat', emoji: '🥁' },
      { id: 'hh-beat-2', name: 'Snare', category: 'beat', emoji: '🪘' },
      { id: 'hh-beat-3', name: 'Hi-Hat', category: 'beat', emoji: '🎯' },
      { id: 'hh-bass-1', name: '808 Bass', category: 'bass', emoji: '🔊' },
      { id: 'hh-inst-1', name: 'Piano', category: 'instrument', emoji: '🎹' },
      { id: 'hh-fx-1', name: 'Scratch', category: 'fx', emoji: '⚡' },
      { id: 'hh-vocal-1', name: 'Rap', category: 'vocal', emoji: '🎙️' },
      { id: 'hh-vocal-2', name: 'Ad-lib', category: 'vocal', emoji: '💬' },
    ],
  },
  {
    id: 'electro',
    name: 'Electro',
    description: 'Electronic vibes',
    emoji: '⚡',
    gradient: ['#06b6d4', '#3b82f6', '#6366f1'],
    sounds: [
      { id: 'el-beat-1', name: 'Kick', category: 'beat', emoji: '💥' },
      { id: 'el-beat-2', name: 'Clap', category: 'beat', emoji: '👏' },
      { id: 'el-bass-1', name: 'Sub Bass', category: 'bass', emoji: '🌊' },
      { id: 'el-inst-1', name: 'Synth', category: 'instrument', emoji: '🎛️' },
      { id: 'el-inst-2', name: 'Arp', category: 'instrument', emoji: '✨' },
      { id: 'el-fx-1', name: 'Riser', category: 'fx', emoji: '📈' },
      { id: 'el-fx-2', name: 'Drop', category: 'fx', emoji: '💫' },
      { id: 'el-vocal-1', name: 'Vocal Chop', category: 'vocal', emoji: '🎵' },
    ],
  },
  {
    id: 'pop',
    name: 'Pop',
    description: 'Catchy melodies',
    emoji: '🎵',
    gradient: ['#ec4899', '#d946ef', '#a855f7'],
    sounds: [
      { id: 'pop-beat-1', name: 'Kick', category: 'beat', emoji: '🥁' },
      { id: 'pop-beat-2', name: 'Snare', category: 'beat', emoji: '🪘' },
      { id: 'pop-bass-1', name: 'Bass', category: 'bass', emoji: '🎸' },
      { id: 'pop-inst-1', name: 'Guitar', category: 'instrument', emoji: '🎸' },
      { id: 'pop-inst-2', name: 'Keys', category: 'instrument', emoji: '🎹' },
      { id: 'pop-fx-1', name: 'Clap', category: 'fx', emoji: '👏' },
      { id: 'pop-vocal-1', name: 'Chorus', category: 'vocal', emoji: '🎤' },
      { id: 'pop-vocal-2', name: 'Harmony', category: 'vocal', emoji: '🎶' },
    ],
  },
  {
    id: 'jazz',
    name: 'Jazz',
    description: 'Smooth grooves',
    emoji: '🎷',
    gradient: ['#eab308', '#f59e0b', '#d97706'],
    sounds: [
      { id: 'jazz-beat-1', name: 'Brush', category: 'beat', emoji: '🥁' },
      { id: 'jazz-beat-2', name: 'Ride', category: 'beat', emoji: '🎯' },
      { id: 'jazz-bass-1', name: 'Upright', category: 'bass', emoji: '🎻' },
      { id: 'jazz-inst-1', name: 'Piano', category: 'instrument', emoji: '🎹' },
      { id: 'jazz-inst-2', name: 'Sax', category: 'instrument', emoji: '🎷' },
      { id: 'jazz-inst-3', name: 'Trumpet', category: 'instrument', emoji: '🎺' },
      { id: 'jazz-fx-1', name: 'Snap', category: 'fx', emoji: '👌' },
      { id: 'jazz-vocal-1', name: 'Scat', category: 'vocal', emoji: '🎵' },
    ],
  },
  {
    id: 'latin',
    name: 'Latin',
    description: 'Spicy rhythms',
    emoji: '💃',
    gradient: ['#ef4444', '#f97316', '#fb923c'],
    sounds: [
      { id: 'lat-beat-1', name: 'Conga', category: 'beat', emoji: '🪘' },
      { id: 'lat-beat-2', name: 'Bongo', category: 'beat', emoji: '🥁' },
      { id: 'lat-bass-1', name: 'Bass', category: 'bass', emoji: '🎸' },
      { id: 'lat-inst-1', name: 'Guitar', category: 'instrument', emoji: '🎸' },
      { id: 'lat-inst-2', name: 'Horns', category: 'instrument', emoji: '🎺' },
      { id: 'lat-fx-1', name: 'Maracas', category: 'fx', emoji: '🪇' },
      { id: 'lat-fx-2', name: 'Whistle', category: 'fx', emoji: '🎵' },
      { id: 'lat-vocal-1', name: 'Chorus', category: 'vocal', emoji: '🎤' },
    ],
  },
  {
    id: 'rock',
    name: 'Rock',
    description: 'Power chords',
    emoji: '🎸',
    gradient: ['#78716c', '#57534e', '#44403c'],
    sounds: [
      { id: 'rock-beat-1', name: 'Kick', category: 'beat', emoji: '🥁' },
      { id: 'rock-beat-2', name: 'Snare', category: 'beat', emoji: '🪘' },
      { id: 'rock-bass-1', name: 'Bass', category: 'bass', emoji: '🎸' },
      { id: 'rock-inst-1', name: 'Guitar', category: 'instrument', emoji: '🎸' },
      { id: 'rock-inst-2', name: 'Lead', category: 'instrument', emoji: '⚡' },
      { id: 'rock-fx-1', name: 'Crash', category: 'fx', emoji: '💥' },
      { id: 'rock-vocal-1', name: 'Scream', category: 'vocal', emoji: '🎤' },
      { id: 'rock-vocal-2', name: 'Backup', category: 'vocal', emoji: '🎶' },
    ],
  },
];
