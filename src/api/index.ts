import { Alchemy, Network, AlchemySettings } from "alchemy-sdk";

export const config: AlchemySettings = {
  // @ts-ignore
  apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

export async function getTokenBalance(userAddress: string) {
  const { tokenBalances } = await alchemy.core.getTokenBalances(userAddress);
  console.log("tokenBalances", tokenBalances);

  const tokenDataPromises = tokenBalances.map(({ contractAddress }) =>
    alchemy.core.getTokenMetadata(contractAddress),
  );

  const tokenData = await Promise.all(tokenDataPromises);
  return {
    tokenBalances,
    tokenData,
  };
}
