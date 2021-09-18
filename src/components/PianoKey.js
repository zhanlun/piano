import React from 'react'

export default function PianoKey({ pitch, name, className }) {
  return (
    <div className={className} key={pitch}>
      <span>{name}</span>
    </div>
  )
}
