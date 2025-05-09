import React, { useContext, useEffect } from "react";
import { BiDonateHeart } from "react-icons/bi";
import { Loader } from "../Loader";
import { useState } from "react";
import Cookies from "js-cookie";
import { TransactionContext } from "../../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { useFunds } from "../../hooks/useFunds";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange, isLoading }) => (
  <input
    placeholder={placeholder}
    name={name}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm"
  />
);

const Welcome = () => {
  const {
    currentAddress,
    connectWallet,
    handleChange,
    formData,
    isLoading,
    sendTransaction,
  } = useContext(TransactionContext);

  const [walletStatus, setWalletStatus] = useState(null);
  const { funds, loading, error } = useFunds();

  const handleSubmit = (e) => {
    const { amount, message, fundAddress } = formData;

    console.log("formData", formData);
    console.log("fundAddress", fundAddress);
    e.preventDefault();

    if (!amount) return;

    sendTransaction();
  };

  useEffect(() => {
    if (currentAddress) {
      setWalletStatus("connected");
    } else {
      setWalletStatus("disconnected");
    }
  }, [currentAddress]);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex flex-col md:flex-row justify-center items-start md:items-center gap-10 md:p-20 px-4 py-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Donate to Charity Fund <br /> across the globe
          </h1>
          {currentAddress ? (
            <button
              disabled
              className="flex flex-row justify-center items-center my-5 bg-gray-500 p-3 rounded-full cursor-not-allowed"
            >
              <p className="text-white text-base font-semibold">Connected!</p>
            </button>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Transparency
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Crypto & Fiat</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div>
                {walletStatus === "connected" ? (
                  <>
                    <p className="text-green-400 font-semibold text-lg mt-1">
                      Your Wallet Address
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      {shortenAddress(currentAddress)}
                    </p>
                  </>
                ) : (
                  <p className="text-yellow-400 font-semibold text-lg mt-1">
                    Wallet hasn't connected!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism overflow-visible">
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={handleChange}
            />

            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={handleChange}
            />
            {loading ? (
              <p className="text-gray-400">Loading funds…</p>
            ) : error ? (
              <p className="text-red-500">Failed to load funds</p>
            ) : (
              <select
                name="fundAddress"
                value={formData.fundAddress}
                onChange={handleChange}
                className="bg-[#1f2937] text-white px-3 py-2 w-full mt-2"
              >
                <option value="">Select Fund</option>
                {funds.map((fund) => (
                  <option key={fund._id} value={fund.address}>
                    {fund.name}
                  </option>
                ))}
              </select>
            )}

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex justify-center items-center text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                <BiDonateHeart className="text-white mr-2" />
                Donate
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
