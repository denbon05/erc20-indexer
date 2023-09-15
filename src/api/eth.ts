import { ethers } from "ethers";
import { Alchemy, Network, AlchemySettings } from "alchemy-sdk";

export const config: AlchemySettings = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

export const alchemy = new Alchemy(config);

export const provider = (() => {
  if (!window.ethereum) {
    throw Error("Can't find ethereum ExternalProvider in window");
  }

  return new ethers.providers.Web3Provider(window.ethereum, "any");
})();

export const connectToWallet = async () => {
  const [account] = await provider.send("eth_requestAccounts", []);
  return account;
};
