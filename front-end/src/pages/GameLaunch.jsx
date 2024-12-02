import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import "./GameLaunch.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import Player from "../assets/player.png";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
const GameLaunch = () => {
  const { address } = useAccount();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showGameOverlay, setShowGameOverlay] = useState(false);

  useEffect(() => {
    if (address) {
      fetchUserDetails();
    }
  }, [address]);

  const ColorButton = styled(Button)(() => ({
    color: "white",
    backgroundColor: "#F91AB0",
    borderRadius: "25px",
    "&:hover": {
      backgroundColor: "#F91AB0",
    },
    "&:focus": {
      outline: "none",
    },
  }));
  const fetchUserDetails = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
        {
          method: "fetchUserDetailsAddress",
          additional_params: { PublicAddress: address },
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200 && response.data) {
        setWalletDetails(response.data);
        setErrorMessage(""); // Clear any existing error message
      } else {
        setWalletDetails(null);
        setErrorMessage("Error fetching user details");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setErrorMessage("Error fetching user details");
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchGame = () => {
    setShowGameOverlay(true);
  };

  const closeOverlay = () => {
    setShowGameOverlay(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <div className="game-launch-box2">
        <div className="game-heading-container">
          <h1 className="game-heading">Games</h1>
        </div>
        <div className="dcl-main-container">
          <div className="dcl-img-container">
            <img src={Player} alt="dcl-player-img" className="dcl-player-img" />
          </div>
          <div className="play-now-btn-container">
            <button className="play-now-btn" onClick={handleLaunchGame}>
              Play Now
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
        </div>
        {/* Game Launch Modal */}
        <Dialog
          open={showGameOverlay}
          onClose={closeOverlay}
          fullWidth
          maxWidth="lg"
          sx={{
            height: "100%",
            "& .MuiDialog-paper": {
              height: "80%",
              maxHeight: "100%",
            },
          }}
        >
          <DialogTitle fontSize={"20px"}>
            DCL
            <IconButton
              aria-label="close"
              onClick={closeOverlay}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ height: "100% !important" }}>
            <iframe
              src="https://cricplay-git-main-peer2-play.vercel.app/"
              // src="https://dev-build.vercel.app/"
              frameBorder="0"
              allowFullScreen
              className="game-iframe"
              // style={{ width: "100%", height: "100%" }}
            ></iframe>
          </DialogContent>
        </Dialog>

        {/* {showGameOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <iframe
              src="https://cricplay-git-main-peer2-play.vercel.app/"
              frameBorder="0"
              allowFullScreen
              className="game-iframe"
            ></iframe>
            <button className="close-overlay-button" onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )} */}
      </div>
      {/* <div className="game-launch-box2">
        <img src={Logo} alt="Game Thumbnail" className="game-thumbnail" />
        <h2>Game Launch Page</h2>
        <p>Launch your game from here.</p>
        <ColorButton variant="contained" onClick={handleLaunchGame}>
          Launch Game
        </ColorButton>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      {showGameOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <iframe
              src="https://cricplay-git-main-peer2-play.vercel.app/"
              frameBorder="0"
              allowFullScreen
              className="game-iframe"
            ></iframe>
            <button className="close-overlay-button" onClick={closeOverlay}>
              Close
            </button>
          </div>
        </div>
      )} */}
    </Box>
  );
};

export default GameLaunch;
// import React, { useState, useEffect } from "react";
// import { useAccount } from "wagmi";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import "./GameLaunch.css";
// import GameLaunchModal from "../components/forms/GameLaunchModal";

// const GameLaunch = () => {
//   const { address } = useAccount();
//   const [walletDetails, setWalletDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [showGameOverlay, setShowGameOverlay] = useState(false);

//   useEffect(() => {
//     if (address) {
//       fetchUserDetails();
//     }
//   }, [address]);

//   const fetchUserDetails = async () => {
//     setLoading(true);
//     setErrorMessage("");
//     try {
//       const response = await axios.post(
//         "https://f960y57cn5.execute-api.ap-southeast-2.amazonaws.com/dev/peerplayDBAPI",
//         {
//           method: "fetchUserDetailsAddress",
//           additional_params: { PublicAddress: address },
//         },
//         { headers: { "Content-Type": "application/json" } }
//       );
//       if (response.status === 200 && response.data) {
//         setWalletDetails(response.data);
//         setErrorMessage("");
//       } else {
//         setWalletDetails(null);
//         setErrorMessage("Error fetching user details");
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       setErrorMessage("Error fetching user details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLaunchGame = () => {
//     setShowGameOverlay(true);
//   };

//   const closeOverlay = () => {
//     setShowGameOverlay(false);
//   };

//   return (
//     <Box textAlign="center" p={2}>
//       <Box className="game-launch-box">
//         <img
//           src="assets/images/header_logo.png"
//           alt="Game Thumbnail"
//           className="game-thumbnail"
//         />
//         <Typography variant="h4" gutterBottom>
//           Game Launch Page
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Launch your game from here.
//         </Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleLaunchGame}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} /> : "Launch Game"}
//         </Button>
//         {errorMessage && (
//           <Snackbar
//             open={Boolean(errorMessage)}
//             autoHideDuration={6000}
//             onClose={() => setErrorMessage("")}
//           >
//             <Alert onClose={() => setErrorMessage("")} severity="error">
//               {errorMessage}
//             </Alert>
//           </Snackbar>
//         )}
//         {successMessage && (
//           <Snackbar
//             open={Boolean(successMessage)}
//             autoHideDuration={6000}
//             onClose={() => setSuccessMessage("")}
//           >
//             <Alert onClose={() => setSuccessMessage("")} severity="success">
//               {successMessage}
//             </Alert>
//           </Snackbar>
//         )}
//       </Box>
//       {/* <Dialog
//         open={showGameOverlay}
//         onClose={closeOverlay}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>Game Overlay</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             <iframe
//               src="https://cricplay-git-main-peer2-play.vercel.app/"
//               frameBorder="0"
//               allowFullScreen
//               className="game-iframe"
//             ></iframe>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeOverlay} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//       <GameLaunchModal
//         showGameOverlay={showGameOverlay}
//         closeOverlay={closeOverlay}
//       />
//     </Box>
//   );
// };

// export default GameLaunch;
