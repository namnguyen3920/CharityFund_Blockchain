import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TransactionContext } from "../../../context/TransactionContext";
import { useFunds } from "../../../hooks/useFunds";

const TransactionLog = () => {
  const { transactionCount, transactions } = useContext(TransactionContext);
  const { funds } = useFunds();
  const [transaction, setTransaction] = useState([]);

  const getFundNameByAddress = (address) => {
    const fund = funds.find(
      (f) => f.address.toLowerCase() === address.toLowerCase()
    );
    return fund ? fund.name : address;
  };

  useEffect(() => {
    setTransaction(transactions);
  }, [transactions]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br px-6 py-10 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Transaction</h2>
        </div>

        <table className="w-full text-sm bg-[#0f172a] rounded-lg overflow-hidden">
          <thead className="bg-[#1e293b] text-gray-400">
            <tr>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Donor</th>
              <th className="px-4 py-2 text-left">Charity Fund</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {transaction.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  No transaction yet.
                </td>
              </tr>
            ) : (
              transaction.map((d, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="px-4 py-2">{d.amount}</td>
                  <td className="px-4 py-2 truncate max-w-[250px]">
                    {d.sender}
                  </td>
                  <td className="px-4 py-2 truncate max-w-[250px]">
                    {getFundNameByAddress(d.receiver)}
                  </td>
                  <td className="px-4 py-2">{d.timestamp}</td>

                  <td className="px-4 py-2">{d.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionLog;
