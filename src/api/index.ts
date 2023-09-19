import { TokenStandard } from "../types/token";
import { alchemy } from "./eth";

const fetchERC20 = async (address: string) => {
  const { tokenBalances } = await alchemy.core.getTokenBalances(address);

  const tokenDataPromises = tokenBalances.map(({ contractAddress }) =>
    alchemy.core.getTokenMetadata(contractAddress),
  );

  const tokenData = await Promise.all(tokenDataPromises);
  return {
    tokenBalances,
    tokenData,
  };
};

const fetchERC721 = async (address: string) => {
  const nfts = await alchemy.nft.getNftsForOwner(address);

  return {
    tokenBalances: nfts.ownedNfts,
    tokenData: null,
  };
};

export const getTokenBalance = async (
  userAddress: string,
  standard: TokenStandard,
) => {
  switch (standard) {
    case TokenStandard.ERC20:
      return fetchERC20(userAddress);
    case TokenStandard.ERC721:
      return fetchERC721(userAddress);
    default:
      throw new Error(`Unrecognized token standard: "${standard}"`);
  }
};
