import { createContext, useContext } from "react";
import { useContract } from "@thirdweb-dev/react";
import { campaignABI } from "../utils/constants";

const CampaignContext = createContext();

export const CampaignProvider = ({ children, campaignAddress }) => {
  const { contract: campaign } = useContract(campaignAddress, campaignABI);

  const getDetails = async () => {
    const [title, description, target, deadline, amountCollected] =
      await Promise.all([
        campaign.call("title"),
        campaign.call("description"),
        campaign.call("target"),
        campaign.call("deadline"),
        campaign.call("amountCollected"),
      ]);
    return { title, description, target, deadline, amountCollected };
  };

  const donate = async (amount) => {
    await campaign.call("donate", [], {
      value: ethers.utils.parseEther(amount),
    });
  };

  return (
    <CampaignContext.Provider value={{ getDetails, donate }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => useContext(CampaignContext);
