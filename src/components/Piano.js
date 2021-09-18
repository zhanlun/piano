import React from 'react'
import PianoKeybed from './PianoKeybed'
import Tones from './Tones'
import Volume from './Volume'

export default function Piano() {
  return (
    <div className="piano">
      <div className="toolbar">
        <Tones />
        <Volume />
      </div>
      <PianoKeybed />
    </div>
  )
}
