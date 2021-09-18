const context = new AudioContext();
const masterVolume = context.createGain();
masterVolume.connect(context.destination);
masterVolume.gain.value = 0.2

let attackTime = 0.3;
let sustainLevel = 0.8;

function startNote(pitch) {
  const oscillator = context.createOscillator();
  const noteGain = context.createGain();
  noteGain.gain.setValueAtTime(0, context.currentTime);
  noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + 0.1 * attackTime);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(pitch, context.currentTime);
  oscillator.start(context.currentTime);
  oscillator.connect(noteGain);
  noteGain.connect(masterVolume);
  return { oscillator, noteGain }
}

function stopNote(oscillator, noteGain) {
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 1);
}

function stopNoteForPitch(pitch) {
  const foundNote = notesInPlaying[pitch]
  if (!foundNote) return
  const { oscillator, noteGain } = foundNote
  delete notesInPlaying[pitch]
  stopNote(oscillator, noteGain)
}

const notesInPlaying = {}

const initialState = {
  context,
}

/**
 * 
 * Update of TONE, VOLUME, SUSTAIN, etc. happen in this reducer on the audio context
 */
const audioContextReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'audioContext/play':
      notesInPlaying[action.pitch] = startNote(action.pitch)
      return state
    case 'audioContext/stop':
      stopNoteForPitch(action.pitch)
      return state
    default:
      return state
  }
}

export default audioContextReducer