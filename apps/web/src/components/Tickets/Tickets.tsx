/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ETHTickets__factory } from 'blockchain'
import { ethers } from 'ethers'
import { config, isSupportedNetwork } from '~/lib/config'

import { SiEthereum } from 'react-icons/si'

import styles from './Tickets.module.css'
import { useAppState } from '~/hooks/useAppContext'
import { useSDK } from '@metamask/sdk-react-ui'

interface Ticket {
  type: string,
  event: string,
  description: string,
  price: string,
  priceHexValue: string,
}
interface TicketsProps {
  tickets: Ticket[],
}

const TicketTypes: React.FC<Ticket> = ({
  description, price, priceHexValue,
}) => {

  const { setError, updateMints } = useAppState()
  const [isMinting, setIsMinting] = useState(false)
  const { account } = useSDK()

  const mintTicket = async() => {
    setIsMinting(true)

    const provider = new ethers.providers.Web3Provider(
      window.ethereum as unknown as ethers.providers.ExternalProvider,
    )
    // In ethers.js, providers allow you to query data from the blockchain. 
    // They represent the way you connect to the blockchain. 
    // With them you can only call view methods on contracts and get data from those contract.
    // Signers are authenticated providers connected to the current address in MetaMask.
    const signer = provider.getSigner()

    const factory = new ETHTickets__factory(signer)
    const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID
    
    if(!isSupportedNetwork(networkId)) {
      throw new Error('Set either `0x5` for goerli or `0x13881` for mumbai in apps/web/.env or .env.local')
    }
    
    const nftTickets = factory.attach(config[networkId].contractAddress)

    if (window.ethereum) {
      nftTickets
      .mintNFT({
        from: account,
        value: priceHexValue,
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then(async (tx: any) => {
        console.log('minting accepted')
        await tx.wait(1)
        console.log(`Minting complete, mined: ${tx}`)
        updateMints()
        setIsMinting(false)
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => {
        console.log(error)
        setError(error?.code)
        setIsMinting(false)
      })
    }
  }

  const disableMint = !account || isMinting

  return (
    <div className={styles.flexItem}>
      <div className={styles.ticketType}>
        <h2>{description}</h2>
        <p>{price} ETH</p>
        <button disabled={disableMint} onClick={mintTicket}>
          <SiEthereum /> {isMinting ? 'Minting...' : 'Mint'} Ticket
        </button>
      </div>
    </div>
  )
}

const Tickets = ({ tickets }: TicketsProps) => {
  return (
    <div className={styles.ticketsView}>
      <h1>Ticket Types</h1>
      <div className={styles.flexContainer}>
        {tickets.map((ticket) => (
          <TicketTypes key={ticket.type} {...ticket} />
        ))}
      </div>
    </div>
  )
}

export default Tickets