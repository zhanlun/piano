import React from 'react'
import PianoAudioContextProvider from '../contexts/pianoAudioContext'
import Octave from './Octave'
import PianoKeybed from './PianoKeybed'
import SustainPedal from './SustainPedal'
import Tones from './Tones'
import Transpose from './Transpose'
import Volume from './Volume'

export default function Piano() {
  return (
    <PianoAudioContextProvider>
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
    </PianoAudioContextProvider>
  )
}
