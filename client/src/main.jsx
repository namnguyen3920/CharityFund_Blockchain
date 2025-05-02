import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Localhost } from "@thirdweb-dev/chains";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App.jsx";
import { AppProviders } from "./context/AppProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThirdwebProvider activeChain={Localhost}>
    <AppProviders>
      <App />
    </AppProviders>
  </ThirdwebProvider>
);
