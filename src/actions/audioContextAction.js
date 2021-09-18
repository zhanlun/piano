
export const audioContextPlay = pitch => ({
  type: 'audioContext/play',
  pitch,
})

export const audioContextStop = pitch => ({
  type: 'audioContext/stop',
  pitch,
})