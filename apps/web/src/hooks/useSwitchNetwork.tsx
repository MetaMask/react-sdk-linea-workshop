import { isSupportedNetwork } from '~/lib/isSupportedNetwork'
import { useDappConfig } from '~/hooks/useDappConfig'

export const useSwitchNetwork = () => {
  const { dappConfig } = useDappConfig()

  const switchNetwork = async () => {
    if (!isSupportedNetwork(dappConfig.chainId)) {
      throw new Error('Unsupported network')
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: dappConfig.chainId }],
      })
    } catch (error) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: dappConfig.chainId,
              ...(dappConfig.chainInfo?.blockExplorer
                ? {
                    blockExplorerUrls: [dappConfig.chainInfo?.blockExplorer],
                  }
                : {}),
              chainName: dappConfig.chainInfo?.name,
              nativeCurrency: {
                decimals: 18,
                name: dappConfig.chainInfo?.name,
                symbol: dappConfig.chainInfo?.symbol,
              },
              rpcUrls: [dappConfig.chainInfo?.rpcUrl],
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
