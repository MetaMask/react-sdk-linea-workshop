# ViteJS + React, MetaMask SDK and Linea Testnet

This is an NFT Tickets workshop that utilizes an Ethereum contract to create onchain SVG NFT tickets for a fictitious event called ETH Atlantis. It uses [Turborepo](https://turbo.build/repo) to host both a `blockchain` and `web` project. Turborepo is a high-performance build system for JavaScript and TypeScript codebases simplifying the build process and reducing the maintenance burden and overhead and facilitates monorepo builds.  

The blockchain workspace is located in `/apps/blockchain` which utilizes Hardhat to deploy a Solidity Smart Contract that will allow us to mint Onchain SVG Tickets for our ticketing event.

In our blockchain workspace we have [Typechain](https://github.com/dethcrypto/TypeChain) setup in order to have the ability in our `web` project to work with our contract using types. 

TypeChain is a package specifically designed for devs who use TypeScript and want to interact with Ethereum smart contracts in their web applications. It generates TypeScript bindings based on the Solidity contract code, you get the benefits of type safety and autocompletion and a clear way to communicate and use the underlying smart contracts. It can help you catch errors early in development and improve code readability. It integrates with Ethereum development frameworks and libraries, such as [Hardhat](https://hardhat.org/hardhat-runner/docs/guides/typescript#typescript-support), [Ethers](https://docs.ethers.org/), and [Web3JS](https://web3js.readthedocs.io/).

In this project we use:

- [@typechain/ethers-v6](https://github.com/dethcrypto/TypeChain/tree/master/packages/target-ethers-v6)
- [@typechain/hardhat](https://github.com/dethcrypto/TypeChain/tree/master/packages/hardhat)

The web workspace is a client application built with ViteJS + React w/ TypeScript located in `apps/web` that utilizes [MetaMask SDK](https://docs.metamask.io/wallet/how-to/connect/set-up-sdk/javascript/react/) to connect our React application to either MetaMask Browser extension or MetaMask Mobile wallet. We show you how to conditionally render UI to connect, switch chains and display wallet information from MetaMask Browser Extension or MetaMask Mobile. As well, we have provided a MetaMask Context Provider and a `useMetaMask` hook to help you manage MetaMask wallet state in the scenario of connecting to either MetaMask Extension or MetaMask Mobile.

Once this repos is cloned this README will walk you through how to get your project built, your contracts deployed, configure a specific chain in which to deploy your contract to and how to run the client application and guide you through manually testing the frontend to ensure you understand it's features.

Once running we should be able to Mint tickets, respond to changes from the wallet like switching of accounts, chain, or updated balance. 

Finally, once the user has minted ticket(s) the minting page will also display those SVG tickets on the page using a function in our contract called `walletOfOwner` which returns the tokenIds so that we can iterate through them, and for each one call another method `tokenURI` on the contract allowing us to render those SVG NFTs on the page. This ensures that as our users mint tickets, they get immediate visual feedback of the tickets they own with the connected wallet.

Suggested NPM version is node v20+

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

Create an [Infura](https://www.infura.io) account and create an API Key.

- Network: "Web3 API"
- Name: Choose any name you like

Once the account is created you will want to copy the API key by browsing to the Infura dashboard, selecting the project and clicking on the copy icon to the right of your API Key.

Create an Environment Variable file inside the `apps/web` root:

- Rename the file at `apps/web/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

```bash
# Use hexadecimal Ethereum chain id 
# ALTERNATE CHAINS AVAILABLE ON CHAINLIST.ORG
#   Linea: '0xe704'
#   Mumbai: '0x13881'
VITE_PUBLIC_CHAIN_ID=0xe704
```

Create Environment Variable file inside the `apps/blockchain` root:

- Rename the file at `apps/blockchain/.env.example` to `.env`
- At this point the `.env` file are no longer tracked by Git

```bash
# grab from your dashboard, also known as API key
INFURA_API_KEY=[INFURA-API-KEY-GOES-HERE]
# export from your metamask wallet
PRIVATE_KEY=[MM-PRIVATE-KEY-GOES-HERE]
```

One area of the project you should be aware of is your Hardhat config located in `/apps/blockchain/hardhat.config.ts`, here we have the network settings for Linea and Mumbai:

Notice that the API Key (`INFURA_API_KEY`) and the `PRIVATE_KEY` that we just added is being utilized by the blockchain workspace in this config:

```ts
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
  },
  paths: {
    artifacts: "../web/src/lib/artifacts",
  },
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
    lineaTestnet: {
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
}
```

### Step #04

Once logged into Infura, you can get LineaETH from the [Infura Faucet](https://www.infura.io/faucet/linea).

### Step #05

Build the entire project checking for errors etc:

```bash
npm run build
```

### Step #06

Deploy contract on Linea: 

```bash
npm run deploy:lineatest --workspace @workshop/blockchain
```

Deploy contract on Mumbai: 

```bash
npm run deploy:mumbai --workspace @workshop/blockchain
```

__**Running these deploy scripts utilizes the deploy.js file which will copy the contract address to `/apps/web/src/lib/config.json` automatically**__

```js
  '0xe704': {
    name: 'Linea',
    contractAddress: 'CONTRACT_ADDRESS_OF_DEPLOYED_CONTRACT',
    symbol: 'LineaETH',
    blockExplorer: 'https://explorer.goerli.linea.build',
    rpcUrl: 'https://rpc.goerli.linea.build',
  },
```
### Step #07

Run the web project against our deployed contract: 

```bash
npm run dev:testnet
```

### Step #08

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

### Step #09

Test the Frontend with MetaMask Mobile

- Connect with MetaMask Mobile
- Switch chains and ensure SwitchChain button shows up in the UI
- Mint a Ticket NFT
- See the Ticket NFT show up at bottom of page
- Disconnect from Metamask Mobile and ensure we are prompted in UI

### Step 10

If you made it through this tutorial, consider saving the repo for future reference, as long as it is not archived it will continuously be updated and maintained to work with the MetaMask SDK, Linea, and Hardhat. Share it with anyone you like and feel free to fork, clone, modify, contribute or outright steal anything in this workshop. It's fair use and open source.

This is just a demo application, but it covers a lot of the basics you would need in a ral world Dapp that uses MetaMask and gives your users the ability to connect to both Browser Extension and Mobile from their Dapp which up until MetaMask SDK was no easy task.

The SDK is new and we want to hear what you think, what features you would like to see as well, we really want you to apply for the Linea and MetaMask SDK bounties at ETH Waterloo.