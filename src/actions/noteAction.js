
export const noteShiftOctave = amount => ({
  type: 'note/shiftOctave',
  amount
})

export const noteTranspose = step => ({
  type: 'note/transpose',
  step
})