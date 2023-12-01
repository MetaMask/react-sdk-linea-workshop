import { isSupportedNetwork } from '~/lib/isSupportedNetwork'
import { useDappConfig } from '~/hooks/useDappConfig'

export const useSwitchNetwork = () => {
  const { dapp } = useDappConfig()

  const switchNetwork = async () => {
    if (!isSupportedNetwork(dapp.chainId)) {
      throw new Error('Unsupported network')
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: dapp.chainId }],
      })
    } catch (error) {
      try {
        await window.ethereum?.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: dapp.chainId,
              ...(dapp.chainInfo?.blockExplorer
                ? {
                    blockExplorerUrls: [dapp.chainInfo?.blockExplorer],
                  }
                : {}),
              chainName: dapp.chainInfo?.name,
              nativeCurrency: {
                decimals: 18,
                name: dapp.chainInfo?.name,
                symbol: dapp.chainInfo?.symbol,
              },
              rpcUrls: [dapp.chainInfo?.rpcUrl],
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
