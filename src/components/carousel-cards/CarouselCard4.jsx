/* eslint-disable react/no-unescaped-entities */
import { Box, styled } from "@mui/material";
import React from "react"; // custom styled components

const CardWrapper = styled(Box)(({ theme, img, mode }) => ({
  minHeight: 500,
  
  display: "flex",
  alignItems: "center",
  backgroundSize: "cover",
  backgroundRepeat: "round",
  backgroundImage: `url(${img})`,
  backgroundColor: mode === "dark" ? "#000" : "#fff",
  color: mode === "light" ? theme.palette.dark.main : "#fff",
  [theme.breakpoints.down("md")]: {
    minHeight: 200,
    justifyContent: "center",
    padding: 106,
    textAlign: "center",
    backgroundImage: "auto",
  },
})); // ===============================================================

// ===============================================================
const CarouselCard4 = ({ bgImage, mode = "dark", content }) => {
  return (
    <CardWrapper img={bgImage} mode={mode}>
      {content}
    </CardWrapper>
  );
};

export default CarouselCard4;
