import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from "ethers";

import DonationField from "../DonationField";
import CampaignSlugRequest from "../../../Request/CampaignSlugRequest";
import { useCampaignDetails } from "../../../hooks/useCampaignDetails";
import { useWallet } from "../../../hooks/useWallet";
import { CountBox, CustomButton } from "../custom";
import { Loader } from "../../Loader";
import { calculateBarPercentage, daysLeft } from "../../../utils/campaignUtils";
import { small_logo } from "../../../assets";

const CampaignDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const connectedAddress = useWallet();

  const [campaignAddress, setCampaignAddress] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [donators, setDonators] = useState([]);
  const [donationForm, setDonationForm] = useState({ amount: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [validOwner, setValidOwner] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);

  useEffect(() => {
    const getCampaignAddress = async () => {
      try {
        const res = await CampaignSlugRequest.getCampaignAddress(slug);
        setCampaignAddress(res.data.address);
      } catch (err) {
        console.error("Failed to fetch campaign address:", err);
      }
    };
    getCampaignAddress();
  }, [slug]);

  const { donate, getDetails, getBlocks, withdraw } =
    useCampaignDetails(campaignAddress);

  useEffect(() => {
    if (!campaignAddress) return;

    const updateCampaignData = async () => {
      try {
        setIsLoading(true);
        const [details, donors] = await Promise.all([
          getDetails(),
          getBlocks(),
        ]);
        const remainingDays = daysLeft(details.deadline);
        console.log("Donors: ", donors);
        setCampaignData({
          ...details,
          deadline: details.deadline,
          remainingDays,
          campaignAddress,
        });
        setDonators(donors);
        setIsClaimed(details.claimed);
      } catch (error) {
        console.error("Error loading campaign data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    updateCampaignData();
  }, [campaignAddress]);

  useEffect(() => {
    if (campaignData && connectedAddress) {
      setValidOwner(
        campaignData?.owner?.toLowerCase() === connectedAddress.toLowerCase()
      );
    }
  }, [campaignData, connectedAddress]);

  const handleDonate = async () => {
    setIsLoading(true);
    try {
      await donate(donationForm.amount, donationForm.message);
      setDonationForm({ amount: "", message: "" });
      const [data, donors] = await Promise.all([getDetails(), getBlocks()]);
      setCampaignData({
        ...data,
        remainingDays: daysLeft(data.deadline),
        campaignAddress,
      });
      setDonators(donors);
    } catch (error) {
      console.error("Donation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setIsLoading(true);
    try {
      await withdraw();
      setIsClaimed(true);
      const [data, donors] = await Promise.all([getDetails(), getBlocks()]);
      setCampaignData({
        ...data,
        remainingDays: daysLeft(data.deadline),
        campaignAddress,
      });
      setDonators(donors);
    } catch (error) {
      console.error("Withdraw failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isTargetReached =
    campaignData?.claimed === true ||
    parseFloat(campaignData?.amountCollected) >=
      parseFloat(campaignData?.target);

  console.log("isTargetReached: ", isTargetReached);
  if (!campaignData) return <Loader />;
  console.log("Campaign Data: ", campaignData);

  console.log("Donators:", donators);
  return (
    <div className="w-full px-4 ">
      {isLoading && <Loader />}

      <div className="w-full max-w-[1280px] mx-auto">
        <h2 className="text-white text-[24px] font-bold">Campaign Details</h2>
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={campaignData.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    campaignData.target,
                    campaignData.collected
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={campaignData.remainingDays} />
            <CountBox
              title={`Raised of ${campaignData.target}`}
              value={
                parseFloat(campaignData.amountCollected) !== 0
                  ? campaignData.amountCollected
                  : campaignData.totalCollected
              }
            />
            <CountBox title="Donation" value={donators.length} />
          </div>
        </div>
      </div>

      <div className="mt-[60px] w-full">
        <div className="flex lg:flex-row flex-col gap-5">
          <div className="flex-[8]">
            <div className="bg-[#1c1c24] rounded-[10px] p-6 flex flex-col gap-[30px]">
              <div>
                <div className="flex justify-between items-center">
                  <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    CREATOR
                  </h4>
                  <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    CAMPAIGN ADDRESS
                  </h4>
                </div>

                <div className="mt-[20px] flex justify-between items-start gap-4 flex-wrap">
                  <div className="flex items-center gap-[14px]">
                    <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                      <img
                        src={small_logo}
                        alt="user"
                        className="w-[60%] h-[60%] object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                        {campaignData.owner}
                      </h4>
                      <p className="mt-[4px] font-epilogue font-normal text-[12px] text-gray-400">
                        10 Campaigns
                      </p>
                    </div>
                  </div>
                  <div className="max-w-[50%]">
                    <h4 className="font-epilogue font-semibold text-[14px] text-white break-all text-right">
                      {campaignData.campaignAddress}
                    </h4>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                  Story
                </h4>
                <p className="mt-[20px] font-epilogue font-medium text-[16px] text-[#cbd5e1] leading-[28px] text-justify">
                  {campaignData.description}
                </p>
              </div>

              <div className="mt-[20px]">
                <div className="flex justify-between items-center">
                  <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                    Donators
                  </h4>
                  <button
                    onClick={() =>
                      navigate(`/campaigns/campaign-details/${slug}/donations`)
                    }
                    className="text-sm text-[#14ec99] hover:underline cursor-pointer"
                  >
                    View Donations &gt;
                  </button>
                </div>

                <div className="mt-[20px] flex flex-col gap-4">
                  {donators.length <= 1 ? (
                    <p className="font-epilogue font-normal text-[16px] text-[#cbd5e1] leading-[26px] text-justify">
                      No donators yet. Be the first one!
                    </p>
                  ) : (
                    (isClaimed ? donators.slice(1, -1) : donators.slice(1)).map(
                      (d, index) => (
                        <div
                          key={`${d.donor}-${index}`}
                          className="flex justify-between items-center gap-4"
                        >
                          <p className="font-epilogue font-normal text-[16px] text-[#f1f5f9] leading-[26px] break-all">
                            {index + 1}. {d.donor}
                          </p>
                          <p className="font-epilogue font-normal text-[16px] text-[#cbd5e1] leading-[26px] break-all">
                            {d.amount}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-[2]">
            <DonationField
              donationForm={donationForm}
              setDonationForm={setDonationForm}
              isTargetReached={isTargetReached}
              isLoading={isLoading}
              handleDonate={handleDonate}
              handleWithdraw={handleWithdraw}
              connectedAddress={connectedAddress}
              campaignData={campaignData}
              slug={slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
