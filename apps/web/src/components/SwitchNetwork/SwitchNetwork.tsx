import { useSwitchNetwork } from '~/hooks/useSwitchNetwork'
import styles from './SwitchNetwork.module.css'

const SwitchNetwork = () => {
  const { switchNetwork } = useSwitchNetwork()
  return (
    <button className={styles.switchNetwork} onClick={switchNetwork}>
      Switch Chain
    </button>
  )
}

export default SwitchNetwork