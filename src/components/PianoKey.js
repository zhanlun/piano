import clsx from 'clsx'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { audioContextPlay, audioContextStop } from '../actions/audioContextAction'
import { noteActivateKey, noteDeactivateKey } from '../actions/noteAction'

export default function PianoKey({ pitch, name, className }) {
  const dispatch = useDispatch()
  const active = useSelector(state => state.notes.pitchMapList.find(o => o.keyChar === name).active)
  const handlePlay = (e) => {
    e.preventDefault()
    dispatch(audioContextPlay(pitch))
    dispatch(noteActivateKey(name))
  }
  const handleStop = (e) => {
    e.preventDefault()
    dispatch(audioContextStop(pitch))
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
