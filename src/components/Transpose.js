import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { noteSetTranspose } from '../actions/noteAction'
import { useNoteContext } from '../contexts/noteContext'

const keyOptions = [
  'C',
  'D♭',
  'D',
  'E♭',
  'E',
  'F',
  'G♭',
  'G',
  'A♭',
  'A',
  'B♭',
  'B',
]

export default function Transpose() {
  const [noteState, noteDispatch] = useNoteContext()
  const {transposeStep} = noteState

  const handleChange = (e) => {
    noteDispatch(noteSetTranspose(e.target.value))
  }
  return (
    <Box m={3} className="toolbar-options">
      <InputLabel>Transpose</InputLabel>
      <Select
        label="Octave"
        value={transposeStep}
        onChange={handleChange}
      >
        {keyOptions &&
          keyOptions.map((k, idx) => (
            <MenuItem value={idx} key={k}>{k}</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

