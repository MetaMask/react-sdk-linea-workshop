import { SiEthereum } from "react-icons/si";
import { useMetaMask } from "~/hooks/useMetaMask";
import { formatAddress, formatChainAsNum } from "~/utils";
import config from "~/lib/config.json";
import SwitchNetwork from "~/components/SwitchNetwork/SwitchNetwork";
import styles from "./Navigation.module.css";
import { isSupportedNetwork } from "~/lib/isSupportedNetwork";

export const Navigation = () => {
  const { wallet, isConnecting, connectMetaMask, sdk, sdkConnected } =
    useMetaMask();
  const networkId = import.meta.env.VITE_PUBLIC_CHAIN_ID;
  const walletChainSupported = isSupportedNetwork(wallet.chainId);

  // now chainInfo is strongly typed or fallback to linea if not a valid chain
  const chainInfo = isSupportedNetwork(networkId)
    ? config[networkId]
    : config["0xe704"];

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>
          <SiEthereum /> ETH Atlantis
        </div>
        <div className={styles.rightNav}>
          {wallet.accounts.length < 1 && (
            <button onClick={connectMetaMask}>Connect MetaMask</button>
          )}
          <>
            {wallet.accounts.length > 0 && (
              <div className={styles.tag}>
                {sdk.isExtensionActive() ? "EXTENSION" : "MOBILE"}
              </div>
            )}
            {wallet.accounts.length > 0 &&
              !isSupportedNetwork(wallet.chainId) && <SwitchNetwork />}
            {wallet && wallet.accounts.length > 0 && (
              <>
                {/* <button onClick={async () => sdk.terminate()}>
                  Terminate
                </button> */}
                {walletChainSupported && (
                  <a
                    href={`${chainInfo?.blockExplorer}/address/${chainInfo?.contractAddress}`}
                    target="_blank"
                    title="Open in Block Explorer"
                  >
                    {chainInfo.name}:{formatChainAsNum(wallet.chainId)}
                  </a>
                )}
                &nbsp;|&nbsp;
                <a
                  href={`https://etherscan.io/address/${wallet}`}
                  target="_blank"
                  title="Open in Block Explorer"
                >
                  {formatAddress(wallet.address)}
                </a>
                <div className={styles.balance}>{wallet.balance} ETH</div>
                <div>
                  <button onClick={() => sdk.terminate()}>DISCONNECT</button>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
