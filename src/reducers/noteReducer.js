export const initialState = {
  transposeStep: 0,
  octaveShift: 0,
  pitchMapList: [
    { frequency: 130.815, keyChar: 'z', active: false, },
    { frequency: 138.59, keyChar: 's', active: false, },
    { frequency: 146.83, keyChar: 'x', active: false, },
    { frequency: 155.565, keyChar: 'd', active: false, },
    { frequency: 164.815, keyChar: 'c', active: false, },
    { frequency: 174.615, keyChar: 'v', active: false, },
    { frequency: 184.995, keyChar: 'g', active: false, },
    { frequency: 196, keyChar: 'b', active: false, },
    { frequency: 207.65, keyChar: 'h', active: false, },
    { frequency: 220, keyChar: 'n', active: false, },
    { frequency: 233.08, keyChar: 'j', active: false, },
    { frequency: 246.94, keyChar: 'm', active: false, },
    { frequency: 261.63, keyChar: 'q', active: false, },
    { frequency: 277.18, keyChar: '2', active: false, },
    { frequency: 293.66, keyChar: 'w', active: false, },
    { frequency: 311.13, keyChar: '3', active: false, },
    { frequency: 329.63, keyChar: 'e', active: false, },
    { frequency: 349.23, keyChar: 'r', active: false, },
    { frequency: 369.99, keyChar: '5', active: false, },
    { frequency: 392, keyChar: 't', active: false, },
    { frequency: 415.3, keyChar: '6', active: false, },
    { frequency: 440, keyChar: 'y', active: false, },
    { frequency: 466.16, keyChar: '7', active: false, },
    { frequency: 493.88, keyChar: 'u', active: false, },
    { frequency: 523.26, keyChar: 'i', active: false, },
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

export const noteReducer = (state = initialState, action) => {
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
    case 'note/activateKey':
      return {
        ...state,
        pitchMapList: state.pitchMapList.slice(0).map(obj => {
          if (obj.keyChar !== action.key) return obj

          obj.active = true
          return obj
        })
      }
    case 'note/deactivateKey':
      return {
        ...state,
        pitchMapList: state.pitchMapList.slice(0).map(obj => {
          if (obj.keyChar !== action.key) return obj

          obj.active = false
          return obj
        })
      }
    default:
      return state
  }
}