const hre = require("hardhat");

async function main() {
  const CampaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );
  const factory = await CampaignFactory.deploy();

  console.log("CampaignFactory deployed to:", factory.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
