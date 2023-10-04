import { useAppState } from '~/hooks/useAppContext'
import styles from './MetaMaskError.module.css'

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useAppState()
  return (
    <div className={styles.metaMaskError} style={
      error ? { backgroundColor: 'brown' } : {}
    }>
      { error && 
        <div onClick={clearError}>
          <strong>Error:</strong> {errorMessage}
        </div>
      }
    </div>
  )
}