import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { TokenBalance, TokenMetadataResponse, Utils } from "alchemy-sdk";
import React, { useState } from "react";
import { getTokenBalance, config } from "./api";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);
  const [tokenDataObjects, setTokenDataObjects] = useState<
    TokenMetadataResponse[]
  >([]);
  const [hasQueried, setHasQueried] = useState(false);

  let exampleContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  let exampleEOAAddress = "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8";

  if (config.network === "eth-goerli") {
    // rewrite example addresses
    exampleContractAddress = "0xc81B5771226a0F2F9ef0beA27bAC64B3236071F0";
    exampleEOAAddress = "0x9Ff92bD4DB733Aa7F2077D45eBd8674fb20425ae";
  }

  async function fetchTokenBalance() {
    const { tokenBalances, tokenData } = await getTokenBalance(userAddress);
    setTokenBalances(tokenBalances);
    setTokenDataObjects(tokenData);
    setHasQueried(true);
  }

  return (
    <Box w="100vw">
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading mb={0} fontSize={36}>
            ERC-20 Token Indexer
          </Heading>
          <Text>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Text>
        </Flex>
      </Center>
      <Flex
        w="100%"
        flexDirection="column"
        alignItems="center"
        justifyContent={"center"}
      >
        <Heading mt={42}>
          Get all the ERC-20 token balances of this address:
        </Heading>
        <UnorderedList>
          <ListItem>
            <b>Contract: </b>
            {exampleContractAddress}
          </ListItem>
          <ListItem>
            <b>Wallet: </b>
            {exampleEOAAddress}
          </ListItem>
        </UnorderedList>
        <Input
          onChange={(e) => setUserAddress(e.target.value)}
          color="black"
          w="600px"
          textAlign="center"
          p={4}
          bgColor="white"
          fontSize={24}
        />
        <Button
          fontSize={20}
          onClick={fetchTokenBalance}
          mt={36}
          bgColor="blue"
        >
          Check ERC-20 Token Balances
        </Button>

        <Heading my={36}>ERC-20 token balances:</Heading>

        {hasQueried ? (
          <SimpleGrid w={"90vw"} columns={4} spacing={24}>
            {tokenBalances.map((e, i) => {
              return (
                <Flex
                  flexDir={"column"}
                  color="white"
                  bg="blue"
                  w={"20vw"}
                  key={e.contractAddress}
                >
                  <Box>
                    <b>Symbol:</b> ${tokenDataObjects[i].symbol}&nbsp;
                  </Box>
                  <Box>
                    <b>Balance:</b>&nbsp;
                    {Utils.formatUnits(
                      e.tokenBalance ?? 0,
                      tokenDataObjects[i].decimals ?? 0,
                    )}
                  </Box>
                  <Image src={tokenDataObjects[i].logo ?? ''} />
                </Flex>
              );
            })}
          </SimpleGrid>
        ) : (
          "Please make a query! This may take a few seconds..."
        )}
      </Flex>
    </Box>
  );
}

export default App;
