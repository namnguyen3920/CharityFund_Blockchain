import React, { Children, useEffect, useState } from "react";
import { ethers } from "ethers";
import { transactionABI, transactionAddress } from "../utils/constants";
import Cookies from "js-cookie";

export const TransactionContext = React.createContext();

const getTransactionContract = () => {
  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    transactionAddress,
    transactionABI,
    signer
  );

  console.log({
    provider,
    signer,
    transactionContract,
  });

  return transactionContract;
};

export const TransactionsProvider = ({ children }) => {
  const { ethereum } = window;
  const [formData, setformData] = useState({
    amount: "",
    message: "",
    fundAddress: "",
  });

  const [currentAddress, setcurrentAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);
  const [isConnectedWallet, setIsConnecting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "amount" && +value <= 0 ? "0" : value;
    console.log("changed", name, newValue);
    setformData((prvstate) => ({ ...prvstate, [name]: value }));
  };

  const handleReset = async () => {
    const contract = getTransactionContract();
    const tx = await contract.resetTransactions();
    await tx.wait();
    window.location.reload();
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getTransactionContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            receiver: transaction.receiver,
            sender: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    if (isConnectedWallet) return;
    setIsConnecting(true);

    if (!ethereum) {
      alert("Please install MetaMask.");
      setIsConnecting(false);
      return;
    }

    try {
      window.__CONNECTING_WALLET__ = true;

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      if (account) {
        setcurrentAddress(account);

        Cookies.set("connectedAddress", account, {
          expires: 1,
        });

        console.log("Wallet connected:", account);
      }
      //window.location.reload();
    } catch (error) {
      console.error("Connect Wallet Error:", error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const sendTransaction = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("No ethereum object");
      return;
    }

    try {
      const { amount, message, fundAddress } = formData;
      const transactionsContract = getTransactionContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      const tx = await transactionsContract.donateToFund(fundAddress, message, {
        value: parsedAmount,
      });

      setIsLoading(true);
      console.log(`Loading - ${tx.hash}`);
      await tx.wait();
      console.log(`Success - ${tx.hash}`);
      setIsLoading(false);

      const count = await transactionsContract.getTransactionCount();
      setTransactionCount(count.toNumber());

      window.location.reload();
    } catch (error) {
      console.error("sendTransaction error:", error);
      setIsLoading(false);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setcurrentAddress(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = getTransactionContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkTransactions();
  }, [transactionCount]);
  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        handleReset,
        currentAddress,
        handleChange,
        formData,
        isLoading,
        sendTransaction,
        connectWallet,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
