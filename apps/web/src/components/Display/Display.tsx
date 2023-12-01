import Tickets from '~/components/Tickets/Tickets'
import TicketsOwned from '~/components/TicketsOwned/TicketsOwned'
import styles from './Display.module.css'
import { useDappConfig } from '~/hooks/useDappConfig'

export const Display = () => {
  const { dappConfig } = useDappConfig()

  const ethGa = '0.01'
  const ethVip = '0.02'
  const ethGaHex = '0x2386f26fc10000' // '0x2386f26fc10000' *eserialize.com
  const ethVipHex = '0x470de4df820000' // '0x470de4df820000' *eserialize.com

  const tickets = [
    {
      type: 'ga',
      event: 'ETH Atlantis',
      description: 'General Admission',
      price: ethGa,
      priceHexValue: ethGaHex,
    },
    {
      type: 'vip',
      event: 'ETH Atlantis',
      description: 'VIP',
      price: ethVip,
      priceHexValue: ethVipHex,
    },
  ]

  return (
    <div className={styles.display}>
    { dappConfig.chainInfo?.contractAddress !== ""
      ? <>
          <Tickets tickets={tickets} /> 
          <TicketsOwned />
        </>
      : <div className={styles.error}>
          No ETH Atlantis Contract Deployed or
          <br/>contract address not in config for chain:  
          <code className={styles.chain}> {dappConfig.chainId}</code>.
        </div>
    }
    </div>
  )
}
