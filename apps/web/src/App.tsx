import './App.global.css'
import styles from './App.module.css'

import { Navigation } from './components/Navigation'
import { Display } from './components/Display'
import { MetaMaskError } from './components/MetaMaskError'
import { AppContextProvider } from './hooks/useAppContext'

import { Web3OnboardProvider, init } from '@web3-onboard/react'
import metamaskSDK from '@web3-onboard/metamask'

const INFURA_KEY = import.meta.env.VITE_PUBLIC_INFURA_PROJECT_ID
const ethereumLinea = {
  id: '0xe704',
  token: 'ETH',
  label: 'Linea Testnet',
  rpcUrl: `https://linea-goerli.infura.io/v3/${INFURA_KEY}`
}

const mmSdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
  dappMetadata: {
    name: 'Demo React App',
    url: window.location.host,
  },
}
const metamaskSDKWallet = metamaskSDK({options: mmSdkOptions})

const chains = [ethereumLinea]
const web3Onboard = init({
  wallets: [metamaskSDKWallet],
  chains,
  appMetadata: {
    name: 'ETH Atlantis',
    icon: '<svg>App Icon</svg>',
    description: 'A demo of Web3-Onboard for the ETH Atlantis (MM SDK + Linea Workshop).'
  }
})

export const App = () => {

  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <AppContextProvider>
        <div className={styles.appContainer}>
          <Navigation />
          <Display />
          <MetaMaskError />
        </div>
      </AppContextProvider>
    </Web3OnboardProvider>
  )
}