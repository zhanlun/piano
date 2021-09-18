import { combineReducers } from 'redux'
import audioContext from './audioContextReducer'
import notes from './noteReducer'

export default combineReducers({
  notes,
  audioContext,
})