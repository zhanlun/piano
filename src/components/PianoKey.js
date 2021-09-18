import React from 'react'
import { useDispatch } from 'react-redux'
import { audioContextPlay, audioContextPlayShort, audioContextStop } from '../actions/audioContextAction'

export default function PianoKey({ pitch, name, className }) {
  const dispatch = useDispatch()
  const handlePlay = (e) => {
    console.log('handle play')
    dispatch(audioContextPlay(pitch))
  }
  const handleStop = (e) => {
    console.log('handle stop')
    dispatch(audioContextStop(pitch))
  }
  const handleClick = (e) => {
    dispatch(audioContextPlayShort(pitch))
  }
  return (
    <div className={className} key={pitch}
      // onClick={handleClick}
      onMouseDown={handlePlay} onMouseUp={handleStop}>
      <span>{name}</span>
    </div>
  )
}
