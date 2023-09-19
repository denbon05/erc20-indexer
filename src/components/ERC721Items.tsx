import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { OwnedNft } from "alchemy-sdk";
import React from "react";

interface Props {
  ownedNFTs: OwnedNft[];
}

const ERC721Items = ({ ownedNFTs }: Props) => {
  return (
    <SimpleGrid w={"90vw"} columns={4} spacing={24}>
      {ownedNFTs.map((nft) => {
        return (
          <Flex
            flexDir={"column"}
            color="white"
            bg="gray"
            w={"20vw"}
            key={nft.timeLastUpdated}
          >
            <Box>
              <b>Title:</b> ${nft.title}
              <br />
              <b>Symbol:</b> ${nft.contract.symbol}
              <br />
            </Box>
            <Box>
              <b>Balance:</b> {nft.balance}
            </Box>
            <Image
              src={
                nft.rawMetadata?.image ?? "src/assets/nft_depressed_ghost.jpeg"
              }
              alt="NFT image"
            />
          </Flex>
        );
      })}
    </SimpleGrid>
  );
};

export default ERC721Items;
