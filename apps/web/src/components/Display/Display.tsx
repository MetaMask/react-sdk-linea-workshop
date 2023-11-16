import { ethers } from 'ethers'

import Tickets from '~/components/Tickets/Tickets'
import TicketsOwned from '~/components/TicketsOwned/TicketsOwned'
import styles from './Display.module.css'

import { useConnectWallet, useSetChain } from '@web3-onboard/react'
import WalletInfo from '../WalletInfo/WalletInfo'

export const Display = () => {
  const [{ wallet }] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()

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
      priceHexValue: ethGaHex, // '0x2386f26fc10000' *eserialize.com
    },
    {
      type: 'vip',
      event: 'ETH Atlantis',
      description: 'VIP',
      price: ethVip,
      priceHexValue: ethVipHex, // '0x470de4df820000' *eserialize.com
    },
  ]

  return (
    <div className={styles.display}>
      <Tickets tickets={tickets} />
      <TicketsOwned /> 
      <WalletInfo
        connectedChain={wallet ? connectedChain : null}
        address={wallet?.accounts[0]?.address}
        balance={wallet?.accounts[0]?.balance}
        ens={wallet?.accounts[0]?.ens}
      />
    </div>
  )
}