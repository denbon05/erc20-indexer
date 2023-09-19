import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { connectToWallet } from "../api/eth";
import { TokenStandard } from "../types/token";

interface Props {
  fetchTokenBalance: (address?: string) => Promise<void>;
  tokenStandard: TokenStandard;
}

const WalletConnector = ({ fetchTokenBalance, tokenStandard }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [walletAddress, setWalletAddress] = useState(
    window.ethereum?.selectedAddress,
  );

  const fetchAccount = async () => {
    setIsLoading(true);
    try {
      const account = await connectToWallet();
      setWalletAddress(account);
    } catch (err) {
      console.error(err);
      setErrMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchUserBalance = async () => {
    await fetchAccount();
    await fetchTokenBalance(walletAddress);
  };

  return (
    <Flex direction={"column"}>
      <Box>
        {walletAddress ? (
          <Button isLoading={isLoading} onClick={fetchUserBalance}>
            Show My {tokenStandard} token balance
          </Button>
        ) : (
          <Button isLoading={isLoading} onClick={fetchAccount}>
            Connect wallet
          </Button>
        )}
      </Box>
      {errMsg}
    </Flex>
  );
};

export default WalletConnector;
