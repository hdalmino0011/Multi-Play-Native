/**
 * High-performance, offline-first Web Audio synthesis engine for Multi Play!
 * Provides custom synthesized sounds and pleasant polyphonic background music
 * with zero external asset dependencies so it works completely offline.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicInterval: any = null;
  private isMuted: boolean = false;
  private masterVolume: number = 0.7;
  private musicVolume: number = 0.4;
  private sfxVolume: number = 0.8;
  private currentTheme: string = 'menu';
  private speechSynthesisAvailable: boolean = typeof window !== 'undefined' && 'speechSynthesis' in window;

  constructor() {
    // Try to load saved settings
    try {
      const savedMuted = localStorage.getItem('multiPlayMuted');
      if (savedMuted !== null) this.isMuted = savedMuted === 'true';

      const savedVol = localStorage.getItem('multiPlayVolume');
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) this.masterVolume = v;
      }
    } catch {
      // ignore localstorage errors
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public unlockAudio() {
    this.initCtx();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem('multiPlayMuted', String(muted));
    } catch {}
    if (muted) {
      this.stopMusic();
      this.stopSpeech();
    } else {
      this.startMusic(this.currentTheme);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    try {
      localStorage.setItem('multiPlayVolume', String(this.masterVolume));
    } catch {}
  }

  public getVolume(): number {
    return this.masterVolume;
  }

  /**
   * Play a clean synthesized tone with ADSR envelope
   */
  public playTone(
    freq: number,
    duration = 0.15,
    delay = 0,
    type: OscillatorType = 'sine',
    volMultiplier = 0.12,
    pitchBendTo?: number
  ) {
    if (this.isMuted || this.masterVolume === 0) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);
      if (pitchBendTo) {
        osc.frequency.exponentialRampToValueAtTime(pitchBendTo, startTime + duration);
      }

      const peakVol = volMultiplier * this.masterVolume * this.sfxVolume;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peakVol), startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  /**
   * Generates white noise burst for popping balloons and splash effects
   */
  public playNoise(duration = 0.15, delay = 0, volMultiplier = 0.3, filterFreq = 1200) {
    if (this.isMuted || this.masterVolume === 0) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const startTime = this.ctx.currentTime + delay;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const fade = 1 - i / bufferSize;
        data[i] = (Math.random() * 2 - 1) * fade * fade;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, startTime);

      const gain = this.ctx.createGain();
      const peakVol = volMultiplier * this.masterVolume * this.sfxVolume;
      gain.gain.setValueAtTime(peakVol, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(startTime);
    } catch (e) {
      console.warn('Noise error:', e);
    }
  }

  // SOUND EFFECTS
  public playTap() {
    this.playTone(540, 0.06, 0, 'sine', 0.08);
  }

  public playStartGame() {
    this.playTone(392, 0.1, 0, 'sine', 0.12);
    this.playTone(523.25, 0.12, 0.08, 'sine', 0.14);
    this.playTone(659.25, 0.22, 0.18, 'triangle', 0.16);
  }

  public playCorrect() {
    this.playTone(523.25, 0.12, 0, 'sine', 0.2); // C5
    this.playTone(659.25, 0.12, 0.09, 'sine', 0.22); // E5
    this.playTone(783.99, 0.15, 0.18, 'triangle', 0.24); // G5
    this.playTone(1046.5, 0.35, 0.28, 'sine', 0.22); // C6
  }

  public playWrong() {
    this.playTone(349.23, 0.15, 0, 'triangle', 0.15, 293.66);
    this.playTone(261.63, 0.25, 0.14, 'sawtooth', 0.1, 196);
  }

  public playSplash() {
    this.playNoise(0.28, 0, 0.4, 800);
    this.playTone(220, 0.15, 0.05, 'sine', 0.15, 440);
    this.playTone(659.25, 0.2, 0.18, 'sine', 0.12);
  }

  public playPop() {
    this.playNoise(0.12, 0, 0.45, 2000);
    this.playTone(880, 0.08, 0, 'triangle', 0.2, 220);
  }

  public playButterfly() {
    this.playTone(880, 0.08, 0, 'sine', 0.08);
    this.playTone(1174.66, 0.1, 0.07, 'sine', 0.09);
    this.playTone(1318.51, 0.18, 0.14, 'triangle', 0.08);
  }

  public playHarvest() {
    this.playTone(440, 0.08, 0, 'triangle', 0.15);
    this.playTone(220, 0.14, 0.06, 'sine', 0.25);
  }

  public playLevelUp() {
    this.playTone(392, 0.1, 0, 'sine', 0.15);
    this.playTone(523.25, 0.1, 0.08, 'sine', 0.18);
    this.playTone(659.25, 0.1, 0.16, 'sine', 0.2);
    this.playTone(783.99, 0.25, 0.24, 'triangle', 0.25);
  }

  public playRocketLaunch() {
    this.playNoise(0.4, 0, 0.5, 1200);
    this.playTone(220, 0.3, 0.05, 'sawtooth', 0.15, 880);
  }

  public playVictory() {
    const notes = [
      { f: 523.25, d: 0.12, t: 0 },
      { f: 659.25, d: 0.12, t: 0.1 },
      { f: 783.99, d: 0.12, t: 0.2 },
      { f: 1046.5, d: 0.4, t: 0.3 },
      { f: 880, d: 0.15, t: 0.45 },
      { f: 1046.5, d: 0.5, t: 0.6 },
    ];
    notes.forEach(n => this.playTone(n.f, n.d, n.t, 'triangle', 0.2));
  }

  // POLYPHONIC PROCEDURAL BACKGROUND MUSIC
  public startMusic(theme = 'menu') {
    this.currentTheme = theme;
    this.stopMusic();
    if (this.isMuted || this.masterVolume === 0) return;

    this.initCtx();
    if (!this.ctx) return;

    const themes: Record<string, { melody: number[]; chords: number[]; tempo: number; instrument: OscillatorType }> = {
      menu: {
        melody: [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46],
        chords: [261.63, 329.63, 293.66, 349.23],
        tempo: 450,
        instrument: 'sine',
      },
      fish: {
        melody: [392, 440, 523.25, 587.33, 659.25, 587.33, 523.25, 440],
        chords: [196, 261.63, 220, 261.63],
        tempo: 520,
        instrument: 'sine',
      },
      butterfly: {
        melody: [659.25, 783.99, 880, 987.77, 1046.5, 987.77, 880, 783.99],
        chords: [329.63, 392, 440, 392],
        tempo: 380,
        instrument: 'sine',
      },
      balloon: {
        melody: [523.25, 587.33, 659.25, 783.99, 880, 783.99, 659.25, 587.33],
        chords: [261.63, 329.63, 392, 329.63],
        tempo: 340,
        instrument: 'triangle',
      },
      harvest: {
        melody: [440, 523.25, 587.33, 659.25, 587.33, 523.25, 440, 392],
        chords: [220, 261.63, 293.66, 196],
        tempo: 480,
        instrument: 'triangle',
      },
      quiz: {
        melody: [587.33, 659.25, 698.46, 880, 783.99, 698.46, 659.25, 587.33],
        chords: [293.66, 349.23, 392, 293.66],
        tempo: 400,
        instrument: 'sine',
      },
      memorize: {
        melody: [392, 493.88, 587.33, 659.25, 587.33, 493.88, 392, 329.63],
        chords: [196, 246.94, 293.66, 164.81],
        tempo: 600,
        instrument: 'sine',
      },
    };

    const cur = themes[theme] || themes.menu;
    let step = 0;

    const tick = () => {
      if (this.isMuted || this.masterVolume === 0) return;
      const note = cur.melody[step % cur.melody.length];
      const chord = cur.chords[Math.floor(step / 2) % cur.chords.length];

      // Play soft bass chord
      if (step % 2 === 0) {
        this.playTone(chord, 0.6, 0, 'sine', 0.04 * this.musicVolume);
      }
      // Play lead melody
      this.playTone(note, 0.28, 0, cur.instrument, 0.05 * this.musicVolume);

      step++;
    };

    tick();
    this.musicInterval = setInterval(tick, cur.tempo);
  }

  public stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  // SPEECH SYNTHESIS
  public speak(text: string, onEnd?: () => void) {
    if (this.isMuted || !this.speechSynthesisAvailable) {
      onEnd?.();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = Math.max(0.2, this.masterVolume);

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Kid') || v.name.includes('Natural') || v.localService))
        || voices.find(v => v.lang.startsWith('en'));

      if (englishVoice) utterance.voice = englishVoice;

      utterance.onend = () => onEnd?.();
      utterance.onerror = () => onEnd?.();

      window.speechSynthesis.speak(utterance);
    } catch {
      onEnd?.();
    }
  }

  public stopSpeech() {
    if (this.speechSynthesisAvailable) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }
}

export const soundManager = new SoundEngine();
