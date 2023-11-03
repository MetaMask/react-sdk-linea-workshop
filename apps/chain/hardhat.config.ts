import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
        runs: 200,
      },
    },
  },
  defaultNetwork: "localhost",
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
    lineaTestnet: {
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
  // verify: {
  //   etherscan: {
  //     apiKey: `${etherscanApiKey}`,
  //   },
  // },
};

export default config;
