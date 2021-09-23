import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { noteSetOctave } from '../actions/noteAction'
import { useNoteContext } from '../contexts/noteContext'

const octaveOptions = [
  '-2',
  '-1',
  '0',
  '+1',
  '+2',
]

export default function Octave() {
  const [noteState, noteDispatch] = useNoteContext()
  const {octaveShift} = noteState

  const handleChange = (e) => {
    const shiftAmount = (e.target.value)
    noteDispatch(noteSetOctave(shiftAmount))
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

