import React, { useContext, useMemo, useState, useEffect } from "react";

import { TransactionContext } from "../../context/TransactionContext";
import { useFunds } from "../../hooks/useFunds";
import { shortenAddress } from "../../utils/shortenAddress";

const TransactionsCard = ({
  sender,
  receiver,
  amount,
  message,
  timestamp,
  fundName,
}) => {
  return (
    <div className="p-5 ml-5 mb-5 sm:w-96 w-full min-h-[220px] flex flex-col justify-center items-center blue-glassmorphism">
      <div className="flex flex-col items-center w-full h-full justify-between mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <p className="text-white text-base">From: {shortenAddress(sender)}</p>
          <p className="text-white text-base">To: {fundName}</p>
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

const LatestTransactions = () => {
  const { transactions } = useContext(TransactionContext);

  const { funds, loading, error } = useFunds();

  const fundByAddress = useMemo(() => {
    const m = {};
    for (const f of funds) {
      m[f.address.toLowerCase()] = f;
    }
    return m;
  }, [funds]);
  const filteredTxs = transactions.filter((tx) => parseFloat(tx.amount) >= 0.5);

  console.log("Transaction: ", transactions);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="w-full max-w-screen-xl flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>

        {filteredTxs.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center mt-10">
            {[...transactions].reverse().map((transaction, i) => {
              const fund = fundByAddress[transaction.receiver.toLowerCase()];
              const fundName = fund ? fund.name : "Unknown Fund";
              return (
                <TransactionsCard
                  key={i}
                  sender={transaction.sender}
                  receiver={transaction.receiver}
                  amount={transaction.amount}
                  message={transaction.message}
                  timestamp={transaction.timestamp}
                  fundName={fundName}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 mt-10 text-center">
            Transactions are more than 0.5 ETH will be displayed here.
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestTransactions;
