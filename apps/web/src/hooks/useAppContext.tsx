import { useState, createContext, PropsWithChildren, useContext } from 'react'

interface AppContextData {
  error: boolean,
  errorMessage: string,
  mints: number,
  clearError: () => void,
  setError: (error: string) => void,
  updateMints: () => void,
}

const AppContext = createContext<AppContextData>({} as AppContextData)

export const AppContextProvider = ({ children }: PropsWithChildren) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [mints, setMints] = useState(0)
  const clearError = () => setErrorMessage('')
  const setError = (error: string) => setErrorMessage(error)
  const updateMints = () => setMints(mints+1)

  return (
    <AppContext.Provider
      value={{
        error: !!errorMessage,
        errorMessage,
        mints,
        clearError,
        setError,
        updateMints
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppState = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within a "MetaMaskContextProvider"')
  }
  return context
}