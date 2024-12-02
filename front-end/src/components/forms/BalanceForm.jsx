import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Ellipse from "../../assets/Ellipse.png";

const BalanceForm = ({ type, open, onClose, value }) => {
  const [amount, setAmount] = useState("");

  const handleConfirm = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{ paddingX: "24px", paddingTop: "16px", paddingBottom: "0" }}
      >
        {type === "add" ? "Add" : "Withdraw"} Coins To:
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="black">
          0x3bc9e520705cb03992e99e2bbb0bf19415123
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "10px",
            mt: 2,
          }}
        >
          <TextField
            label="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <Button
            variant="outlined"
            sx={{
              color: "black",
              paddingY: "5px",
              borderRadius: "10px",
            }}
          >
            Max
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            columnGap: "10px",
            mt: 2,
          }}
        >
          <TextField label="BASE ETH" fullWidth sx={{ flex: 1 }} />
          <Button
            variant="outlined"
            sx={{
              color: "black",
              padding: "0",
              border: "none",
              "&:hover": {
                border: "none",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <img
              src={Ellipse}
              alt="Ellipse"
              style={{ width: "auto", height: "100%" }}
            />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleConfirm}
          sx={{ border: "1px solid blue", color: "black" }}
        >
          Confirm
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ border: "1px solid red", color: "black" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BalanceForm;
