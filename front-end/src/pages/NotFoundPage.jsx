import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import footerImg from "../assets/notfound_footer_logo.png";
import p2plogo from "../assets/notfound_logo.png";
const NotFound = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh", // Ensure the page takes full height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        sx={{ bgcolor: "transparent", boxShadow: "none" }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={p2plogo} alt="Logo" style={{ height: 30 }} />
          </Typography>
          {/* <Button
            color="inherit"
            sx={{ border: "1px solid black", color: "black", paddingX: "15px" }}
          >
            Join Now
          </Button> */}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flexGrow: 1, // Allow this Box to grow and take up available space
        }}
      >
        <Container maxWidth="sm">
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "black",
            }}
          >
            <CardContent>
              <img
                src="./assets/404_ufo.png"
                alt="404 UFO"
                style={{ maxWidth: "100%" }}
              />
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  mt: 2,
                  fontWeight: "700",
                  fontSize: "20px",
                  color: "#fff",
                }}
              >
                What the 404?
              </Typography>
              <Typography
                variant="body1"
                sx={{ mt: 1, color: "#fff", fontSize: "14px" }}
              >
                You reaching here was destined by the Pear 🍐 Gods.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2, backgroundColor: "#2E77E9" }}
                href="/"
              >
                <ArrowBackOutlined /> Back to home
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>

      <Box sx={{ textAlign: "center", p: 2 }}>
        <img src={footerImg} alt="Footer Logo" style={{ height: 30 }} />
      </Box>
    </Box>
  );
};

export default NotFound;
