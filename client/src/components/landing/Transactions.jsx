import React, { useContext } from "react";

import { TransactionContext } from "../../context/TransactionContext";

import { shortenAddress } from "../../utils/shortenAddress";

const TransactionsCard = ({ addressFrom, timestamp, message, amount }) => {
  return (
    <div className="p-5 ml-5 mb-5 sm:w-96 w-full min-h-[220px] flex flex-col justify-center items-center blue-glassmorphism">
      <div className="flex flex-col items-center w-full h-full justify-between mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From: {shortenAddress(addressFrom)}
            </p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount, handleReset } =
    useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>

        {transactions.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center mt-10">
            {[...transactions]
              .filter((tx) => parseFloat(tx.amount) > 0.5)
              .reverse()
              .map((transaction, i) => (
                <TransactionsCard key={i} {...transaction} />
              ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-10">No transactions</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
