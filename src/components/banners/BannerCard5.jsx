import { Box, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
// custom styled components
const CardWrapper = styled(Box)(() => ({
  overflow: "hidden",
  position: "relative",
}));
const CardContent = styled(Box)(() => ({
  top: 0,
  left: 32,
  zIndex: 1,
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
})); // ========================================================

// ========================================================
const BannerCard5 = ({ img, children, ...props }) => {
  return (
    <CardWrapper {...props}>
      <BazaarImage alt="category" height="100%" width="100%" src={img}  />

      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
};

export default BannerCard5;
