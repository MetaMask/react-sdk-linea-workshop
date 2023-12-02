import { isSupportedNetwork } from '~/lib/isSupportedNetwork'
import config from '../lib/config.json'

export const useDappConfig = () => {
  const chainId = import.meta.env.VITE_PUBLIC_CHAIN_ID

  // strongly typed or fallback to linea if not a valid chain
  const chainInfo = isSupportedNetwork(chainId)
    ? config[chainId]
    : config['0xe704']
  
  return { dapp:  { chainId, chainInfo } }
}
