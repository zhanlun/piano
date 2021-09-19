import { Box, InputLabel, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

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
  const [key, setKey] = useState(0)

  const handleChange = (e) => {
    console.log(e.target.value)
    setKey(e.target.value)
    // const step = keyOptions.indexOf(e.target.value)
    // dispatch(noteTranspose(step))
  }
  return (
    <Box m={3} className="toolbar-options">
      <InputLabel>Transpose</InputLabel>
      <Select
        label="Octave"
        value={key}
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

