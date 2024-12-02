import PropTypes from "prop-types";

// material-ui
import { Avatar, Link, Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";

// third-party
// import PerfectScrollbar from "react-perfect-scrollbar";
import { BrowserView, MobileView } from "react-device-detect";

// project imports
// import MenuCard from "./MenuCard";
import MenuList from "./MenuList";
import LogoSection from "../LogoSection";
// import Chip from "../../../ui-component/extended/Chip";
import Twitter from "../../../assets/Twitter.png";
import Discord from "../../../assets/Discord.png";
import Telegram from "../../../assets/Telegram.png";

import { drawerWidth } from "../../../store/constant";
// import Logo from "../../../ui-component/Logo";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";

// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const { address, isConnected } = useAccount();
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");
  const [walletDetails, setWalletDetails] = useState(null);
  // const [walletGenerated, setWalletGenerated] = useState(false);
  // const [username, setUsername] = useState("");
  // const balance = 512.12;
  // const walletAddress = "0xaeS...EF";

  useEffect(() => {
    if (isConnected) {
      fetchUserDetails();
      // fetchUserBalance(address, setUserBalance);
    } else {
      resetState();
    }
  }, [isConnected]);
  const fetchUserDetails = async () => {
    // setLoading(true);
    // setErrorMessage("");
    try {
      const response = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "fetchUserDetailsAddress",
          additional_params: { PublicAddress: address },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log(response, "response");
      if (response.status === 200 && response.data) {
        setWalletDetails(response.data);
        // setWalletGenerated(true);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      // setErrorMessage("Error fetching user details");
    } finally {
      // setLoading(false);
    }
  };
  console.log(walletDetails);
  const resetState = () => {
    // setUsername("");
    // // setUsernameAvailable(null);
    // setWalletGenerated(false);
    setWalletDetails(null);
    // setErrorMessage("");
    // setAmount("");
    // setSelectedCoin("Base ETH");
    // setUserBalance(null);
    // setIsMaxAmount(false);
    // setGeneratedWalletBalance(null);
    // setBonusTokens(null);
  };
  console.log(walletDetails);
  const formatWalletAddress = (address) => {
    if (!address) return "";
    const firstTwo = address.slice(0, 4);
    const lastThree = address.slice(-3);
    return `${firstTwo}...${lastThree}`;
  };
  const drawer = (
    <>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Box sx={{ display: "flex", p: 2, mx: "auto", my: 4 }}>
          <LogoSection />
        </Box>
      </Box>
      <BrowserView>
        {/* <PerfectScrollbar
          component="div"
          style={{
            height: !matchUpMd ? "calc(100vh - 56px)" : "calc(100vh - 88px)",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        > */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <MenuList />
          {/* <Box
            sx={{
              bottom: 0,
              display: "flex",
              maxWidth: "11rem",
              justifyContent: "space-evenly",
            }}
          >
            <Link href="https://x.com/Peer2Play_P2P?mx=2" target="_blank">
              <img src={Twitter} alt="Twitter" />
            </Link>
            <Link href="https://discord.com/invite/jnQMgmsQW8" target="_blank">
              <img src={Discord} alt="Discord" />
            </Link>
            <Link href="https://t.me/Peer2PlayAI" target="_blank">
              <img src={Telegram} alt="Telegram" />
            </Link>
          </Box> */}
        </Box>
        {/* </PerfectScrollbar> */}
      </BrowserView>
      <MobileView>
        <Box sx={{ px: 2 }}>
          <MenuList />
          {/* <Box
              sx={{
                bottom: 0,
                display: "flex",
                maxWidth: "11rem",
                justifyContent: "space-evenly",
              }}
            >
              <Link href="https://x.com/Peer2Play_P2P?mx=2" target="_blank">
                <img src={Twitter} alt="Twitter" />
              </Link>
              <Link href="https://discord.com/invite/jnQMgmsQW8" target="_blank">
                <img src={Discord} alt="Discord" />
              </Link>
              <Link href="https://t.me/Peer2PlayAI" target="_blank">
                <img src={Telegram} alt="Telegram" />
              </Link>
            </Box> */}
          {/* <MenuCard /> */}
          {/* <Stack direction="row" justifyContent="center" sx={{ mb: 2 }}>
            <Chip
              label={import.meta.env.VITE_APP_VERSION}
              disabled
              chipcolor="secondary"
              size="small"
              sx={{ cursor: "pointer" }}
            />
          </Stack> */}
        </Box>
      </MobileView>
    </>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : "auto" }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant={matchUpMd ? "persistent" : "temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={drawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: "none",
            [theme.breakpoints.up("md")]: {
              top: "66px",
            },
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

Sidebar.propTypes = {
  drawerOpen: PropTypes.bool,
  drawerToggle: PropTypes.func,
  window: PropTypes.object,
};

export default Sidebar;
