import { createContext, useContext, useReducer } from "react";

const NoteContext = createContext()

export const useNoteContext = () => useContext(NoteContext)

export const NoteContextProvider = ({ children, initialState, reducer }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <NoteContext.Provider value={[state, dispatch]}>
      {children}
    </NoteContext.Provider>
  )
}