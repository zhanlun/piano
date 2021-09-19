import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { noteShiftOctave } from '../actions/noteAction'

const octaveOptions = [
  '-2',
  '-1',
  '0',
  '+1',
  '+2',
]

export default function Octave() {
  const dispatch = useDispatch()
  const [amount, setAmount] = useState('0')

  const handleChange = (e) => {
    setAmount(e.target.value)
    const shiftAmount = Number.parseInt(e.target.value)
    dispatch(noteShiftOctave(shiftAmount))
  }
  return (
    <Box m={3} className="toolbar-options">
      <InputLabel>Octave</InputLabel>
      <Select
        label="Octave"
        value={amount}
        onChange={handleChange}
      >
        {octaveOptions &&
          octaveOptions.map(oct => (
            <MenuItem value={oct} key={oct}>{oct}</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

