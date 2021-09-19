import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteSetOctave } from '../actions/noteAction'

const octaveOptions = [
  '-2',
  '-1',
  '0',
  '+1',
  '+2',
]

export default function Octave() {
  const dispatch = useDispatch()
  const octaveShift = useSelector(state => state.notes.octaveShift)

  const handleChange = (e) => {
    const shiftAmount = (e.target.value)
    dispatch(noteSetOctave(shiftAmount))
  }
  return (
    <Box m={3} className="toolbar-options">
      <InputLabel>Octave</InputLabel>
      <Select
        label="Octave"
        value={octaveShift}
        onChange={handleChange}
      >
        {octaveOptions &&
          octaveOptions.map(oct => (
            <MenuItem value={Number.parseInt(oct)} key={oct}>{oct}</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

