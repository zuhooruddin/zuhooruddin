import { Box, Container, Grid, styled } from "@mui/material";
import AppStore from "components/AppStore";
import BazaarIconButton from "components/BazaarIconButton";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import Facebook from "components/icons/Facebook";
import Youtube from "components/icons/Youtube";

import Google from "components/icons/Google";
import GooglePlus from "components/icons/GooglePlus";
import Instagram from "components/icons/Instagram";
import Twitter from "components/icons/Twitter";
import { Paragraph } from "components/Typography";
import Link from "next/link";
import { layoutConstant } from "utils/constants";
import { useState, useEffect } from "react";
import useSWR from "swr";

// styled component
const StyledLink = styled("a")(({ theme }) => ({
  display: "block",
  borderRadius: 4,
  cursor: "pointer",
  position: "relative",
  padding: "0.3rem 0rem",
  color: theme.palette.grey[500],
  "&:hover": {
    color: theme.palette.grey[100],
  },
}));
const Footwrapper = styled(Box)(() => ({
  "@media only screen and (max-width: 600px)": {
    ".logo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 92,
    },
    ".logo1": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));

const Footer = ({ footerData }) => {
  console.log("footer data", footerData);

  const imgbaseurl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "media/";

  const fb = footerData ? footerData.facebook : "";
  const insta = process.env.NEXT_PUBLIC_COMPANY_INSTAGRAM;
  const google = process.env.NEXT_PUBLIC_COMPANY_GOOGLE;
  const iconList = [
    {
      icon: Facebook,
      url: fb,
    },

    {
      icon: GooglePlus,
      url: google,
    },
    {
      icon: Instagram,
      url: insta,
    },
  ];

  return (
    <Footwrapper>
      <footer>
        <Box bgcolor="#222935">
          <Container
            sx={{
              p: "1rem",
              color: "white",
            }}
          >
            <Box py={10} overflow="hidden">
              <Grid container spacing={3}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <Link href="/">
                    <a>
                      <Image
                        mb={2.5}
                        width={150}
                        src={
                          footerData ? imgbaseurl + footerData.footer_logo : "assets/images/logos/webpack.png"
                        }
                        alt="logo"
                      />
                    </a>
                  </Link>

                  <Paragraph mb={2.5} color="grey.500">
                    {footerData ? footerData.footer_description : ""}
                  </Paragraph>

                  {/* <AppStore /> */}
                </Grid>
                {footerData?footerData.column_two_heading?footerData.column_two_links?

                <Grid item lg={2} md={6} sm={6} xs={12}>
                  <Box
                    fontSize="18px"
                    fontWeight="600"
                    mb={1.5}
                    lineHeight="1"
                    color="white"
                  >
                    {/* About Us */}
                    {footerData ? footerData.column_two_heading : ""}
                  </Box>

                  <div>
                    {footerData && footerData.column_two_links
                      ? footerData.column_two_links
                        .filter((item) => item.column === 2) // Filter items with column=2
                        .map((item, ind) => (
                          <Link href={item.link} key={ind} passHref>
                            <StyledLink>{item.name}</StyledLink>
                          </Link>
                        ))
                      : ""}
                  </div>
                </Grid>
                :'':'':''
}
{
  footerData?footerData.column_three_heading?footerData.column_three_links?
  <Grid item lg={3} md={6} sm={6} xs={12} style={{ marginBottom: '20px' }}>
  <Box
    fontSize="18px"
    fontWeight="600"
    mb={1.5}
    lineHeight="1"
    color="white"
  >
    {footerData ? footerData.column_three_heading : ""}
  </Box>
  
  <div>
    {footerData && footerData.column_three_links
      ? footerData.column_three_links
        .filter((item) => item.column === 3) // Filter items with column=3
        .map((item, ind) => (
          <Link href={item.link} key={ind} passHref>
            <StyledLink>{item.name}</StyledLink>
          </Link>
        ))
      : ""}
  </div>
</Grid>

                :'':'':''
}
                
                <Grid item lg={3} md={6} sm={6} xs={12}>
                  <Box
                    fontSize="18px"
                    fontWeight="600"
                    mb={1.5}
                    lineHeight="1"
                    color="white"
                  >
                    {footerData ? footerData.footer_fourth_column_heading : ""}
                  </Box>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: footerData
                        ? footerData.footer_fourth_column_content
                        : "",
                    }}
                  />

                  <FlexBox className="flex" mx={-0.625}>
                    {footerData ? (
                      footerData.facebook ? (
                        <a
                          href={footerData.facebook}
                          target="_blank"
                          rel="noreferrer noopenner"
                        >
                          <BazaarIconButton
                            m={0.5}
                            bgcolor="rgba(0,0,0,0.2)"
                            fontSize="12px"
                            padding="10px"
                          >
                            <Facebook fontSize="inherit"></Facebook>
                          </BazaarIconButton>
                        </a>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {footerData ? (
                      footerData.instagram ? (
                        <a
                          href={footerData.instagram}
                          target="_blank"
                          rel="noreferrer noopenner"
                        >
                          <BazaarIconButton
                            m={0.5}
                            bgcolor="rgba(0,0,0,0.2)"
                            fontSize="12px"
                            padding="10px"
                          >
                            <Instagram fontSize="inherit"></Instagram>{" "}
                          </BazaarIconButton>
                        </a>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}

                    {footerData ? (
                      footerData.youtube ? (
                        <a
                          href={footerData.youtube}
                          target="_blank"
                          rel="noreferrer noopenner"
                        >
                          <BazaarIconButton
                            m={0.5}
                            bgcolor="rgba(0,0,0,0.2)"
                            fontSize="12px"
                            padding="10px"
                          >
                            <Youtube fontSize="inherit"></Youtube>{" "}
                          </BazaarIconButton>
                        </a>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                    {footerData ? (
                      footerData.twitter ? (
                        <a
                          href={footerData.twitter}
                          target="_blank"
                          rel="noreferrer noopenner"
                        >
                          <BazaarIconButton
                            m={0.5}
                            bgcolor="rgba(0,0,0,0.2)"
                            fontSize="12px"
                            padding="10px"
                          >
                            <Twitter fontSize="inherit"></Twitter>{" "}
                          </BazaarIconButton>
                        </a>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </FlexBox>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </footer>
    </Footwrapper>
  );
};

export default Footer;
