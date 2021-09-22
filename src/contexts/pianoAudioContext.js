import { createContext } from "react";
import { pianoWaveTable } from '../utils/pianoWaveTable';

let gainValue = 0.2
let attackTime = 0.3;
let sustainLevel = 0.8;
let waveType = 'piano'

const context = new AudioContext();
const masterVolume = context.createGain();
masterVolume.connect(context.destination);
masterVolume.gain.value = gainValue

function startNote(pitch) {
  const oscillator = context.createOscillator();
  const noteGain = context.createGain();
  noteGain.gain.setValueAtTime(0, context.currentTime);
  noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + 0.1 * attackTime);
  /** Decay over time to simulate piano sound */
  noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + 0.1 * attackTime);
  const decayTime1 = 440 / Math.max(110, Math.min(pitch, 440))
  const decayTime2 = 880 / Math.max(110, Math.min(pitch, 880))
  noteGain.gain.exponentialRampToValueAtTime(0.05 / pitch, context.currentTime + decayTime1);
  noteGain.gain.setValueAtTime(0.05 / pitch, context.currentTime + decayTime1);
  noteGain.gain.exponentialRampToValueAtTime(0.00005, context.currentTime + decayTime2);

  if (waveType === 'piano') {
    var imag = new Float32Array(pianoWaveTable.imag);   // sine
    var real = new Float32Array(pianoWaveTable.real);  // cos
    let customWave = context.createPeriodicWave(real, imag);  // cos,sine
    oscillator.setPeriodicWave(customWave);
  } else {
    oscillator.type = waveType
  }

  oscillator.frequency.setValueAtTime(pitch, context.currentTime);
  oscillator.start(context.currentTime);
  oscillator.connect(noteGain);
  noteGain.connect(masterVolume);
  return { oscillator, noteGain, previousTime: context.currentTime }
}

function stopNote(oscillator, noteGain, pitch) {
  if (notesInPlaying[pitch]) return
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 0.1);
}

function stopNoteForPitch(pitch) {
  const foundNote = notesInPlaying[pitch]
  if (!foundNote) return
  const { oscillator, noteGain, previousTime } = foundNote

  if (sustainOn) {
    setTimeout(() => {
      delete notesInPlaying[pitch]
      stopNote(oscillator, noteGain, pitch)
    }, 4000)
    return
  }

  let timeDiff = context.currentTime - previousTime
  if (timeDiff < 0.3) {
    setTimeout(() => {
      delete notesInPlaying[pitch]
      stopNote(oscillator, noteGain, pitch)
    }, 300 - (timeDiff * 300))
  } else {
    delete notesInPlaying[pitch]
    stopNote(oscillator, noteGain, pitch)
  }
}

const notesInPlaying = {}
let sustainOn = false

const initialState = {
  /**
   * Play a note
   * @param {Number} pitch Frequency in hertz
   */
  play: (pitch) => {
    notesInPlaying[pitch] = startNote(pitch)
  },
  /**
   * Stop a note
   * @param {Number} pitch Frequency in hertz
   */
  stop: (pitch) => {
    stopNoteForPitch(pitch)
  },
  /**
   * Set the value of waveType for use by audio context
   * @param {string} newWaveType 
   */
  changeWaveType: (newWaveType) => {
    waveType = newWaveType
  },
  /**
   * Set the value of volume for use by audio context
   * @param {Number} newVolume 
   */
  changeVolume: (newVolume) => {
    console.log(newVolume)
    console.log(typeof newVolume)
    masterVolume.gain.value = newVolume
  },
  /**
   * Set the value of sustain for use by audio context, call by Piano
   * @param {boolean} newSustain 
   */
  changeSustain: (newSustain) => {
    sustainOn = newSustain
  },
}

export const PianoAudioContext = createContext(initialState)

export default function PianoAudioContextProvider(props) {
  return (
    <PianoAudioContext.Provider value={initialState}>
      {props.children}
    </PianoAudioContext.Provider>
  )
}