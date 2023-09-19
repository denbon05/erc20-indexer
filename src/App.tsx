import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  ListItem,
  SimpleGrid,
  Spacer,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import {
  Network,
  OwnedNft,
  TokenBalance,
  TokenMetadataResponse,
  Utils,
} from "alchemy-sdk";
import React, { useState } from "react";
import { getTokenBalance } from "./api";
import { config } from "./api/eth";
import TokenSwitch from "./components/TokenSwitch";
import WalletConnector from "./components/WalletConnector";
import { TokenStandard } from "./types/token";
import ERC20Items from "./components/ERC20Items";
import ERC721Items from "./components/ERC721Items";

function App() {
  const [userAddress, setUserAddress] = useState("");
  const [tokenBalances, setTokenBalances] = useState<
    TokenBalance[] | OwnedNft[]
  >([]);
  const [tokenDataObjects, setTokenDataObjects] = useState<
    TokenMetadataResponse[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [tokenStandard, setTokenStandard] = useState<TokenStandard>(
    TokenStandard.ERC20, // default value
  );

  const switchTokenStandard = (standard: TokenStandard) => {
    // reset tokens
    setTokenBalances([]);
    setTokenStandard(standard);
  };

  let exampleContractAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  let exampleEOAAddress = "0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8";

  if (config.network === Network.ETH_GOERLI) {
    // rewrite example addresses
    exampleContractAddress = "0xc81B5771226a0F2F9ef0beA27bAC64B3236071F0";
    exampleEOAAddress = "0x9Ff92bD4DB733Aa7F2077D45eBd8674fb20425ae";
  }

  async function fetchTokenBalance(address = userAddress) {
    setIsLoading(true);
    try {
      const { tokenBalances, tokenData } = await getTokenBalance(
        address,
        tokenStandard,
      );
      setTokenBalances(tokenBalances);
      if (tokenData) {
        setTokenDataObjects(tokenData);
      }
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
    }
    setIsLoading(false);
  }

  const TokenItems =
    tokenStandard === TokenStandard.ERC20 ? (
      <ERC20Items
        tokenBalances={tokenBalances as TokenBalance[]}
        tokenData={tokenDataObjects}
      />
    ) : (
      <ERC721Items ownedNFTs={tokenBalances as OwnedNft[]} />
    );

  return (
    <Box w="100vw">
      <Box mx={50}>
        <Flex>
          <WalletConnector
            fetchTokenBalance={fetchTokenBalance}
            tokenStandard={tokenStandard}
          />
          <Spacer />
          <TokenSwitch setTokenStandard={switchTokenStandard} />
        </Flex>
      </Box>
      <Center>
        <Flex
          alignItems={"center"}
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading mb={0} fontSize={36}>
            Token Indexer
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
          Get all the {tokenStandard} token balances of this address:
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
          onClick={() => fetchTokenBalance(userAddress)}
          mt={36}
          bgColor="gray"
          isLoading={isLoading}
        >
          Check {tokenStandard} Token Balances
        </Button>

        <Heading my={36}>{tokenStandard} token balances:</Heading>

        {!isLoading
          ? TokenItems
          : errMsg || "Please make a query! This may take a few seconds..."}
      </Flex>
    </Box>
  );
}

export default App;
