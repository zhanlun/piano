import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { audioContextChangeWavetype } from '../actions/audioContextAction'
import PianoKeybed from './PianoKeybed'

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
      <select name="waveType" value={data.waveType} onChange={handleChange}>
        <option value="sine">sine</option>
        <option value="triangle">triangle</option>
        <option value="square">square</option>
        <option value="sawtooth">sawtooth</option>
      </select>
      <PianoKeybed />
    </div>
  )
}
