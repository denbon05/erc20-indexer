import { Box, Flex, Image, SimpleGrid } from "@chakra-ui/react";
import { TokenBalance, TokenMetadataResponse, Utils } from "alchemy-sdk";
import React from "react";

interface Props {
  tokenBalances: TokenBalance[];
  tokenData: TokenMetadataResponse[];
}

const ERC20Items = ({ tokenBalances, tokenData }: Props) => {
  return (
    <SimpleGrid w={"90vw"} columns={4} spacing={24}>
      {tokenBalances.map((e, i) => {
        return (
          <Flex
            flexDir={"column"}
            color="white"
            bg="gray"
            w={"20vw"}
            key={e.contractAddress}
          >
            <Box>
              <b>Symbol:</b> ${tokenData[i].symbol}
              <br />
            </Box>
            <Box>
              <b>Balance: </b>
              {Utils.formatUnits(
                e.tokenBalance ?? 0,
                tokenData[i].decimals ?? 0,
              )}
            </Box>
            <Image src={tokenData[i].logo ?? ""} />
          </Flex>
        );
      })}
    </SimpleGrid>
  );
};

export default ERC20Items;
