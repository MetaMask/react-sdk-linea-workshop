# ViteJS + React, MetaMask SDK and Linea Testnet

This is an NFT Tickets workshop that utilizes SVG to create onchain SVG NFT tickets for a fictitious event called ETH Atlantis. This README will walk you through a Mono Repo setup using [Turborepo](https://turbo.build/repo). Turborepo is a high-performance build system for JavaScript and TypeScript codebases that simplifies the build process and reduces the maintenance burden and overhead and facilitates monorepo builds.

Inside of our monorepo we have two workspaces "blockchain" and "web".

The blockchain workspace is located in `/apps/blockchain` which utilizes Truffle to deploy a Solidity Smart Contract that will allow us to mint Onchain SVG Tickets for our ticketing.

In our blockchain workspace we have [Typechain](https://github.com/dethcrypto/TypeChain) setup. 

TypeChain is a package specifically designed for devs who use TypeScript and want to interact with Ethereum smart contracts in their web applications. It generates TypeScript bindings based on the Solidity contract code, you get the benefits of type safety and autocompletion and a clear way to communicate and use the underlying smart contracts. It can help you catch errors early in development and improve code readability. It integrates with Ethereum development frameworks and libraries, such as [Truffle](https://trufflesuite.com/), Hardhat, [Ethers](https://docs.ethers.org/), and [Web3JS](https://web3js.readthedocs.io/).

In this project we use:

- [@typechain/ethers-v5](https://github.com/dethcrypto/TypeChain/tree/master/packages/target-ethers-v5)
- [@typechain/truffle-v5](https://github.com/dethcrypto/TypeChain/tree/master/packages/target-truffle-v5)

These two packages target Truffle and Ethers which are the used in this project.

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

One area of the project you should be aware of is your Truffle config located in `/apps/blockchain/truffle-config.js`, here we have the network settings for Linea:

Notice that the API Key (`INFURA_PROJECT_ID`) and the `PRIVATE_KEY` that we just added is being utilized by the blockchain workspace in this config:

```ts
    linea: {
      provider: function () {
        return new HDWalletProvider({
          privateKeys: [process.env.PRIVATE_KEY],
          provider: `https://linea-goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        });
      },
      network_id: 59140,
    },
```

You can also check out the [Truffle Network Configuration docs](https://trufflesuite.com/docs/truffle/reference/configuration/#networks) if you want to know what properties of the network config are and their defaults.

Also, the `VITE_PUBLIC_NETWORK_ID` (hex version of chainId) is being used in the web workspace in the following files:

- `apps/web/src/components/Navigation/Navigation.tsx`
- `apps/web/src/components/Tickets/Tickets.tsx`
- `apps/web/src/hooks/useSwitchNetwork.tsx`
- `apps/web/src/lib/config.ts`
- `~turbo.json`

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

In case you came to this repo from an older companion video, this workshop no longer requires you to copy the contract address from the deployed contract into the `apps/web/src/lib/config.ts` file. Below you will see that our specified chain `Linea` (or any other) looks to the `contractAbi.networks.address` inside of our ABI to find the contract address. So long as you have updated the `apps/web/.env` files `VITE_PUBLIC_NETWORK_ID` to target the specific chainId (using the hex value of the chain), and considering you have deployed a contract successfully to that chain, there is no other work on your part. It's automatic:

Ensure that the key in your `apps/web/src/lib/config.ts` file matches the network key: `networks[Number('0xe704')]`. This is all that needs to be done.

```ts
  '0xe704': {
    name: 'Linea',
    contractAddress: contractAbi.networks[Number('0xe704')]?.address,
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
- Add NFT to MetaMask with AddNFT Button
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