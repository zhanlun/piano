import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { noteSetTranspose } from '../actions/noteAction'

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
  const dispatch = useDispatch()
  const transposeStep = useSelector(state => state.notes.transposeStep)

  const handleChange = (e) => {
    dispatch(noteSetTranspose(e.target.value))
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

