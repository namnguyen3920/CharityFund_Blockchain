import { ethers } from "ethers";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./components/landing";

import LandingLayout from "./layout/LandingLayout";
import CampaignDashboardLayout from "./layout/CampaignDashboardLayout";
import TransactionLog from "./components/campaign/pages/TransactionLog";

const App = () => {
  window.ethers = ethers;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingLayout />} />
        <Route
          path="/login"
          element={
            <div className="gradient-bg-welcome">
              <LoginPage />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="gradient-bg-welcome">
              <SignUpPage />
            </div>
          }
        />
        <Route path="/*" element={<CampaignDashboardLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
