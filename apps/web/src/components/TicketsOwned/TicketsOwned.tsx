import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import { ETHTickets__factory } from 'blockchain'
import { config, isSupportedNetwork } from '../../lib/config'
import { useMetaMask } from '../../hooks/useMetaMask'
import styles from './TicketsOwned.module.css'

type NftData = {
  name: string,
  description: string,
  attributes: { trait_type: string, value: string }[],
  owner: string,
  image: string
}

type TicketFormatted = {
  tokenId: string,
  svgImage: string,
  ticketType: { trait_type: string, value: string }
}

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormatted[]>([])
  const { wallet, sdkConnected } = useMetaMask()

  const listOfTickets = ticketCollection.map((ticket) => (
    <div className={styles.svgItem} key={`ticket${ticket.tokenId}`}>
      <img
        width={200}
        height={200}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
    </div>
  ))

  useEffect(() => {
    console.log('ticketsOwned: UseEffect')
    if (typeof window !== 'undefined' && wallet.address !== null && window.ethereum) {

      const provider = new ethers.providers.Web3Provider(
        window.ethereum as unknown as ethers.providers.ExternalProvider,
      )
      const signer = provider.getSigner()
      const factory = new ETHTickets__factory(signer)

      if (!isSupportedNetwork(wallet.chainId)) {
        return
      }

      const nftTickets = factory.attach(config[wallet.chainId].contractAddress)
      const ticketsRetrieved: TicketFormatted[] = []

      nftTickets.walletOfOwner(wallet.address)
        .then((ownedTickets) => {
          const promises = ownedTickets.map(async (token) => {
            const currentTokenId = token.toString()
            const currentTicket = await nftTickets.tokenURI(currentTokenId)

            const base64ToString = window.atob(
              currentTicket.replace('data:application/json;base64,', ''),
            )
            const nftData: NftData = JSON.parse(base64ToString)

            ticketsRetrieved.push({
              tokenId: currentTokenId,
              svgImage: nftData.image,
              ticketType: nftData.attributes.find(
                (ticket) => ticket.trait_type === 'Ticket Type',
              ),
            } as TicketFormatted)
          })
          Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved))
        })
    }
  }, [wallet.address, wallet.chainId, sdkConnected])

  return (
    <div className={styles.ticketsOwnedView}>
      <div className={styles.ticketGrid}>{listOfTickets}</div>
    </div>
  )
}

export default TicketsOwned