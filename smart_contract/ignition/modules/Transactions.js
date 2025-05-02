const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TransactionModule", (m) => {
  
//   const receiver = m.getParameter("receiver", "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");

  const transaction = m.contract("Transaction");

  return { transaction };
});