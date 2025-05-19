import { TransactionsProvider } from "./TransactionContext";
import { CampaignFactoryProvider } from "./CampaignFactoryContext";
import { CampaignProvider } from "./CampaignContext";
import { ConnectWalletProvider } from "./ConnectWalletContext";

export const AppProviders = ({ children }) => (
  <ConnectWalletProvider>
    <TransactionsProvider>
      <CampaignFactoryProvider>
        <CampaignProvider>{children}</CampaignProvider>
      </CampaignFactoryProvider>
    </TransactionsProvider>
  </ConnectWalletProvider>
);
