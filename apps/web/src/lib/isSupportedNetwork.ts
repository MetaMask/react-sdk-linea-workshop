import config from './config.json'

/**
 * It returns true if the id is a key of the config object
 * @param {string | null} [id] - The network ID of the network you want to check.
 * @returns A function that takes an id and returns a boolean.
 */
export const isSupportedNetwork = (
  id?: string | null
): id is keyof typeof config => {
  if (!id) {
    return false
  }
  const isHexChain = id.startsWith('0x')
  const chainId = isHexChain ? id : `0x${Number(id).toString(16)}` // if not hexstring transform to hexString
  // Make sure that chainId is in our supported network and is the current network set in .env
  return !!(
    chainId in config && import.meta.env.VITE_PUBLIC_CHAIN_ID === chainId
  )
}
