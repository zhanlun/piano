import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { audioContextPlay, audioContextStop } from '../actions/audioContextAction'
import PianoKeybed from './PianoKeybed'
import Tones from './Tones'
import Volume from './Volume'

export default function Piano() {
  const dispatch = useDispatch()
  const pitchMapList = useSelector(state => state.notes.pitchMapList)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return

      const matchKey = pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      dispatch(audioContextPlay(matchKey.frequency))
    }

    const handleKeyUp = (e) => {
      if (e.repeat) return

      const matchKey = pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      dispatch(audioContextStop(matchKey.frequency))
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [dispatch, pitchMapList])

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
