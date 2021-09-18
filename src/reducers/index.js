import { combineReducers } from 'redux'
import notes from './notes'
import tones from './tones'

export default combineReducers({
  notes,
  tones,
})