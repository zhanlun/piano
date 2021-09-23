import clsx from 'clsx'
import React, { useContext, useEffect } from 'react'
import { noteActivateKey, noteDeactivateKey } from '../actions/noteAction'
import { useNoteContext } from '../contexts/noteContext'
import { PianoAudioContext } from '../contexts/pianoAudioContext'
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
  const { play, stop } = useContext(PianoAudioContext)
  const [noteState, noteDispatch] = useNoteContext()
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return

      const matchKey = noteState.pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      play(matchKey.frequency)
      noteDispatch(noteActivateKey(matchKey.keyChar))
    }

    const handleKeyUp = (e) => {
      if (e.repeat) return
      const matchKey = noteState.pitchMapList.find(obj => obj.keyChar === e.key)
      if (!matchKey) return

      stop(matchKey.frequency)
      noteDispatch(noteDeactivateKey(matchKey.keyChar))
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [noteDispatch, noteState, play, stop])

  const noteList = []

  for (let i = 0; i < noteState.pitchMapList.length; i++) {
    const obj = noteState.pitchMapList[i]
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
