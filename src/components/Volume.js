import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { audioContextChangeVolume } from '../actions/audioContextAction';

export default function Volume() {
  const dispatch = useDispatch()
  const [volume, setVolume] = useState(0.2)

  const handleChange = (e, newValue) => {
    setVolume(newValue)
    dispatch(audioContextChangeVolume(newValue))
  }
  return (
    <Box m={3}>
      <Typography gutterBottom>
        Volume
      </Typography>
      <Slider min={0} max={1} step={0.05} value={volume} onChange={handleChange} />
    </Box>
  )
}
