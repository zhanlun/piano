import clsx from 'clsx'
import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteActivateKey, noteDeactivateKey } from '../actions/noteAction'
import { PianoAudioContext } from '../contexts/pianoAudioContext'

export default function PianoKey({ pitch, name, className }) {
  const { play, stop } = useContext(PianoAudioContext)
  const dispatch = useDispatch()
  const active = useSelector(state => state.notes.pitchMapList.find(o => o.keyChar === name).active)
  const handlePlay = (e) => {
    e.preventDefault()
    play(pitch)
    dispatch(noteActivateKey(name))
  }
  const handleStop = (e) => {
    e.preventDefault()
    stop(pitch)
    dispatch(noteDeactivateKey(name))
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
