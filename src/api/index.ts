import { alchemy } from "./eth";

export async function getTokenBalance(userAddress: string) {
  const { tokenBalances } = await alchemy.core.getTokenBalances(userAddress);

  const tokenDataPromises = tokenBalances.map(({ contractAddress }) =>
    alchemy.core.getTokenMetadata(contractAddress),
  );

  const tokenData = await Promise.all(tokenDataPromises);
  return {
    tokenBalances,
    tokenData,
  };
}
