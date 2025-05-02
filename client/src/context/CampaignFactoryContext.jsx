import React, { createContext, useContext } from "react";
import { useFactory } from "../hooks/useCampaignFactory";

const CampaignFactoryContext = createContext();

export const CampaignFactoryProvider = ({ children }) => {
  const campaignFactory = useFactory();

  return (
    <CampaignFactoryContext.Provider value={campaignFactory}>
      {children}
    </CampaignFactoryContext.Provider>
  );
};

export const useCampaignFactory = () => useContext(CampaignFactoryContext);
