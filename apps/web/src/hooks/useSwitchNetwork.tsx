import { genConfig, isSupportedNetwork } from '../lib/config'

export const useSwitchNetwork = () => {
  const networkId = import.meta.env.VITE_PUBLIC_NETWORK_ID

  const switchNetwork = async () => {
    if(!isSupportedNetwork(networkId)) {
      throw new Error('Unsupported network')
    }
  
    await window.ethereum?.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: networkId,
          ...(genConfig[networkId].blockExplorer ? {
            blockExplorerUrls: [genConfig[networkId].blockExplorer]
          } : {}),
          chainName: genConfig[networkId].name,
          nativeCurrency: {
            decimals: 18,
            name: genConfig[networkId].name,
            symbol: genConfig[networkId].symbol,
          },
          rpcUrls: [genConfig[networkId].rpcUrl],
        },
      ],
    })

  }

  return {
    switchNetwork
  }
}
