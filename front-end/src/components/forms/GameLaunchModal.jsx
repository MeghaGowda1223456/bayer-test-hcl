import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const GameLaunchModal = ({ showGameOverlay, closeOverlay }) => {
  return (
    <div>
      <Dialog
        open={showGameOverlay}
        onClose={closeOverlay}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>Game Overlay</DialogTitle>
        {/* <DialogContent> */}
        <DialogContentText>
          <iframe
            src="https://cricplay-git-main-peer2-play.vercel.app/"
            frameBorder="0"
            allowFullScreen
            className="game-iframe"
          ></iframe>
        </DialogContentText>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={closeOverlay} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default GameLaunchModal;
