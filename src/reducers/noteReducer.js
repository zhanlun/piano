const initialState = {
  transposeStep: 0,
  octaveShift: 0,
  pitchMapList: [
    { frequency: 130.815, keyChar: 'z' },
    { frequency: 138.59, keyChar: 's' },
    { frequency: 146.83, keyChar: 'x' },
    { frequency: 155.565, keyChar: 'd' },
    { frequency: 164.815, keyChar: 'c' },
    { frequency: 174.615, keyChar: 'v' },
    { frequency: 184.995, keyChar: 'g' },
    { frequency: 196, keyChar: 'b' },
    { frequency: 207.65, keyChar: 'h' },
    { frequency: 220, keyChar: 'n' },
    { frequency: 233.08, keyChar: 'j' },
    { frequency: 246.94, keyChar: 'm' },
    { frequency: 261.63, keyChar: 'q' },
    { frequency: 277.18, keyChar: '2' },
    { frequency: 293.66, keyChar: 'w' },
    { frequency: 311.13, keyChar: '3' },
    { frequency: 329.63, keyChar: 'e' },
    { frequency: 349.23, keyChar: 'r' },
    { frequency: 369.99, keyChar: '5' },
    { frequency: 392, keyChar: 't' },
    { frequency: 415.3, keyChar: '6' },
    { frequency: 440, keyChar: 'y' },
    { frequency: 466.16, keyChar: '7' },
    { frequency: 493.88, keyChar: 'u' },
    { frequency: 523.26, keyChar: 'i' },
  ]
}

const getNewPitchMapList = (pitchMapList, octaveShift, transposeStep) => {
  const octaveRatio = Math.pow(2, octaveShift)
  const transposeRatio = Math.pow(1.059463, transposeStep)
  const totalRatio = octaveRatio * transposeRatio
  return pitchMapList.map(obj => ({
    ...obj,
    frequency: Math.round(obj.frequency * totalRatio * 1000) / 1000 // round to 3 d.p.
  }))
}

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'note/setOctave':
      return {
        ...state,
        octaveShift: action.amount,
        pitchMapList: getNewPitchMapList(initialState.pitchMapList, action.amount, state.transposeStep),
      }
    case 'note/setTranspose':
      return {
        ...state,
        transposeStep: action.step,
        pitchMapList: getNewPitchMapList(initialState.pitchMapList, state.octaveShift, action.step),
      }
    default:
      return state
  }
}

export default noteReducer