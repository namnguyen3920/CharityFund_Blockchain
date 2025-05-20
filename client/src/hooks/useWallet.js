import { useState, useEffect } from "react";

export const useWallet = () => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getAddress = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAddress(accounts[0] || null);
      }
    };

    getAddress();

    const handleAccountsChanged = (accounts) => {
      setAddress(accounts[0] || null);
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return address;
};

// import { useEffect, useState } from "react";
// import { useAddress } from "@thirdweb-dev/react";

// export const useWallet = () => {
//   const address = useAddress();
//   const [connectedAddress, setConnectedAddress] = useState(null);

//   useEffect(() => {
//     if (address) {
//       setConnectedAddress(address);
//     }
//   }, [address]);

//   return connectedAddress;
// };

// const useWallet = () => {
//   const [currentAddress, setCurrentAddress] = useState("");

//   useEffect(() => {
//     const { ethereum } = window;

//     if (!ethereum || !ethereum.on) return;

//     const updateAddress = async () => {
//       const accounts = await ethereum.request({ method: "eth_accounts" });
//       setCurrentAddress(accounts?.[0] || "");
//     };

//     updateAddress();

//     const handleAccountsChanged = (accounts) => {
//       setCurrentAddress(accounts?.[0] || "");
//     };

//     ethereum.on("accountsChanged", handleAccountsChanged);

//     return () => {
//       ethereum.removeListener("accountsChanged", handleAccountsChanged);
//     };
//   }, []);

//   return currentAddress;
// };

// export default useWallet;
