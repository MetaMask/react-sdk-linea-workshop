import { SiEthereum } from 'react-icons/si'
import { MetaMaskButton } from '@metamask/sdk-react-ui'
import styles from './Navigation.module.css'

export const Navigation = () => {

  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <SiEthereum /> ETH Atlantis
        </div>
        <div className={styles.rightNav}>
          <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
        </div>
      </div>
    </div>
  )
}