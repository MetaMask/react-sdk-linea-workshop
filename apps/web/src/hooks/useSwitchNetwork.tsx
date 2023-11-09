import { isSupportedNetwork } from '~/lib/isSupportedNetwork'
import config from '../lib/config.json'

export const useSwitchNetwork = () => {
  const networkId = import.meta.env.VITE_PUBLIC_CHAIN_ID

  const switchNetwork = async () => {
    if (!isSupportedNetwork(networkId)) {
      throw new Error('Unsupported network')
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: networkId }],
      })
    } catch (error) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: networkId,
              ...(config[networkId].blockExplorer
                ? {
                    blockExplorerUrls: [config[networkId].blockExplorer],
                  }
                : {}),
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
      } catch (error) {
        // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
        console.log(`wallet_addEthereumChain Error: ${error.message}`)
      }
      // handle other "switch" errors
    }
  }

  return { switchNetwork }
}
