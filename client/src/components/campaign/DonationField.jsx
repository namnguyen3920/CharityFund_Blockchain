// components/DonationBox.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./custom/CustomButton";

const DonationBox = ({
  donationForm,
  setDonationForm,
  isTargetReached,
  isLoading,
  handleDonate,
  handleWithdraw,
  connectedAddress,
  campaignData,
  slug,
}) => {
  const navigate = useNavigate();
  const isCampaignClaimed = campaignData?.claimed === true;
  console.log("isTargetReach: ", isTargetReached);
  console.log("connected address: ", connectedAddress);
  console.log("isCampaignClaimed: ", isCampaignClaimed);
  return (
    <div>
      <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
        Donation
      </h4>

      <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
        {isTargetReached ? (
          isCampaignClaimed ? (
            <>
              {/* Campaign đã claim → View Log */}
              <div className="text-center py-6">
                <h4 className="text-xl font-bold text-green-400">
                  🎉 Campaign hit the target!
                </h4>
                <p className="mt-4 text-[#cbd5e1]">
                  This campaign has been successfully closed and funds have been
                  withdrawn.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="View Log"
                styles="w-full mt-4 bg-[#4ade80] hover:bg-[#22c55e]"
                handleClick={() => navigate(`/campaigns/${slug}/log`)}
              />
            </>
          ) : (
            <>
              {/* Đạt target, chưa claim */}
              <div className="text-center py-6">
                <h4 className="text-xl font-bold text-green-400">
                  🎉 Campaign hit the target!
                </h4>
                <p className="mt-4 text-[#cbd5e1]">
                  Thank you for your generous support. This campaign has
                  successfully reached its fundraising goal.
                </p>
              </div>

              {connectedAddress?.toLowerCase() ===
                campaignData?.owner?.toLowerCase() && (
                <CustomButton
                  btnType="button"
                  title="Withdraw"
                  isLoading={isLoading}
                  styles="w-full mt-4 bg-green-600 hover:bg-green-700"
                  handleClick={handleWithdraw}
                />
              )}
            </>
          )
        ) : (
          <>
            {/* Campaign chưa đạt target → form donate */}
            <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#e2e8f0]">
              Donate to the campaign
            </p>

            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={donationForm.amount}
                onChange={(e) =>
                  setDonationForm({ ...donationForm, amount: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Enter your message here..."
                className="w-full mt-4 py-[10px] sm:px-[20px] px-[15px] outline-none border border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={donationForm.message}
                onChange={(e) =>
                  setDonationForm({ ...donationForm, message: e.target.value })
                }
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                  You will be donating{" "}
                  <span className="text-[#8c6dfd]">
                    {donationForm.amount} ETH
                  </span>{" "}
                  to the campaign.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#cbd5e1]">
                  We are truly grateful for your support. Your donation will
                  help us.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title="Donate Now"
                isLoading={isLoading}
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DonationBox;
