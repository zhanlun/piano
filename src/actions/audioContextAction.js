
export const audioContextPlay = pitch => ({
  type: 'audioContext/play',
  pitch,
})

export const audioContextStop = pitch => ({
  type: 'audioContext/stop',
  pitch,
})

export const audioContextChangeWavetype = waveType => ({
  type: 'audioContext/changeWaveType',
  waveType,
})

export const audioContextChangeVolume = volume => ({
  type: 'audioContext/changeVolume',
  volume,
})