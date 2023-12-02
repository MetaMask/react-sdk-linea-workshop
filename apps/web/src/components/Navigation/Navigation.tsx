import styles from './Navigation.module.css'
import { SiEthereum } from 'react-icons/si'
import { MetaMaskButton } from '@metamask/sdk-react-ui'

export const Navigation = () => {

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <div><SiEthereum /> ETH Atlantis</div>
        </div>
        <div className={styles.rightNav}>
          <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
        </div>
      </div>
    </div>
  )
}