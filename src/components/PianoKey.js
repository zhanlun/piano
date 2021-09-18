import React from 'react'
import { useDispatch } from 'react-redux'
import { audioContextPlay } from '../actions/audioContextAction'

export default function PianoKey({ pitch, name, className }) {
  const dispatch = useDispatch()
  const handlePlay = (e) => {
    dispatch(audioContextPlay(pitch))
  }
  return (
    <div className={className} key={pitch} onMouseDown={handlePlay}>
      <span>{name}</span>
    </div>
  )
}
