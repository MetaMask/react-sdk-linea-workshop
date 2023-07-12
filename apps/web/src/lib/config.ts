import * as contractAbi from './contract-abis/ETHTickets.json';

export const baseConfig = {
  '0x13881': {
    name: 'Mumbai',
    contractAddress: '',
    symbol: 'MATIC',
    blockExplorer: 'https://mumbai.polygonscan.com',
    rpcUrl: 'https://rpc-mumbai.maticvigil.com',
  },
  '0xe704': {
    name: 'Linea',
    contractAddress: '',
    symbol: 'LineaETH',
    blockExplorer: 'https://explorer.goerli.linea.build',
    rpcUrl: 'https://rpc.goerli.linea.build',
  },
  '0x5': {
    name: 'Goerli',
    contractAddress: '',
    symbol: 'ETH',
    blockExplorer: 'https://goerli.etherscan.io',
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  }
}



// export const genConfig = Object.fromEntries(
//   Object.entries(contractAbi.networks).map(([networkId, { address }) => {
//     const networkConfig = baseConfig[`0x${parseInt(networkId, 10).toString(16)}` as keyof typeof baseConfig];

//     if (!networkConfig) {
//       throw new Error(`No base config found for network ${networkId}`);
//     }

//     return [`0x${parseInt(networkId, 10).toString(16)}`, { ...networkConfig, contractAddress: address }];
//   })
// );
export const genConfig = [];
/**
 * It returns true if the id is a key of the config object
 * @param {string | null} [id] - The network ID of the network you want to check.
 * @returns A function that takes an id and returns a boolean.
 */
export const isSupportedNetwork = (id?: string | null): id is keyof typeof baseConfig => {
  if (!id) {
    return false
  }
  const isHexChain = id.startsWith('0x')
  const networkId = isHexChain ? id : `0x${Number(id).toString(16)}` // if not hexstring transform to hexString
  // Make sure that networkId is in our supported network and is the current network set in .env
  return !!(networkId in genConfig && import.meta.env.VITE_PUBLIC_NETWORK_ID === networkId)
}