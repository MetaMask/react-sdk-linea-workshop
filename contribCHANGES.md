# Changes for Config.ts

This project is a web application that interacts with a deployed Ethereum contract. The configuration is automatically generated from the contract's ABI (Application Binary Interface) file.

## Dynamic Configuration Generation (genConfig)

One of the unique aspects of this project is that the configuration for the Ethereum networks and contracts is dynamically generated from the contract ABI file.

In the `config.ts` file, you will find an object `baseConfig`. This object contains some base configuration for Ethereum networks like Mumbai, Linea, and Goerli. However, the `contractAddress` field is missing from this base configuration.

Instead of manually entering contract addresses in the `baseConfig` object, we have an additional object `genConfig` in the same file which automatically pulls the correct contract addresses from the contract ABI file upon deployment. This is achieved through the use of TypeScript generics.

Here is the code that generates `genConfig`:

```typescript
export const genConfig = Object.fromEntries(
  Object.entries(contractAbi.networks).map(([networkId, { address }]) => {
    const networkConfig = baseConfig[`0x${parseInt(networkId, 10).toString(16)}` as keyof typeof baseConfig];

    if (!networkConfig) {
      throw new Error(`No base config found for network ${networkId}`);
    }

    return [`0x${parseInt(networkId, 10).toString(16)}`, { ...networkConfig, contractAddress: address }];
  })
);
```

In the above code, we are iterating over each network present in the `networks` field of the contract ABI object. For each network, we fetch its corresponding base configuration from the `baseConfig` object and then add the contract address from the ABI file to it.

This helps to automate the process of configuring network settings and contract addresses in the application, making it easier to manage and reducing potential for errors.

## Checking Network Support

The `isSupportedNetwork` function checks if the given network id is supported by our application:

```typescript
export const isSupportedNetwork = (id?: string | null): id is keyof typeof baseConfig => {
  if (!id) {
    return false
  }
  const isHexChain = id.startsWith('0x')
  const networkId = isHexChain ? id : `0x${Number(id).toString(16)}` // if not hexstring transform to hexString
  // Make sure that networkId is in our supported network and is the current network set in .env
  return !!(networkId in genConfig && import.meta.env.VITE_PUBLIC_NETWORK_ID === networkId)
}
```

The function returns `true` if the network id is supported by our application, otherwise, it returns `false`.

This completes the overview of the dynamic configuration in the application. By using the contract ABI file and TypeScript generics, we have created a more efficient and error-free system to handle configuration for different Ethereum networks and contracts.
