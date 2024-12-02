import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const options = {
  shouldForwardProp: (prop) => prop !== "gradientColors",
};

const GradientButton = styled(
  Button,
  options
)(({ theme, gradientColors }) => ({
  border: "5px solid",
  borderImageSlice: 1,
  borderImageSource: `linear-gradient(to left, ${gradientColors.join(",")})`,
}));

const borderRadius = 50;
const RoundGradientButton = styled(
  Button,
  options
)(({ theme, gradientColors }) => ({
  position: "relative",
  border: "5px solid transparent",
  backgroundClip: "padding-box",
  borderRadius,

  "&:after": {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    background: `linear-gradient(to left, ${gradientColors.join(",")})`,
    content: '""',
    zIndex: -1,
    borderRadius,
  },
}));

export default function ContainedButtons() {
  return (
    <Stack m={1} gap={2} direction="row">
      <GradientButton gradientColors={["red", "yellow"]} variant="contained">
        Default
      </GradientButton>
      <GradientButton gradientColors={["blue", "purple"]} variant="contained">
        Primary
      </GradientButton>
      <RoundGradientButton
        gradientColors={["red", "yellow"]}
        variant="contained"
      >
        Default
      </RoundGradientButton>
      <RoundGradientButton
        gradientColors={["blue", "purple"]}
        variant="contained"
      >
        Primary
      </RoundGradientButton>
    </Stack>
  );
}
