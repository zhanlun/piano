import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { audioContextChangeWavetype } from '../actions/audioContextAction'
import PianoKeybed from './PianoKeybed'
import Tones from './Tones'
import Volume from './Volume'

export default function Piano() {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    waveType: 'sine',
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
    switch (e.target.name) {
      case 'waveType':
        console.log(e)
        dispatch(audioContextChangeWavetype(e.target.value))
    }
  }

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
