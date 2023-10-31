import { SiEthereum } from 'react-icons/si'
import styles from './Navigation.module.css'

// Web3 Onboard Imports
import { useConnectWallet } from '@web3-onboard/react'

export const Navigation = () => {

  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] = useConnectWallet()

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <div><SiEthereum /> ETH Atlantis</div>
        </div>
        <div className={styles.rightNav}>
          {!wallet && (
            <button
              className="dapp"
              onClick={async () => {
                const walletsConnected = await connect()
                console.log('connected wallets: ', walletsConnected)
              }}
            >
              CONNECT
            </button>
          )}
          {wallet && (
            <button className="dapp" onClick={async () => {
              const walletsConnected = await disconnect(wallet)
              console.log('connected wallets: ', walletsConnected)
              window.localStorage.removeItem('connectedWallets')
            }}>
              DISCONNECT
            </button>
          )}
        </div>
      </div>
    </div>
  )
}