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
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 0.1);
}

// TODO
// Try to prevent crash in mobile when pressing multiple keys rapidly
// May test using desktop using keyboard first
function stopNoteForPitch(pitch) {
  const foundNote = notesInPlaying[pitch]
  if (!foundNote) return
  if (sustainOn) return

  const { oscillator, noteGain, previousTime } = foundNote
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
  sustain: sustainOn,
}

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
    case 'audioContext/toggleSustain':
      sustainOn = !state.sustain
      return {
        ...state,
        sustain: !state.sustain,
      }
    default:
  }

  return state
}

export default audioContextReducer