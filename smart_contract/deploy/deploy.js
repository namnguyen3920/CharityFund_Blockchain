const { Wallet, Provider, utils } = require("zksync-web3");
const { ethers } = require("ethers");
const hre = require("hardhat");

module.exports = async function () {
  const zkProvider = new Provider("https://sepolia.era.zksync.dev");
  const ethProvider = ethers.getDefaultProvider("sepolia");
  const wallet = new Wallet("eefb223fa0b4dbc9fa7a455d4b5cf261751631fcd99591956b03b49d39efe048", zkProvider, ethProvider);

  const TransactionFactory = await hre.zkUpgrades.deployContract(
    wallet,
    "Transaction",
    ["0x9f21a8340c775275f4Bb4cd4eB2Bbc8BE603A5d9"],
    {}
    
  );
  console.log("Deployed contract address:", TransactionFactory.address);
  const address = await TransactionFactory.getAddress();
  console.log("Contract deployed at:", address);
};