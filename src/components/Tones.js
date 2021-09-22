import { Box, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { PianoAudioContext } from '../contexts/pianoAudioContext'

const tones = [
  'piano',
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
  const { changeWaveType } = useContext(PianoAudioContext)
  const classes = useStyles()
  const [waveType, setWaveType] = useState('piano')

  const handleChange = (e) => {
    const newWaveType = e.target.value
    setWaveType(newWaveType)
    changeWaveType(newWaveType)
  }
  return (
    <Box m={3} className="toolbar-options">
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

