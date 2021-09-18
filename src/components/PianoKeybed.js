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
  const notePitches = useSelector(state => state.notes)
  let numberOfOctaves = 2
  const noteList = []
  for (let i = 0; i < numberOfOctaves; i++) {
    for (let j = 0; j < notePitches.length; j++) {
      const pitch = notePitches[j] * (Math.pow(2, i));
      noteList.push({
        name: notePatterns[j].name,
        className: notePatterns[j].className,
        pitch,
      })
    }
  }
  // tail key C
  noteList.push({
    name: notePatterns[0].name,
    className: notePatterns[0].className,
    pitch: notePitches[0] * (Math.pow(2, numberOfOctaves))
  })

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
