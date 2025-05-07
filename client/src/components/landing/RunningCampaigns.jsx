import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { loader } from "../../assets";
import { FundCard } from "../campaign";
import { useCampaignFactory } from "../../context/CampaignFactoryContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const RunningCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign });
  };
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
    <div className="flex w-full justify-center items-center px-4 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col w-full max-w-screen-xl md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-8">
          Running Campaigns
        </h3>

        {isLoading ? (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        ) : campaigns.length === 0 ? (
          <p className="text-gray-400 mt-10">No campaigns</p>
        ) : (
          <Swiper
            className="w-full"
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {campaigns.map((campaign) => (
              <SwiperSlide key={campaign.pId || campaign.id}>
                <FundCard
                  {...campaign}
                  handleClick={() => handleNavigate(campaign)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default RunningCampaign;
