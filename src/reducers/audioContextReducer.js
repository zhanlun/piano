const context = new AudioContext();
const masterVolume = context.createGain();
masterVolume.connect(context.destination);
masterVolume.gain.value = 0.2

let attackTime = 0.3;
let sustainLevel = 0.8;
let releaseTime = 0.3;
let noteLength = 1;

function startNote(pitch) {
  const oscillator = context.createOscillator();
  const noteGain = context.createGain();
  noteGain.gain.setValueAtTime(0, 0);
  noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + noteLength * attackTime);
  noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + noteLength - noteLength * releaseTime);
  noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 10);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(pitch, 0);
  oscillator.start(0);
  oscillator.connect(noteGain);
  noteGain.connect(masterVolume);
  return { oscillator, noteGain }
}

function stopNote(oscillator, noteGain) {
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 5);
  // then oscillator auto delete by garbage collector
}

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
      const { oscillator, noteGain } = startNote(action.pitch)
      setTimeout(() => {
        stopNote(oscillator, noteGain)
      }, 3000);
      return state
    default:
      return state
  }
}

export default audioContextReducer