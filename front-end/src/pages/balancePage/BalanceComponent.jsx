import React, { useState, useEffect, useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Box, Button, Typography,Grid } from "@mui/material";
import wifi from "../../assets/Paypass.png";
import p2p from "../../assets/p2P.png";
import { Cable } from "@mui/icons-material";
import BalanceForm from "../../components/forms/BalanceForm";
import balanceBanner from "../../assets/group.png";
import { useAccount } from "wagmi";
import axios from "axios";
import { ethers } from "ethers";
import './BalanceComponent.css';

const WalletBalance = () => {
  const [formType, setFormType] = useState(null);
  const { address, isConnected } = useAccount();
  const [userBalance, setUserBalance] = useState(null);
  const [username, setUsername] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);

  const handleAddCoinsClick = useCallback(() => {
    setFormType("add");
  }, []);

  const handleWithdrawCoinsClick = useCallback(() => {
    setFormType("withdraw");
  }, []);

  const handleCloseForm = useCallback(() => {
    setFormType(null);
  }, []);

  const getWalletBalanceData = async (address) => {
    try {
      const res = await axios.post(
        "https://959vielcfh.execute-api.ap-southeast-2.amazonaws.com/dev/fetchBalanceAPI",
        {
          method: "fetchUserBalance",
          additional_params: { address },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200 && res.data) {
        setUserBalance(res.data.balance);
      }
    } catch (error) {
      console.error("Failed to fetch wallet balance:", error);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "fetchUserDetailsAddress",
          additional_params: { PublicAddress: address },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200 && res.data) {
        setWalletDetails(res.data);
        setUsername(res.data.PlayerUsername);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getWalletBalanceData(address);
      fetchUserDetails();
    }
  }, [isConnected]);

  const handleAddFunds = async (amount) => {
    try {
      if (typeof window.ethereum !== "undefined" && address) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const value = ethers.utils.parseEther(amount);
        const tx = await signer.sendTransaction({
          to: walletDetails.WalletPublicAddress,
          value,
        });
        await tx.wait();
        getWalletBalanceData(address); // Update balance after transaction
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    }
  };

  const handleWithdrawFunds = async (percentageToRemove) => {
    try {
      const res = await axios.post(
        "https://aod1hrtvnb.execute-api.ap-southeast-2.amazonaws.com/dev/withdrawFunds",
        {
          method: "withdrawFunds",
          additional_params: {
            UserPublicAddress: walletDetails.PublicAddress,
            percentageToRemove: parseFloat(percentageToRemove),
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "wuDVhnz8t013fFTECZUsR8D9IMdk7fKy6qcuITqC",
          },
        }
      );
      if (res.status === 200) {
        getWalletBalanceData(address); // Update user balance after transaction
      }
    } catch (error) {
      console.error("Error withdrawing funds:", error);
    }
  };

  const handleTransactionHistoryClick = () => {
    if (walletDetails && walletDetails.WalletPublicAddress) {
      window.open(`https://sepolia.basescan.org/address/${walletDetails.WalletPublicAddress}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <Typography fontSize="2rem" fontWeight="bold" color="black">
        Please connect your wallet.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", columnGap: "1rem"}}>
        <Typography fontSize="2.5rem" fontWeight="bold" color="black">
          Balance
        </Typography>
        {/* <Box
          sx={{
            backgroundColor: "#DBDBDB",
            color: "black",
            borderRadius: "25px",
            display: "flex",
            paddingX: "1rem",
            minWidth: "9rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Cable />
          <Typography>Transfer</Typography>
        </Box> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: "1rem",
          marginTop: "2rem",
            alignItems:"center"
        }}
        className='flexDirectionColumn'
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "1rem",
            marginTop: "2rem",
          }          
        }
        
        >
          <Box sx={{ position: "relative" }}>
            <img
              src={balanceBanner}
              alt="balance banner"
              style={{
                borderRadius: "25px",
                maxHeight: "25rem",
                maxWidth: "25rem",
                objectFit: "cover",
                width:"100%"
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "1.25rem",
                bottom: "2rem",
                borderRadius: "15px",
                padding:"1.5rem",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography fontSize="1.5rem" fontWeight="bold">
                  ETH {userBalance ? userBalance : "0.00"}
                </Typography>
                <img src={wifi} alt="balance component" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: {xs:"0rem", md:"1.25rem"},
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography fontSize="1.125rem">{username}</Typography>
                  <Typography fontSize="0.875rem" color="white" sx={{wordBreak:"break-word"}}>
                    WA: {address}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1, borderRadius: "30px" } }>
          {/* <Button
            // onClick={handleAddCoinsClick}
            sx={{
              position: "relative",
              display: "flex",
              maxWidth: "37.5rem",
              alignItems: "center",
              padding: "0.9375rem",
              margin: "0.5625rem 0",
              marginTop: "2rem",
              borderRadius: "20px",
              background:
                "linear-gradient(to right, white, white), linear-gradient(to right, #35CCE4, #DF1DFF)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "padding-box, border-box",
              border: "2px solid transparent",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
              "&:focus": {
                outline: "none",
              },
            }}
            className="wallet-Operation-btn"
          >
            <Box
              sx={{
                minWidth: "3rem",
                minHeight: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "0.9375rem",
                padding: "0.5rem",
              }}
            >
              <AddIcon sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ minWidth: "11.25rem", textAlign: "left" }}
            >
              Add Coins
            </Typography>
          </Button>
          <Button
            // onClick={handleWithdrawCoinsClick}
            className="wallet-Operation-btn"
            sx={{
              position: "relative",
              display: "flex",
              maxWidth: "37.5rem",
              alignItems: "center",
              padding: "0.9375rem",
              margin: "0.5625rem 0",
              borderRadius: "20px",
              background:
                "linear-gradient(to right, white, white), linear-gradient(to right, #35CCE4, #DF1DFF)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "padding-box, border-box",
              border: "2px solid transparent",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <Box
              sx={{
                minWidth: "3rem",
                minHeight: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "0.9375rem",
                padding: "0.5rem",
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ minWidth: "11.25rem", textAlign: "left" }}
            >
              Withdraw Coins
            </Typography>
          </Button> */}
          <Button
            onClick={handleTransactionHistoryClick}
            sx={{
              position: "relative",
              display: "flex",
              maxWidth: "37.5rem",
              alignItems: "center",
              padding: "0.9375rem",
              // margin: "0.5625rem 0",
              borderRadius: "20px",
              background:
                "linear-gradient(to right, white, white), linear-gradient(to right, #35CCE4, #DF1DFF)",
              backgroundClip: "padding-box, border-box",
              backgroundOrigin: "padding-box, border-box",
              border: "2px solid transparent",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              },
              "&:focus": {
                outline: "none",
              },
            }}
            className="wallet-Operation-btn"
          >
            <Box
              sx={{
                minWidth: "3rem",
                minHeight: "2.5rem",
                borderRadius: "10px",
                backgroundColor: "#333",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "0.9375rem",
                padding: "0.5rem",
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h6"
              sx={{ minWidth: "11.25rem", textAlign: "left" }}
            >
              Transaction History
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box>
        {formType && (
          <BalanceForm
            type={formType}
            open={!!formType}
            onClose={handleCloseForm}
            onAddFunds={handleAddFunds}
            onWithdrawFunds={handleWithdrawFunds}
          />
        )}
      </Box>
    </>
  );
};

export default WalletBalance;
