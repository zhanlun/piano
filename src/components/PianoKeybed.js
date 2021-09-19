import clsx from 'clsx'
import React from 'react'
import { useSelector } from 'react-redux'
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
