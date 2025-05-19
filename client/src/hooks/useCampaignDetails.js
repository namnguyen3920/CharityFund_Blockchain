import { ethers } from "ethers";
import { campaignABI } from "../utils/constants";

export const useCampaignDetails = (campaignAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const getDetails = async () => {
    const contract = new ethers.Contract(
      campaignAddress,
      campaignABI,
      provider
    );

    const [
      title,
      description,
      target,
      deadline,
      owner,
      image,
      claimed,
      //amountCollected,
      totalCollected,
      createdAt,
    ] = await Promise.all([
      contract.title(),
      contract.description(),
      contract.target(),
      contract.deadline(),
      contract.owner(),
      contract.image(),
      contract.claimed(),
      //contract.amountCollected(),
      contract.totalCollected(),
      contract.createdAt(),
    ]);

    return {
      title,
      description,
      target: ethers.utils.formatEther(target),
      deadline: Number(deadline),
      amountCollected: ethers.utils.formatEther(totalCollected),
      owner,
      totalCollected: ethers.utils.formatEther(totalCollected),
      image,
      claimed,
      createdAt: new Date(Number(createdAt) * 1000).toLocaleString(),
    };
  };

  const donate = async (amount, message) => {
    const contract = new ethers.Contract(
      campaignAddress,
      campaignABI,
      provider.getSigner()
    );

    const tx = await contract.donate(message || "", {
      value: ethers.utils.parseEther(amount),
    });

    await tx.wait();
  };

  const withdraw = async () => {
    const contract = new ethers.Contract(
      campaignAddress,
      campaignABI,
      provider.getSigner()
    );

    const tx = await contract.withdraw();
    const receipt = await tx.wait();

    const block = await provider.getBlock(receipt.blockNumber);
    const withdrawTimestamp = new Date(block.timestamp * 1000).toLocaleString();

    return {
      timestamp: withdrawTimestamp,
    };
  };

  const getBlocks = async () => {
    const contract = new ethers.Contract(
      campaignAddress,
      campaignABI,
      provider
    );

    const lastIndex = await contract.lastIndex();
    const count = lastIndex.toNumber();

    const blocks = [];

    for (let i = 0; i <= count; i++) {
      const block = await contract.getBlock(i);
      blocks.push({
        index: i,
        donor: block.donor,
        amount: ethers.utils.formatEther(block.amount),
        timestamp: Number(block.timestamp),
        message: block.message || "-",
      });
    }

    return blocks;
  };

  return {
    getDetails,
    donate,
    withdraw,
    getBlocks,
  };
};
