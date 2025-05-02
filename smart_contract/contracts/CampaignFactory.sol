// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// Ta giữ nguyên contract Campaign như trước
import "./Campaign.sol";

contract CampaignFactory {
    uint256 public constant GENESIS_STAKE = 0.1 ether;

    struct CampaignData {
        address owner;
        string  title;
        string  description;
        uint256 target;
        uint256 deadlineTs;
        uint256 amountCollected;
        string  image;
        address contractAddress;
    }

    CampaignData[] private campaigns;

    event CampaignDeployed(address indexed campaign, address indexed owner);

    function createCampaign(
        string calldata title,
        string calldata desc,
        uint256 target,
        uint256  deadlineTs,
        string calldata image
    ) external payable returns (address campaignAddr) {
        require(msg.value >= GENESIS_STAKE, "Must stake at least 0.1 ETH");
        require(deadlineTs > block.timestamp, "Deadline in the future");

        Campaign c = new Campaign{ value: msg.value }(
            msg.sender,
            title,
            desc,
            target,
            deadlineTs,
            image
        );

        campaignAddr = address(c);

        campaigns.push(CampaignData({
            owner: msg.sender,
            title: title,
            description: desc,
            target: target,
            deadlineTs: deadlineTs,
            amountCollected: msg.value,
            image: image,
            contractAddress: campaignAddr
        }));

        emit CampaignDeployed(campaignAddr, msg.sender);
    }
    function getCampaigns() external view returns (CampaignData[] memory) {
        return campaigns;
    }
}
