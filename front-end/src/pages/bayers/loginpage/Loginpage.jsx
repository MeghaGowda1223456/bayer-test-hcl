import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  FormHelperText,
} from "@mui/material";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setEmailError(false); // Reset error when the user starts typing
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError(false); // Reset error when the user starts typing
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Validate email and password
    let valid = true;
    let message = "";

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      valid = false;
      message = "Please enter a valid email address.";
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      valid = false;
      message = "Password must be at least 6 characters long.";
    }

    if (!valid) {
      setErrorMessage(message);
      return;
    }

    // If both email and password are valid
    alert("Email: " + email + "\n" + "Password: " + password);
  };

  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="https://www.bayer.com/themes/custom/bayer_cpa/logo.svg"
            width="200px"
            alt="user icon"
            style={{ marginBottom: "20px" }}
          />
          <Typography variant="h1" sx={{ marginBottom: "20px" }}>
            Login
          </Typography>

          {/* Email input using MUI TextField */}
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={handleChangeEmail}
            fullWidth
            margin="normal"
            variant="outlined"
            error={emailError}
            helperText={emailError ? "Please enter a valid email address." : ""}
            sx={{
              marginBottom: "15px",
              input: {
                padding: "12px 20px",
                fontSize: "15px",
              },
            }}
          />

          {/* Password input using MUI TextField */}
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            fullWidth
            margin="normal"
            variant="outlined"
            error={passwordError}
            helperText={
              passwordError
                ? "Password must be at least 6 characters long."
                : ""
            }
            sx={{
              marginBottom: "20px",
              input: {
                padding: "12px 20px",
                fontSize: "15px",
              },
            }}
          />

          {/* Error message if there is an issue with validation */}

          {/* Login button using MUI Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: "10px 25px",
              fontWeight: "bold",
              backgroundColor: "#8bc63f",
              "&:hover": {
                backgroundColor: "#8bc63f",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginForm;
