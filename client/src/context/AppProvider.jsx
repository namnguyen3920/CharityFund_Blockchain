import { TransactionsProvider } from "./TransactionContext";
import { CampaignFactoryProvider } from "./CampaignFactoryContext";
import { ConnectWalletProvider } from "./ConnectWalletContext";

export const AppProviders = ({ children }) => (
  <ConnectWalletProvider>
    <TransactionsProvider>
      <CampaignFactoryProvider>{children}</CampaignFactoryProvider>
    </TransactionsProvider>
  </ConnectWalletProvider>
);
