import clsx from 'clsx'
import React, { useContext } from 'react'
import { noteActivateKey, noteDeactivateKey } from '../actions/noteAction'
import { useNoteContext } from '../contexts/noteContext'
import { PianoAudioContext } from '../contexts/pianoAudioContext'

export default function PianoKey({ pitch, name, className }) {
  const { play, stop } = useContext(PianoAudioContext)
  const [noteState, noteDispatch] = useNoteContext()
  const active = noteState.pitchMapList.find(o => o.keyChar === name).active

  const handlePlay = (e) => {
    e.preventDefault()
    play(pitch)
    noteDispatch(noteActivateKey(name))
  }
  
  const handleStop = (e) => {
    e.preventDefault()
    stop(pitch)
    noteDispatch(noteDeactivateKey(name))
  }

  return (
    <div className={clsx(className, (active && 'active'))} key={pitch}
      onMouseDown={handlePlay} onMouseUp={handleStop}
      onMouseLeave={handleStop}
      onTouchStart={handlePlay} onTouchEnd={handleStop}
    >
      <span>{name}</span>
    </div>
  )
}
