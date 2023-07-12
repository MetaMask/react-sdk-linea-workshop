import { config, isSupportedNetwork } from '../lib/config'

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
          ...(config[networkId].blockExplorer ? {
            blockExplorerUrls: [config[networkId].blockExplorer]
          } : {}),
          chainName: config[networkId].name,
          nativeCurrency: {
            decimals: 18,
            name: config[networkId].name,
            symbol: config[networkId].symbol,
          },
          rpcUrls: [config[networkId].rpcUrl],
        },
      ],
    })

  }

  return {
    switchNetwork
  }
}
