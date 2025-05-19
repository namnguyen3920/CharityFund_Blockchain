import React, { useState, useEffect } from "react";

import {
  campaignCreationAddress,
  campaignCreationABI,
} from "../../../utils/constants";
import { CampaignDashboard } from "../../campaign";
import { useCampaignFactory } from "../../../context/CampaignFactoryContext";

const CampaignPages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getAllCampaigns } = useCampaignFactory();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const campaignList = await getAllCampaigns();
    console.log("Campaigns List:", campaignList);
    setCampaigns(campaignList);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      campaignCreationAddress,
      campaignCreationABI,
      provider
    );
    const filter = contract.filters.CampaignDeployed();

    contract.on(filter, () => {
      console.log("New campaign created");
      fetchCampaigns();
    });

    return () => {
      contract.removeAllListeners(filter);
    };
  }, []);

  return (
    <CampaignDashboard
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default CampaignPages;
