import { Outlet } from "react-router-dom";
import Sidebar from "../components/campaign/SideBar";
import Navbar from "../components/campaign/CampaignNavBar";
import {
  CreateCampaign,
  CampaignDetail,
  CampaignPages,
  CampaignDonations,
  CampaignLog,
  TransactionLog,
} from "../components/campaign/pages";
import { Routes, Route } from "react-router-dom";

const CampaignDashboardLayout = () => (
  <div className="relative sm:-8 p-4 gradient-bg-campaign min-h-screen flex flex-row">
    <div className="sm:flex hidden mr-10 relative">
      <Sidebar />
    </div>

    <div className="flex-1 w-full sm:pr-5">
      <div className="max-w-[1280px] mx-auto">
        <Navbar />
      </div>

      <Routes>
        <Route index path="campaigns" element={<CampaignPages />} />
        <Route path="campaigns/create-campaign" element={<CreateCampaign />} />
        <Route
          path="campaigns/campaign-details/:slug"
          element={<CampaignDetail />}
        />
        <Route
          path="campaigns/campaign-details/:slug/donations"
          element={<CampaignDonations />}
        />
        <Route path="campaigns/:slug/log" element={<CampaignLog />} />
      </Routes>
      <Routes>
        <Route path="transactions" element={<TransactionLog />} />
      </Routes>
    </div>
  </div>
);

export default CampaignDashboardLayout;
