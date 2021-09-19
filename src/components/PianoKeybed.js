import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { audioContextPlay, audioContextStop, audioContextToggleSustain } from '../actions/audioContextAction'
import { noteActivateKey, noteDeactivateKey } from '../actions/noteAction'
import PianoKey from './PianoKey'

const whiteKeyClass = clsx('piano-key', 'piano-key-white')
const blackKeyClass = clsx('piano-key', 'piano-key-black')
const notePatterns = [
  {
    name: 'C',
    className: whiteKeyClass,
  },
  {
    name: 'C#',
    className: blackKeyClass,
  },
  {
    name: 'D',
    className: whiteKeyClass,
  },
  {
    name: 'D#',
    className: blackKeyClass,
  },
  {
    name: 'E',
    className: whiteKeyClass,
  },
  {
    name: 'F',
    className: whiteKeyClass,
  },
  {
    name: 'F#',
    className: blackKeyClass,
  },
  {
    name: 'G',
    className: whiteKeyClass,
  },
  {
    name: 'G#',
    className: blackKeyClass,
  },
  {
    name: 'A',
    className: whiteKeyClass,
  },
  {
    name: 'A#',
    className: blackKeyClass,
  },
  {
    name: 'B',
    className: whiteKeyClass,
  },
]

export default function PianoKeybed() {
  const pitchMapList = useSelector(state => state.notes.pitchMapList)
  const dispatch = useDispatch()

  useEffect(() => {
    const isSpacebar = (key) => key === ' '
    const toggleSustain = () => dispatch(audioContextToggleSustain())
    const handleKeyDown = (e) => {
      if (e.repeat) return
      if (isSpacebar(e.key)) {
        return toggleSustain()
      }
      const matchKey = pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      dispatch(audioContextPlay(matchKey.frequency))
      dispatch(noteActivateKey(matchKey.keyChar))
    }

    const handleKeyUp = (e) => {
      if (e.repeat) return
      const matchKey = pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      dispatch(audioContextStop(matchKey.frequency))
      dispatch(noteDeactivateKey(matchKey.keyChar))
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [dispatch, pitchMapList])

  const noteList = []

  for (let i = 0; i < pitchMapList.length; i++) {
    const obj = pitchMapList[i]
    noteList.push({
      name: obj.keyChar,
      className: notePatterns[i % 12].className,
      pitch: obj.frequency,
    })
  }

  return (
    <div className="piano-keybed">
      {
        noteList &&
        noteList.map(noteMap => (
          <PianoKey className={noteMap.className} key={noteMap.pitch} name={noteMap.name} pitch={noteMap.pitch} />
        ))
      }
    </div>
  )
}
