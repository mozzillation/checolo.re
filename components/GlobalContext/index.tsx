import { createContext } from 'react'

export const GlobalContext = createContext<any>(null)

export const GlobalContextProvider = GlobalContext.Provider

export const INITIAL_STATE = {
  appState: {
    loading: false,
    error: false,
    idle: true
  },
  error: {},
  selectedRegion: null,
  detectedRegion: null
}