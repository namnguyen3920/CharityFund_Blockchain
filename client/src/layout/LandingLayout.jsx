import { Outlet } from "react-router-dom";
import { Transactions, Footer, NavBar, Welcome } from "../components/landing";

const LandingLayout = () => (
  <div className="min-h-screen xflex flex-col">
    <div className="gradient-bg-welcome">
      <NavBar />

      <main>
        <Welcome />
      </main>
    </div>
    <Transactions />
    <Footer />
  </div>
);

export default LandingLayout;
