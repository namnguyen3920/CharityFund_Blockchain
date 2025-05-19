import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../../assets";
import CampaignSlugRequest from "../../Request/CampaignSlugRequest";

const CampaignDashboard = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = async (campaign) => {
    try {
      const res = await CampaignSlugRequest.getCampaignSlug(
        campaign.contractAddress
      );
      const slug = res.data.slug;
      navigate(`/campaigns/campaign-details/${slug}`);
    } catch {
      alert("Slug not found for this campaign.");
    }
  };

  return (
    <div>
      <h1 className="font-extrabold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {!isLoading ||
          (campaigns.length === 0 && (
            <p className="font-bold text-[14px] leading-[30px] text-white">
              There are no campaigns created yet. <br /> Be the first to create
              a campaign.
              <br />
              Login and Click on the "Create Campaign" button to get started.
            </p>
          ))}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default CampaignDashboard;
