import naxios from "@wpdas/naxios";

const FULL_TGAS = "300000000000000";
const NETWORK = "mainnet" || "testnet";
const SOCIAL_DB_CONTRACT_ID = "social.near";

// Naxios (Contract/Wallet) Instance
export const naxiosInstance = new naxios({
  rpcNodeUrl: "https://free.rpc.fastnear.com",
  contractId: SOCIAL_DB_CONTRACT_ID,
  network: NETWORK,
});

/**
 * NEAR Wallet API
 */
export const walletApi = naxiosInstance.walletApi();
