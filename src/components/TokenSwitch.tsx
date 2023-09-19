import { Box, Flex } from "@chakra-ui/react";
import React, { ChangeEvent } from "react";
import { TokenStandard } from "../types/token";

interface Props {
  setTokenStandard: (standard: TokenStandard) => void;
}

const TokenSwitch = ({ setTokenStandard }: Props) => {
  const tokens: TokenStandard[] = [TokenStandard.ERC20, TokenStandard.ERC721];

  const handleSelectTokenStandard = ({
    target: { options },
  }: ChangeEvent<HTMLSelectElement>) => {
    setTokenStandard(tokens[options.selectedIndex]);
  };

  return (
    <Box>
      <Flex direction="column">
        <label htmlFor="token-standard">Select token standard</label>
        <select
          id="token-standard"
          onChange={handleSelectTokenStandard}
          required
        >
          {tokens.map((token) => (
            <option key={token} value="option1">
              {token}
            </option>
          ))}
        </select>
      </Flex>
    </Box>
  );
};

export default TokenSwitch;
