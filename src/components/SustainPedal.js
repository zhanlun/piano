import { FormControlLabel, Switch } from '@material-ui/core';
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
    <div style={{ margin: '1px auto', textAlign: 'center' }}>
      <FormControlLabel
        value="sustain"
        label="Sustain (spacebar)"
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
    </div>
  )
}
