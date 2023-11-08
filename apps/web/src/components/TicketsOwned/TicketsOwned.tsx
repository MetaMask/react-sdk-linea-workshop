import { useState, useEffect } from "react";
import { ethers } from "ethers";

import config from "../../lib/config.json";
import { useMetaMask } from "../../hooks/useMetaMask";
import styles from "./TicketsOwned.module.css";

import { isSupportedNetwork } from "~/lib/isSupportedNetwork";

import { abi } from '../../lib/artifacts/contracts/ETHTickets.sol/ETHTickets.json'
import { ETHTickets } from "@workshop/blockchain";

type NftData = {
  name: string;
  description: string;
  attributes: { trait_type: string; value: string }[];
  owner: string;
  image: string;
};

type TicketFormatted = {
  tokenId: string;
  svgImage: string;
  ticketType: { trait_type: string; value: string };
};

const chainId = import.meta.env.VITE_PUBLIC_CHAIN_ID;

const TicketsOwned = () => {
  const [ticketCollection, setTicketCollection] = useState<TicketFormatted[]>([]);
  const { wallet, sdkConnected, mints } = useMetaMask();

  const addNft = async (tokenId: string) => {
    console.log(`tokenId: `, tokenId);
    console.log(`networkId: `, Number(chainId));

    try {
      await window.ethereum?.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC721",
          options: {
            address: config[chainId].contractAddress,
            tokenId: tokenId,
          },
        },
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const listOfTickets = ticketCollection.map((ticket) => (
    <div className={styles.svgItem} key={`ticket${ticket.tokenId}`}>
      <img
        width={200}
        height={200}
        src={ticket.svgImage}
        alt={`Ticket# ${ticket.tokenId}`}
      />
      <div>
        <button id={ticket.tokenId} onClick={() => addNft(ticket.tokenId)}>
          AddNFT
        </button>
      </div>
    </div>
  ));

  const walletOfOwner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const chainId = import.meta.env.VITE_PUBLIC_CHAIN_ID;

    if (!isSupportedNetwork(chainId)) {
      throw new Error(
        "Set either `0x5` for goerli or `0x13881` for mumbai in apps/web/.env or .env.local"
      );
    }

    if (wallet.accounts.length > 0) {
      const nftTickets = new ethers.Contract(
        config[chainId].contractAddress,
        abi,
        signer
      ) as unknown as ETHTickets;

      const ticketsRetrieved: TicketFormatted[] = [];

      nftTickets
        .walletOfOwner(wallet.address!)
        .then((ownedTickets) => {
          console.log(`ownedTickets`, ownedTickets)
          const promises = ownedTickets.map(async (token) => {
            const currentTokenId = token.toString();
            const currentTicket = await nftTickets.tokenURI(currentTokenId);

            const base64ToString = window.atob(
              currentTicket.replace("data:application/json;base64,", "")
            );
            const nftData: NftData = JSON.parse(base64ToString);

            ticketsRetrieved.push({
              tokenId: currentTokenId,
              svgImage: nftData.image,
              ticketType: nftData.attributes.find(
                (ticket) => ticket.trait_type === "Ticket Type"
              ),
            } as TicketFormatted);
          });
          Promise.all(promises).then(() => setTicketCollection(ticketsRetrieved));
        })
        .catch((error) => {
          console.log(`error`, error)
        })
    }
  };


  useEffect(() => {
    if (typeof window !== "undefined" && wallet.address !== null && window.ethereum) {
      if (!isSupportedNetwork(wallet.chainId)) {
        return;
      }
      walletOfOwner()
    }
  }, [wallet.address, mints, wallet.chainId, sdkConnected]);

  return (
    <div className={styles.ticketsOwnedView}>
      <div className={styles.ticketGrid}>{listOfTickets}</div>
    </div>
  );
};

export default TicketsOwned;
