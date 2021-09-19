
export const noteSetOctave = amount => ({
  type: 'note/setOctave',
  amount
})

export const noteSetTranspose = step => ({
  type: 'note/setTranspose',
  step
})