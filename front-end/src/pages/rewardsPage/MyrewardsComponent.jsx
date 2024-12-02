import {
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import myrankingimg from "../../assets/myrewards.png";
import MyCarousel from "./Corosalcomponent";
import reward from "../../assets/reward.png";
import { getRewardPoints } from "../../services/utils/myRewardsServices/MyrewardsServices";
import { useAccount } from "wagmi";
import axios from "axios";
const daysArray = [
  { day: "Day 1", img: "🍐", val: "10+" },
  { day: "Day 2", img: "🍐", val: "10+" },
  { day: "Day 3", img: "🍐", val: "10+" },
  { day: "Day 4", img: reward, val: "20+" },
  { day: "Day 5", img: reward, val: "20+" },
  { day: "Day 6", img: reward, val: "20+" },
  { day: "Day 7", img: reward, val: "100+" },
];
const additionalPeers = [
  { day: "Day 1", img: "🍐", val: "10+" },
  { day: "Day 2", img: "🍐", val: "10+" },
  { day: "Day 3", img: "🍐", val: "10+" },
];
const MyrewardsComponent = () => {
  const { address } = useAccount();
  console.log(address);

  const [myPoints, setMypoints] = useState();

  const getMyPoints = async () => {
    const response = await axios.post(
      "https://rbl3tgodp6.execute-api.ap-southeast-2.amazonaws.com/dev/peerGoodyPoints",
      {
        action: "updateWebLoginPoints",
        additional_params: {
          UserPublicAddress: address,
        },
      },
      {
        headers: {
          "x-api-key": "GljLNe9vWg4221ipkBUtk8Sx4RrzwhGl7kcURUod",
          "Content-Type": "application/json",
        },
      }
    );
  };
  const fetchMyPoints = async () => {
    const response = await axios.post(
      "https://rbl3tgodp6.execute-api.ap-southeast-2.amazonaws.com/dev/peerGoodyPoints",
      {
        action: "fetchAllRedemptionLogs",
      },
      {
        headers: {
          "x-api-key": "GljLNe9vWg4221ipkBUtk8Sx4RrzwhGl7kcURUod",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data) {
      console.log(response);

      setMypoints(response.data.result[0].RedeemedPoints);
    }
  };
  useEffect(() => {
    if (address) {
      getMyPoints();
    }
  }, [address]);
  useEffect(() => {
    fetchMyPoints();
  }, []);
  console.log(address);

  return (
    <>
      <Box>
        <Typography
          sx={{
            fontSize: {
              xs: "2rem", // Small screens
              sm: "2.5rem", // Medium screens
              md: "3rem", // Large screens
              lg: "3.5rem", // Extra large screens
              xl: "4rem", // Ultra large screens
            },
            fontWeight: "700", // Ensure the font weight is uniform and responsive
            color: "#000000",
          }}
        >
          My Peer Rewards
        </Typography>
        <Typography
          sx={{
            fontSize: {
              xs: "0.875rem", // Small screens (mobile devices)
              sm: "1rem", // Medium screens (tablets)
              md: "1.125rem", // Large screens (small laptops)
              lg: "1.25rem", // Extra large screens (desktops)
              xl: "1.5rem", // Ultra large screens (large monitors)
            },
            fontWeight: "500",
            color: "#000000",
          }}
        >
          Collect Peer2Play Peers and Redeem them for exclusive rewards and
          special offers.
        </Typography>
        <Box mt={3}>
          <Box
            sx={{
              boxShadow: 1,
              background:
                "linear-gradient(180deg, rgba(31, 229, 253, 0.4) 0%, rgba(255, 22, 237, 0.4) 100%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: {
                xs: "100%", // Full width for small screens (mobile)
                sm: "60%", // 70% width for medium screens (tablets)
                md: "60%", // 60% width for large screens (small laptops)
                lg: "45%", // 50% width for extra-large screens (desktops)
                xl: "40%", // 40% width for ultra-large screens (large monitors)
              },
              height: {
                xs: "200px", // Smaller height for mobile screens
                sm: "250px", // Slightly larger height for tablets
                md: "240px", // Default height for larger screens
                lg: "280px", // Larger height for desktops
                xl: "320px", // Maximum height for large monitors
              },
              borderRadius: "16px",
            }}
          >
            <Box mx={3}>
              <Typography
                sx={{
                  fontSize: {
                    xs: "1rem", // Small screens
                    sm: "1.5rem", // Medium screens
                    md: "1rem", // Large screens
                    lg: "1.5rem", // Extra large screens
                    xl: "2rem", // Ultra large screens
                  },
                  fontWeight: "600", // Ensure the font weight is uniform and responsive
                  color: "#000000",
                  whiteSpace: "nowrap", // Prevent text from wrapping to the next line
                  overflow: "hidden", // Hide any overflowed text
                  textOverflow: "ellipsis",
                }}
              >
                My Peers
              </Typography>
              <Typography
                sx={{
                  my: 5,
                  fontSize: {
                    xs: "2rem", // Small screens
                    sm: "2.5rem", // Medium screens
                    md: "3rem", // Large screens
                    lg: "3.5rem", // Extra large screens
                    xl: "4rem", // Ultra large screens
                  },
                  fontWeight: "700", // Ensure the font weight is uniform and responsive
                  color: "#000000",
                }}
              >
                {address ? myPoints : "---"}
              </Typography>
            </Box>
            <Box>
              <img
                src={myrankingimg}
                style={{
                  width: "100%", // Ensure the image scales with the box width
                  height: "auto", // Maintain aspect ratio
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box mt={3}>
          <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="Platform"
            size="small"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start", // Align to the start
              alignItems: "center",
              flexWrap: { xs: "wrap", md: "nowrap" },
              gap: "12px",
              "& .MuiToggleButtonGroup-grouped": {
                aspectRatio: "5/2",
                borderRadius: "0px",
              },
            }}
          >
            <ToggleButton
              value="CollectPeers"
              sx={{
                width: "125px",
                height: "31px",
                fontSize: "16px",
                color: "#000",
                fontWeight: "400",
                textTransform: "none",
                borderRadius: "5rem !important",
                background: "#1FE5FD",
                "&.Mui-selected, &.MuiToggleButton-root:hover": {
                  // Combine hover and selected states
                  background: "#1FE5FD", // Set background color to blue
                  color: "#000",
                  fontWeight: "400",
                  border: 1,
                  borderColor: "gray",
                  borderRadius: "5rem !important",
                  outline: "transparent !important",
                },
                "&.MuiToggleButton-root:focus": {
                  outline: "none",
                },
              }}
            >
              Collect Peers
            </ToggleButton>
            <ToggleButton
              value="History"
              sx={{
                width: "125px",
                height: "31px",
                fontSize: "16px",
                color: "#000",
                fontWeight: "400",
                textTransform: "none",
                borderRadius: "5rem !important",
                background: "#1FE5FD",
                "&.Mui-selected, &.MuiToggleButton-root:hover": {
                  // Combine hover and selected states
                  background: "#1FE5FD", // Set background color to blue
                  color: "#000",
                  fontWeight: "400",
                  border: 1,
                  borderColor: "gray",
                  borderRadius: "5rem !important",
                  outline: "transparent !important",
                },
                "&.MuiToggleButton-root:focus": {
                  outline: "none",
                },
              }}
            >
              History
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box mt={3}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.875rem", // Small screens (mobile devices)
                sm: "1rem", // Medium screens (tablets)
                md: "1.125rem", // Large screens (small laptops)
                lg: "1.25rem", // Extra large screens (desktops)
                xl: "1.5rem", // Ultra large screens (large monitors)
              },
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Collect your Peers every day{" "}
            {/* <Button
              sx={{
                bgcolor: "#C7CA4A",
                color: "#fff",
                borderRadius: "6px",
                height: "2rem",
              }}
            >
              Collect Peers{" "}
            </Button> */}
          </Typography>
          <Typography
            sx={{
              fontSize: {
                xs: "0.7rem", // ~11.2px for small screens (mobile devices)
                sm: "0.75rem", // ~12px for medium screens (tablets)
                md: "0.8rem", // ~12.8px for large screens (small laptops)
                lg: "0.85rem", // ~13.6px for extra large screens (desktops)
                xl: "1rem", // ~16px for ultra large screens (large monitors)
              },
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Login 7 days in a row , your rewards will grow.
          </Typography>
          <Box mt={3}>
            {" "}
            <MyCarousel daysArray={daysArray} />
          </Box>
        </Box>
        <Box mt={3}>
          <Typography
            sx={{
              fontSize: {
                xs: "0.875rem", // Small screens (mobile devices)
                sm: "1rem", // Medium screens (tablets)
                md: "1.125rem", // Large screens (small laptops)
                lg: "1.25rem", // Extra large screens (desktops)
                xl: "1.5rem", // Ultra large screens (large monitors)
              },
              fontWeight: "500",
              color: "#000000",
            }}
          >
            Additional Peers
          </Typography>

          <Box mt={3}>
            <MyCarousel daysArray={additionalPeers} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MyrewardsComponent;
