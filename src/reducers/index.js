import { combineReducers } from 'redux'
import audioContext from './audioContextReducer'
import notes from './noteReducer'
import tones from './toneReducer'

export default combineReducers({
  notes,
  tones,
  audioContext,
})