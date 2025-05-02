import React, { useState, useEffect } from "react";

import { CampaignDashboard } from "../../campaign";
import { useCampaignFactory } from "../../../context/CampaignFactoryContext";

const CampaignPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract, getAllCampaigns } = useCampaignFactory();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAllCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <CampaignDashboard
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default CampaignPages;
