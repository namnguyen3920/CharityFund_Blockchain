// src/hooks/useFactory.js
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {
  campaignCreationABI,
  campaignCreationAddress,
} from "../utils/constants";

export const useFactory = () => {
  const { contract, isLoading: isFactoryLoading } = useContract(
    campaignCreationAddress,
    campaignCreationABI
  );
  const {
    mutateAsync: createCampaignWrite,
    isLoading: isCreateLoading,
    error: createError,
  } = useContractWrite(contract, "createCampaign");

  const publishCampaign = async (form) => {
    if (!contract) throw new Error("Contract not ready");

    const args = [
      form.title,
      form.description,
      form.target,
      Math.floor(new Date(form.deadline).getTime() / 1000),
      form.image,
    ];

    const value = ethers.utils.parseEther(form.genesis_amount);

    return createCampaignWrite({
      args,
      overrides: { value },
    });
  };

  const getAllCampaigns = async () => {
    if (!contract) {
      console.error("Contract not ready");
      return;
    }
    try {
      const campaigns = await contract.call("getCampaigns");
      console.log("Campaign:", campaigns);
      return campaigns;
    } catch (err) {
      console.error("Get all campaigns failed:", err);
      throw err;
    }
  };

  return {
    contract,
    isFactoryLoading,
    publishCampaign,
    isCreateLoading,
    createError,
    getAllCampaigns,
  };
};
