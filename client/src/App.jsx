import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, SignUpPage } from "./components/landing";

import LandingLayout from "./layout/LandingLayout";
import CampaignLayout from "./layout/CampaignLayout";

const App = () => {
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
        <Route path="/campaigns/*" element={<CampaignLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
