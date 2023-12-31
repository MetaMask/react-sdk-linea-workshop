import { useState } from 'react'
import styles from './Tickets.module.css'
import { SiEthereum } from 'react-icons/si'
import { ethers } from 'ethers'

import { abi } from '../../lib/artifacts/contracts/ETHTickets.sol/ETHTickets.json'
import { ETHTickets } from '@workshop/blockchain'

import { isSupportedNetwork } from '~/lib/isSupportedNetwork'
import { useDappConfig } from '~/hooks/useDappConfig'
import { useMetaMask } from '~/hooks/useMetaMask'

interface Ticket {
  type: string
  event: string
  description: string
  price: string
  priceHexValue: string
}
interface TicketsProps {
  tickets: Ticket[]
}

const TicketTypes: React.FC<Ticket> = ({
  description,
  price,
  priceHexValue,
}) => {
  const { dapp } = useDappConfig()
  const { wallet, setError, updateMints } = useMetaMask()
  const [isMinting, setIsMinting] = useState(false)

  const mintTicket = async () => {
    setIsMinting(true)

    // A provider allows you connection to and ability to query data from Ethereum.
    // With them you can only call view methods on contracts and get data from those contracts.
    const provider = new ethers.BrowserProvider(window.ethereum)

    // Signers are authenticated providers connected to the current address in MetaMask.
    const signer = await provider.getSigner()

    if (!isSupportedNetwork(dapp.chainId)) {
      throw new Error('Set either `0x5` for goerli or `0x13881` for mumbai in apps/web/.env or .env.local')
    }

    if (wallet.accounts.length > 0) {
      const nftTickets = new ethers.Contract(
        dapp.chainInfo?.contractAddress, abi, signer
      ) as unknown as ETHTickets

      nftTickets
        .mintNFT({
          from: wallet.address!,
          value: priceHexValue,
        })
        .then(async (tx: any) => {
          console.log('minting accepted')
          await tx.wait(1)
          console.log(`Minting complete, mined: ${tx}`)
          updateMints()
          setIsMinting(false)
        })
        .catch((error: any) => {
          console.log(error)
          setError(error?.code)
          setIsMinting(false)
        })
    }
  }

  const disableMint = !wallet.address || isMinting

  return (
    <div className={styles.flexItem}>
      <div className={styles.ticketType}>
        <h2>{description}</h2>
        <p>{price} ETH</p>
        <button disabled={disableMint} onClick={mintTicket}>
          <SiEthereum /> {isMinting ? "Minting..." : "Mint"} Ticket
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
