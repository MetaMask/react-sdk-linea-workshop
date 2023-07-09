# ViteJS + React, MetaMask SDK and Linea Testnet

This branch of the Onchain SVG NFT workshop repo is a workshop that will walk you through a Mono Repo setup using [Turbo](https://turbo.build/) for the build. There is a blockchain project located in `/apps/blockchain` which utilizes Truffle to deploy a Solidity Smart Contract that will allow us to mint Onchain SVG Tickets for a fictitious event named "ETH Atlantis" (not and official ETH Global Event).  

Next we have a client application built with ViteJS + React w/ TypeScript located in `apps/web` that utilizes MetaMask SDK to connect our React application to either MetaMask Browser extension (if installed) or a MetaMask Mobile wallet if a MetaMask browser extension is not found. We show you how to conditionally render UI to connect, switch chains and display wallet information from MetaMask Browser Extension or MetaMask Mobile. As well, we have provided a MetaMask Context Provider and a `useMetaMask` hook to help you manage MetaMask wallet state in the scenario of connecting to either MetaMask Extension or Mobile.

Once this repos is cloned and you have switched to the `vite-linea-sdk` branch using Git. This README will walk you through how to get your project built, your contracts deployed, configure a specific chain in which to deploy your contract to and how to run the client application.

Once running we should be able to Mint new tickets, respond to changes from the wallet like switching of accounts, chain, or updated balance. Finally once the user has minted ticket(s) the minting page will also display those SVG tickets that are stored on the Ethereum blockchain on the minting page so that a user connected with a wallet that has previously purchased tickets can see all NFT tickets that they own.

### Step #01: 

Clone the project and switch to the proper branch:

```bash
git clone https://github.com/MetaMask/react-sdk-linea-workshop && \ 
cd react-sdk-linea-workshop
```

Open in your Editor of choice and install dependencies from root of project:

```bash
npm install
```

Create an Infura account and setup an [Infura](https://www.infura.io) account and create an API Key 

- Network: "Web3 API"
- Name: Choose any name you like

Once the account is created you will want to copy the API key by browsing to the Infura dashboard, selecting the project and clicking on the copy icon to the right of your API Key.

Create Environment Variable file inside the `apps/web` root:

- Rename the file at `apps/web/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

```bash
# Use hexadecimal network id 
#   Linea: '0xe704'
#   Mumbai: '0x13881'
VITE_PUBLIC_NETWORK_ID=[LINEA-HEX-CHAIN-ID-GOES-HERE]

# Get API Key from Infura dashboard:
VITE_PUBLIC_INFURA_PROJECT_ID=[INFURA-API-KEY-GOES-HERE]
```

Create Environment Variable file inside the `apps/blockchain` root:

- Rename the file at `apps/blockchain/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

```bash
# grab from your dashboard, also known as API key
INFURA_PROJECT_ID=[INFURA-API-KEY-GOES-HERE]
# export from your metamask wallet
PRIVATE_KEY=[MM-PRIVATE-KEY-GOES]
```

Build project and compile contracts to generate `apps/web/contract-abis`:

```bash
npm run build
```

Deploy contract on Linea: 

```bash
npm run deploy:linea --workspace blockchain
```

Deploy contract on Mumbai: 

```bash
npm run deploy:mumbai --workspace blockchain
```

Run frontend against deployed contract: 

```bash
npm run dev:testnet
```

What to test:

From here we will first test our client running with MetaMask Browser Extension enabled

- Connect multiple accounts
- Can we change chain and see it reflected in the UI
- Do we get a SwitchChain button and does it work
- Can we change accounts and see it reflected in the UI
- Mint a Ticket NFT
- See the Ticket NFT show up at bottom of page
- Disconnect from both accounts and see it reflected in the UI
- Disable MetaMask Browser Extension
- Connect with MetaMask Mobile
- Switch chains and ensure SwitchChain button shows up in the UI
- Mint a Ticket NFT
- See the Ticket NFT show up at bottom of page
- Disconnect from Metamask Mobile and ensure we are prompted in UI

This is just a demo application, but it covers a lot of the basics you would need in a ral world Dapp that uses MetaMask and gives your users the ability to connect to both Browser Extension and Mobile from their Dapp which up until MetaMask SDK was no easy task.

The SDK is new and we want to hear what you think, what features you would like to see as well, we really want you to apply for the Linea and MetaMask SDK bounties at ETH Waterloo.