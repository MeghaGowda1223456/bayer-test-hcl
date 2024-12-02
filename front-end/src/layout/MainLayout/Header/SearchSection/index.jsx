import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useAccount } from "wagmi";
import axios from "axios";

const SearchSection = () => {
  const { address, isConnected } = useAccount();
  const [bonusTokens, setBonusTokens] = useState("--");

  useEffect(() => {
    if (isConnected) {
      fetchBonusTokens(address);
    }
  }, [isConnected, address]);

  const fetchBonusTokens = async (publicAddress) => {
    try {
      const response = await axios.post(
        "https://dzej2dfwk6.execute-api.ap-southeast-2.amazonaws.com/dev/readBonus",
        {
          method: "fetchBonusByUserPublicAddress",
          additional_params: { UserPublicAddress: publicAddress },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "nRBEd2cBjB3N892nTswg34w6VIwgpD6S5kgQrFTm",
          },
        }
      );
      if (response.status === 200 && response.data) {
        setBonusTokens(response.data.BonusTokens);
      }
    } catch (error) {
      console.error("Error fetching bonus tokens:", error);
      setBonusTokens("--");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <Typography variant="h6" sx={{ color: "black" }}>
        Bonus Tokens:
      </Typography>
      <Typography variant="h6" sx={{ color: "black" }}> {isConnected ? bonusTokens : "--"}
      </Typography>
    </Box>
  );
};

export default SearchSection;
