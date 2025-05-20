import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import {
  campaignCreationAddress,
  campaignCreationABI,
} from "../../utils/constants";
import CampaignSlugRequest from "../../Request/CampaignSlugRequest";
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

  const handleNavigate = async (campaign) => {
    try {
      console.log("Campaigns: ", campaign);
      const res = await CampaignSlugRequest.getCampaignSlug(
        campaign.contractAddress
      );
      const slug = res.data.slug;
      navigate(`campaigns/campaign-details/${slug}`);
    } catch {
      alert("Campaign not found.");
    }
  };

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
    const fetchAndListen = async () => {
      setIsLoading(true);
      const campaignList = await getAllCampaigns();
      setCampaigns(campaignList);
      setIsLoading(false);

      if (!window.ethereum) return;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        campaignCreationAddress,
        campaignCreationABI,
        provider
      );
      const filter = contract.filters.CampaignDeployed();

      contract.on(filter, async () => {
        const updatedList = await getAllCampaigns();
        setCampaigns(updatedList);
      });

      return () => {
        contract.removeAllListeners(filter);
      };
    };

    fetchAndListen();
  }, []);

  return (
    <div className="flex w-full justify-center items-center px-4 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col w-full justify-center items-center max-w-screen-xl md:p-12 py-12 px-4">
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
          <p className="text-gray-400 mt-10">
            There are no campaigns running at the moment.
          </p>
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
