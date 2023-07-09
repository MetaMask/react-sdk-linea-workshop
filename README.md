# ViteJS + React, MetaMask SDK and Linea Testnet

This is an NFT Tickets workshop that utilizes SVG to create onchain SVG NFT tickets for a fictitious event called ETH Atlantis. This README will walk you through a Mono Repo setup using [Turborepo](https://turbo.build/repo). Turborepo is a high-performance build system for JavaScript and TypeScript codebases that simplifies the build process and reduces the maintenance burden and overhead and facilitates monorepo builds.

Inside of our monorepo we have two workspaces "blockchain" and "web".

The blockchain workspace is located in `/apps/blockchain` which utilizes Truffle to deploy a Solidity Smart Contract that will allow us to mint Onchain SVG Tickets for our ticketing.

In our blockchain workspace we have [Typechain](https://github.com/dethcrypto/TypeChain) setup. 

TypeChain is a package specifically designed for devs who use TypeScript and want to interact with Ethereum smart contracts in their web applications. It generates TypeScript bindings based on the Solidity contract code, you get the benefits of type safety and autocompletion and a clear way to communicate and use the underlying smart contracts. It can help you catch errors early in development and improve code readability. It integrates with Ethereum development frameworks and libraries, such as [Truffle](https://trufflesuite.com/), Hardhat, [Ethers](https://docs.ethers.org/), and [Web3JS](https://web3js.readthedocs.io/).

In summary, TypeChain empowers TypeScript developers to efficiently work with smart contracts, providing them with type safety and improved development experience when building web applications on the Ethereum blockchain.

The web workspace is a client application built with ViteJS + React w/ TypeScript located in `apps/web` that utilizes MetaMask SDK to connect our React application to either MetaMask Browser extension (if installed) otherwise a MetaMask Mobile wallet. We show you how to conditionally render UI to connect, switch chains and display wallet information from MetaMask Browser Extension or MetaMask Mobile. As well, we have provided a MetaMask Context Provider and a `useMetaMask` hook to help you manage MetaMask wallet state in the scenario of connecting to either MetaMask Extension or Mobile.

Once this repos is cloned this README will walk you through how to get your project built, your contracts deployed, configure a specific chain in which to deploy your contract to and how to run the client application and guide you through manually testing the frontend to ensure you understand it's features.

Once running we should be able to Mint tickets, respond to changes from the wallet like switching of accounts, chain, or updated balance. Finally once the user has minted ticket(s) the minting page will also display those SVG tickets that are stored on the Ethereum blockchain on the minting page so that a user connected with a wallet that has previously purchased tickets can see all NFT tickets that they own.

### Step #01

Clone the project and switch to the proper branch:

```bash
git clone https://github.com/MetaMask/react-sdk-linea-workshop && \ 
cd react-sdk-linea-workshop
```
### Step #02

Open in your Editor of choice and install dependencies from root of project:

```bash
npm install
```

### Step #03

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

### Step #04

Get some LineaETH from the Infura Faucet located at: [infura.io/faucet/linea](https://www.infura.io/faucet/linea)

### Step #05

Build project and compile contracts to generate `apps/web/contract-abis`:

```bash
npm run build
```

### Step #06

Deploy contract on Linea: 

```bash
npm run deploy:linea --workspace blockchain
```

Deploy contract on Mumbai: 

```bash
npm run deploy:mumbai --workspace blockchain
```

### Step #07

Copy the contract address to the `apps/web/lib/config.ts`:

```ts
  '0xe704': {
    name: 'Linea',
    contractAddress: '[CONTRACT-ADDRESS]',
    symbol: 'LineaETH',
    blockExplorer: 'https://explorer.goerli.linea.build',
    rpcUrl: 'https://rpc.goerli.linea.build',
  },
```
### Step #08

Run frontend against deployed contract: 

```bash
npm run dev:testnet
```

### Step #09

Test the Frontend with MetaMask Browser Extension

- Connect multiple accounts
- Change chain and see it reflected in the UI
  - Do we get a SwitchChain button and does it work
- Can we change accounts and see it reflected in the UI
- Mint a Ticket NFT
- See the Ticket NFT show up at bottom of page
- Disconnect from both accounts and see it reflected in the UI
- Disable MetaMask Browser Extension

### Step #10

Test the Frontend with MetaMask Mobile

- Connect with MetaMask Mobile
- Switch chains and ensure SwitchChain button shows up in the UI
- Mint a Ticket NFT
- See the Ticket NFT show up at bottom of page
- Disconnect from Metamask Mobile and ensure we are prompted in UI

This is just a demo application, but it covers a lot of the basics you would need in a ral world Dapp that uses MetaMask and gives your users the ability to connect to both Browser Extension and Mobile from their Dapp which up until MetaMask SDK was no easy task.

The SDK is new and we want to hear what you think, what features you would like to see as well, we really want you to apply for the Linea and MetaMask SDK bounties at ETH Waterloo.