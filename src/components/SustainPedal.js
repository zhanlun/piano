import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { audioContextToggleSustain } from '../actions/audioContextAction';

export default function SustainPedal() {
  const dispatch = useDispatch()
  const sustain = useSelector(state => state.audioContext.sustain)

  const handleChange = () => {
    dispatch(audioContextToggleSustain())
  }

  return (
    <div style={{ margin: '16px auto', textAlign: 'center' }}>
      <FormControlLabel
        value="sustain"
        label="Sustain"
        labelPlacement="bottom"
        control={
          <Switch
            checked={sustain}
            onChange={handleChange}
            color="primary"
            name="sustain"
          />
        }
      />
      <Typography variant="subtitle1">(spacebar)</Typography>
    </div>
  )
}
