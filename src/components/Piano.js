import React from 'react'
import Octave from './Octave'
import PianoKeybed from './PianoKeybed'
import SustainPedal from './SustainPedal'
import Tones from './Tones'
import Transpose from './Transpose'
import Volume from './Volume'

export default function Piano() {

  return (
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
  )
}
