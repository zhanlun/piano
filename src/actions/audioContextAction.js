
export const audioContextPlay = pitch => ({
  type: 'audioContext/play',
  pitch,
})

export const audioContextStop = pitch => ({
  type: 'audioContext/stop',
  pitch,
})

export const audioContextPlayShort = pitch => ({
  type: 'audioContext/playShort',
  pitch,
})