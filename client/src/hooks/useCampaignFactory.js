import { ethers } from "ethers";
import {
  campaignCreationABI,
  campaignCreationAddress,
} from "../utils/constants";

export const useFactory = () => {
  const getSigner = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  };

  const publishCampaign = async (form) => {
    const signer = getSigner();
    const contract = new ethers.Contract(
      campaignCreationAddress,
      campaignCreationABI,
      signer
    );

    const goal = ethers.utils.parseUnits(form.target, 18);
    const deadlineTs = Math.floor(new Date(form.deadline).getTime() / 1000);
    const value = ethers.utils.parseEther(form.genesis_amount);

    const tx = await contract.createCampaign(
      form.title,
      form.description,
      goal,
      deadlineTs,
      form.image,
      { value }
    );

    return tx;
  };

  const getAllCampaigns = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      campaignCreationAddress,
      campaignCreationABI,
      provider
    );

    const campaigns = await contract.getCampaigns();
    return campaigns;
  };

  return {
    publishCampaign,
    getAllCampaigns,
  };
};
