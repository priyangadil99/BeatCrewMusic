export class AudioManager {
  private sounds: Map<string, any> = new Map();
  private isInitialized: boolean = false;

  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  async playSound(soundId: string) {
    console.log('Playing sound:', soundId);
  }

  async stopSound(soundId: string) {
    console.log('Stopping sound:', soundId);
  }

  async stopAll() {
    console.log('Stopping all sounds');
  }

  cleanup() {
    this.sounds.clear();
    this.isInitialized = false;
  }
}
