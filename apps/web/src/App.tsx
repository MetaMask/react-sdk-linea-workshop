import './App.global.css'
import styles from './App.module.css'

import { MetaMaskUIProvider } from '@metamask/sdk-react-ui'

import { Navigation } from './components/Navigation'
import { Display } from './components/Display'
import { MetaMaskError } from './components/MetaMaskError'
import { AppContextProvider } from './hooks/useAppContext'

import { configureChains } from 'wagmi'
import { lineaTestnet } from '@wagmi/core/chains'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const INFURA_KEY = import.meta.env.VITE_PUBLIC_INFURA_PROJECT_ID

const { chains } = configureChains(
  [lineaTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://linea-goerli.infura.io/v3/${INFURA_KEY}`
      }),
    })]
  ,
)

export const App = () => {
  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
    dappMetadata: {
      name: 'Demo React App',
      url: window.location.host,
    },
  }

  return (
    <AppContextProvider>
      <MetaMaskUIProvider sdkOptions={sdkOptions} networks={chains}>
        <div className={styles.appContainer}>
          <Navigation />
          <Display />
          <MetaMaskError />
        </div>
      </MetaMaskUIProvider>
    </AppContextProvider>
  )
}