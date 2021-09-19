import { Box, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
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

const useStyles = makeStyles((theme) => {
  return {
    capitalize: {
      textTransform: 'capitalize',
    }
  }
})

export default function Octave() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [amount, setAmount] = useState('0')

  const handleChange = (e) => {
    setAmount(e.target.value)
    const amount = Number.parseInt(e.target.value)
    dispatch(noteShiftOctave(amount))
  }
  return (
    <Box m={3} className="toolbar-options">
      <InputLabel>Octave</InputLabel>
      <Select
        label="Octave"
        value={amount}
        onChange={handleChange}
        className={classes.capitalize}
      >
        {octaveOptions &&
          octaveOptions.map(oct => (
            <MenuItem value={oct} className={classes.capitalize} key={oct}>{oct}</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

