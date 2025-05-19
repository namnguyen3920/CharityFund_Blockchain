import transaction_abi from "../../../smart_contract/artifacts/contracts/Transactions.sol/Transaction.json";
import campaignCreation_abi from "../../../smart_contract/artifacts/contracts/CampaignFactory.sol/CampaignFactory.json";
import campaign_abi from "../../../smart_contract/artifacts/contracts/Campaign.sol/Campaign.json";

export const transactionABI = transaction_abi.abi;
export const campaignCreationABI = campaignCreation_abi.abi;
export const campaignABI = campaign_abi.abi;

export const campaignCreationAddress =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const transactionAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
