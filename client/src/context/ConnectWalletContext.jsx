import { createContext, useContext } from "react";
import { useMetamask, useDisconnect, useAddress } from "@thirdweb-dev/react";

const WalletContext = createContext();

export const ConnectWalletProvider = ({ children }) => {
  const connect = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <WalletContext.Provider value={{ connect, disconnect, address }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
