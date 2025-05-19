import React, { createContext, useContext } from "react";
import { useCampaignDetails } from "../hooks/useCampaignDetails";

const CampaignContext = createContext();

export const CampaignProvider = ({ children, campaignAddress }) => {
  const campaign = useCampaignDetails(campaignAddress);

  return (
    <CampaignContext.Provider value={campaign}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => useContext(CampaignContext);
