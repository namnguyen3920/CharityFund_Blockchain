import { Outlet } from "react-router-dom";
import Sidebar from "../components/campaign/SideBar";
import Navbar from "../components/campaign/CampaignNavBar";
import {
  CreateCampaign,
  CampaignDetail,
  CampaignPages,
} from "../components/campaign/pages";
import { Routes, Route } from "react-router-dom";

const CampaignLayout = () => (
  <div className="relative sm:-8 p-4 gradient-bg-campaign min-h-screen flex flex-row">
    <div className="sm:flex hidden mr-10 relative">
      <Sidebar />
    </div>

    <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
      <Navbar />

      <Routes>
        <Route index element={<CampaignPages />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="create-campaign" element={<CreateCampaign />} />
        <Route path="campaign-details/:id" element={<CampaignDetail />} />
      </Routes>
    </div>
  </div>
);

export default CampaignLayout;
