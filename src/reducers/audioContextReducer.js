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
  noteGain.gain.exponentialRampToValueAtTime(0.05 / pitch, context.currentTime + (440 / pitch));
  noteGain.gain.setValueAtTime(0.05 / pitch, context.currentTime + (440 / pitch));
  noteGain.gain.exponentialRampToValueAtTime(0.00005, context.currentTime + (880 / pitch));

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
  return { oscillator, noteGain }
}

function stopNote(oscillator, noteGain) {
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 0.1);
}

function stopNoteForPitch(pitch) {
  const foundNote = notesInPlaying[pitch]
  if (!foundNote) return
  const { oscillator, noteGain } = foundNote
  delete notesInPlaying[pitch]
  stopNote(oscillator, noteGain)
}

const notesInPlaying = {}

const initialState = {}

/**
 * 
 * Update of TONE, VOLUME, SUSTAIN, etc. happen in this reducer on the audio context
 *
 * The state will not change as of now, to keep the same global context
 *
 */
const audioContextReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'audioContext/play':
      notesInPlaying[action.pitch] = startNote(action.pitch)
      break
    case 'audioContext/stop':
      stopNoteForPitch(action.pitch)
      break
    case 'audioContext/changeWaveType':
      waveType = action.waveType
      break
    case 'audioContext/changeVolume':
      masterVolume.gain.value = action.volume
      break

    default:
  }

  return state
}

export default audioContextReducer