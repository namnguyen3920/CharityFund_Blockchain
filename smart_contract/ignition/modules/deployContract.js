// ignition/modules/AllContracts.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AllContracts", (m) => {
  const campaignFactory = m.contract("CampaignFactory");
  const transaction = m.contract("Transaction");

  return { campaignFactory, transaction };
});
