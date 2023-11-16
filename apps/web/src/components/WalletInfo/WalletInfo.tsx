import styles from './WalletInfo.module.css'
import avatarPlaceholder from '../../assets/avatar-placeholder.png'
import networkEnum from '../../utils/networkEnum'

const WalletInfo = props => {

  const { connectedChain, address, balance, ens } = props

  return (
    <>
      {ens?.name ? (
        <span>
          <img className={styles.userAvatar} alt="avatar"
            src={(ens.avatar && ens.avatar.url) ? ens.avatar.url : avatarPlaceholder}
          ></img>
          <div style={{marginLeft: '10px'}}>{ens.name}</div>
        </span>
      ) : (
        address && <span className={styles.userAddress}>{address}</span>
      )}
      {balance != null && (
        <span>
          {Object.keys(balance).map((key, i) => (
            <div key={key}>
              {balance[key]} {key}
            </div>
          ))}
        </span>
      )}
      {connectedChain && connectedChain?.id && (
        <span className={styles.userNetwork}>{networkEnum?.[connectedChain.id] || 'local'} Network</span>
      )}
    </>
  )
}

export default WalletInfo