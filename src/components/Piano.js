import React from 'react'
import { NoteContextProvider } from '../contexts/noteContext'
import PianoAudioContextProvider from '../contexts/pianoAudioContext'
import { initialState, noteReducer } from '../reducers/noteReducer'
import Octave from './Octave'
import PianoKeybed from './PianoKeybed'
import SustainPedal from './SustainPedal'
import Tones from './Tones'
import Transpose from './Transpose'
import Volume from './Volume'

export default function Piano() {
  return (
    <PianoAudioContextProvider>
      <NoteContextProvider initialState={initialState} reducer={noteReducer}>
        <div className="piano">
          <div className="toolbar">
            <Transpose />
            <Tones />
            <Octave />
            <Volume />
          </div>
          <PianoKeybed />
          <SustainPedal />
        </div>
      </NoteContextProvider>
    </PianoAudioContextProvider>
  )
}
