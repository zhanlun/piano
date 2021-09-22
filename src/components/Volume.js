import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import React, { useContext, useState } from 'react';
import { PianoAudioContext } from '../contexts/pianoAudioContext';

export default function Volume() {
  const { changeVolume } = useContext(PianoAudioContext)
  const [volume, setVolume] = useState(0.2)

  const handleChange = (e, newValue) => {
    console.log(newValue)
    setVolume(newValue)
    changeVolume(newValue)
  }
  return (
    <Box m={3} className="toolbar-options">
      <Typography gutterBottom>
        Volume
      </Typography>
      <Slider min={0} max={1} step={0.05} value={volume} onChange={handleChange} />
    </Box>
  )
}
