
export const noteSetOctave = amount => ({
  type: 'note/setOctave',
  amount
})

export const noteSetTranspose = step => ({
  type: 'note/setTranspose',
  step
})

export const noteActivateKey = key => ({
  type: 'note/activateKey',
  key
})

export const noteDeactivateKey = key => ({
  type: 'note/deactivateKey',
  key
})
