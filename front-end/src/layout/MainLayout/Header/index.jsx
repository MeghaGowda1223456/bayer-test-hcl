import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Typography,
  Button,
  Menu,
  MenuItem,
  Popover,
} from "@mui/material";

// project imports
import LogoSection from "../LogoSection";
import SearchSection from "./SearchSection";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

// assets
import { IconMenu2 } from "@tabler/icons-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: "1",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mr: 2,
            width: 228,
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              width: "auto",
            },
            padding: "0",
          }}
        >
          <Box
            component="span"
            sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
          >
            <LogoSection />
          </Box>

          <div className="iconForWeb">
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                "&:hover": {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              onClick={handleLeftDrawerToggle}
              color="inherit"
            >
              <IconMenu2 stroke={1.5} size="1.3rem" />
            </Avatar>
          </div>
          <div className="iconForMobile">
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <Box
                sx={{ display: "flex", p: 0, mx: "auto" }}
                onClick={handleLeftDrawerToggle}
              >
                <LogoSection />
              </Box>
            </Box>
          </div>
        </Box>

        <Box style={{ display: "flex", alignItems: "center" }}>
          <Typography
            px={2}
            variant="h3"
            sx={{
              fontFamily: "Noize Sport Free Vertion",
              fontSize: { xs: "1.25rem", sm: "2.5rem" },
              fontWeight: 400,
              lineHeight: "55.33px",
              textAlign: "left",
            }}
          >
            Peer2Play
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", fontSize: 30 }}>
          🍐
          <Box>
            <Avatar
              onClick={handleClick}
              sx={{
                width: 42,
                height: 42,
                cursor: "pointer",
                bgcolor: "white",
              }}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ width: "300px" }}
            >
              <MenuItem onClick={handleClose}>
                <SearchSection />
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Box sx={{ display: "block" }}>
                  <ConnectButton />
                </Box>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func,
};

export default Header;
