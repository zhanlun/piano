import { FormControlLabel, Switch } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { PianoAudioContext } from '../contexts/pianoAudioContext';

export default function SustainPedal() {
  const [sustain, setSustain] = useState(false) // for displaying switch status
  const { changeSustain } = useContext(PianoAudioContext)  // set sustain for use by audio context

  const toggleSustain = () => {
    const newSustainState = !sustain
    setSustain(newSustainState)
    changeSustain(newSustainState)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return
      if (e.key === ' ') {
        return toggleSustain()
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  })

  return (
    <div style={{ margin: '1px auto', textAlign: 'center' }}>
      <FormControlLabel
        value="sustain"
        label="Sustain (spacebar)"
        labelPlacement="bottom"
        control={
          <Switch
            checked={sustain}
            onChange={toggleSustain}
            color="primary"
            name="sustain"
          />
        }
      />
    </div>
  )
}
