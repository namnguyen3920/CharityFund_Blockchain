import { Outlet } from "react-router-dom";
import {
  LatestTransactions,
  Footer,
  NavBar,
  Welcome,
  RunningCampaigns,
} from "../components/landing";

const LandingLayout = () => (
  <div className="min-h-screen xflex flex-col">
    <div className="gradient-bg-welcome">
      <NavBar />

      <main>
        <Welcome />
      </main>
    </div>
    <LatestTransactions />
    <RunningCampaigns />
    <Footer />
  </div>
);

export default LandingLayout;
