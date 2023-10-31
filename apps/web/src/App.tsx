import './App.global.css'
import styles from './App.module.css'

import { Navigation } from './components/Navigation'
import { Display } from './components/Display'
import { MetaMaskError } from './components/MetaMaskError'
import { AppContextProvider } from './hooks/useAppContext'

// Web3 Onboard Imports
// import Onboard from '@web3-onboard/core'
import metamaskSDK from '@web3-onboard/metamask'
import { Web3OnboardProvider, init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
const INFURA_KEY = import.meta.env.VITE_PUBLIC_INFURA_PROJECT_ID
const ethereumLinea = {
  id: '0xe704',
  token: 'ETH',
  label: 'Linea Testnet',
  rpcUrl: `https://linea-goerli.infura.io/v3/${INFURA_KEY}`
}

/* ADDED FOR @web3-onboard/metamask */
const mmSdkOptions = {
  logging: { developerMode: false },
  checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
  dappMetadata: {
    name: 'Demo React App',
    url: window.location.host,
  },
}
const metamaskSDKWallet = metamaskSDK({options: mmSdkOptions})
// const onboard = Onboard({
//   wallets: [metamaskSDKWallet]
// })
/* ADDED FOR @web3-onboard/metamask */

const chains = [ethereumLinea]
const wallets = [injectedModule()]
const web3Onboard = init({
  wallets: [metamaskSDKWallet], /* UPDATED FOR @web3-onboard/metamask */
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