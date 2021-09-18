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
  noteGain.gain.setValueAtTime(1, context.currentTime);
  // noteGain.gain.linearRampToValueAtTime(sustainLevel, context.currentTime + noteLength * attackTime);
  // noteGain.gain.setValueAtTime(sustainLevel, context.currentTime + noteLength - noteLength * releaseTime);
  // noteGain.gain.linearRampToValueAtTime(0, context.currentTime + 10);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(pitch, context.currentTime);
  oscillator.start(context.currentTime);
  // noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  // noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.connect(noteGain);
  noteGain.connect(masterVolume);
  return { oscillator, noteGain, previousTime: context.currentTime }
}

function stopNote(oscillator, noteGain, previousTime) {
  console.log('stopNote ', context.currentTime)
  let timeDiff = context.currentTime - previousTime
  console.log(timeDiff)
  // if (timeDiff > 1) {
  noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  oscillator.stop(context.currentTime + 1);
  // } else {
  //   noteGain.gain.setValueAtTime(noteGain.gain.value, context.currentTime);
  //   noteGain.gain.exponentialRampToValueAtTime(0.000001, context.currentTime + 0.03);
  // oscillator.stop(context.currentTime + 0.2);
// }
  // then oscillator auto delete by garbage collector
}

function stopNoteForPitch(pitch) {
  // setTimeout(() => {
  const foundNote = notesInPlaying[pitch]
  if (!foundNote) return
  const { oscillator, noteGain, previousTime } = foundNote
  delete notesInPlaying[pitch]
  stopNote(oscillator, noteGain, previousTime)
  // }, 700)
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
    case 'audioContext/play': {
      if (notesInPlaying[action.pitch]) return state
      notesInPlaying[action.pitch] = {}

      const { oscillator, noteGain, previousTime } = startNote(action.pitch)
      notesInPlaying[action.pitch] = { oscillator, noteGain, previousTime }
      return state
    }
    // case 'audioContext/playShort': {
    //   console.log('short')
    //   if (notesInPlaying[action.pitch]) return state

    //   const { oscillator, noteGain } = startNote(action.pitch)
    //   notesInPlaying[action.pitch] = { oscillator, noteGain }
    //   stopNoteForPitch(action.pitch)
    //   return state
    // }
    case 'audioContext/stop':
      if (!notesInPlaying[action.pitch]) return state
      console.log(notesInPlaying[action.pitch])
      stopNoteForPitch(action.pitch)
      return state
    default:
      return state
  }
}

export default audioContextReducer