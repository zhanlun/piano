import React from 'react'
import { useDispatch } from 'react-redux'
import { audioContextPlay, audioContextStop } from '../actions/audioContextAction'

export default function PianoKey({ pitch, name, className }) {
  const dispatch = useDispatch()
  const handlePlay = (e) => {
    dispatch(audioContextPlay(pitch))
  }
  const handleStop = (e) => {
    dispatch(audioContextStop(pitch))
  }
  return (
    <div className={className} key={pitch}
      onMouseDown={handlePlay} onMouseUp={handleStop}
      onMouseLeave={handleStop}
    >
      <span>{name}</span>
    </div>
  )
}
