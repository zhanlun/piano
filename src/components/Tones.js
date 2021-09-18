import { Box, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { audioContextChangeWavetype } from '../actions/audioContextAction'

const tones = [
  'sine',
  'triangle',
  'square',
  'sawtooth',
]

const useStyles = makeStyles((theme) => {
  return {
    capitalize: {
      textTransform: 'capitalize',
    }
  }
})

export default function Tones() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [waveType, setWaveType] = useState('sine')

  const handleChange = (e) => {
    setWaveType(e.target.value)
    dispatch(audioContextChangeWavetype(e.target.value))
  }
  return (
    <Box m={3}>
      <InputLabel>Tone</InputLabel>
      <Select
        label="Tone"
        value={waveType}
        onChange={handleChange}
        className={classes.capitalize}
      >
        {tones &&
          tones.map(t => (
            <MenuItem value={t} className={classes.capitalize} key={t}>{t}</MenuItem>
          ))
        }
      </Select>
    </Box>
  )
}

