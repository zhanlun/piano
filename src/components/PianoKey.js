import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { audioContextPlay, audioContextStop } from '../actions/audioContextAction'

export default function PianoKey({ pitch, name, className }) {
  const dispatch = useDispatch()
  const handlePlay = (e) => {
    e.preventDefault()
    dispatch(audioContextPlay(pitch))
  }
  const handleStop = (e) => {
    e.preventDefault()
    dispatch(audioContextStop(pitch))
  }

  useEffect(() => {
    /**
     * stop current pitch if rerender due to setting change
     */
    return function cleanup() {
      dispatch(audioContextStop(pitch))
    }
  })

  return (
    <div className={className} key={pitch}
      onMouseDown={handlePlay} onMouseUp={handleStop}
      onMouseLeave={handleStop}
      onTouchStart={handlePlay} onTouchEnd={handleStop}
    >
      <span>{name}</span>
    </div>
  )
}
