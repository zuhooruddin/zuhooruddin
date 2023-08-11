import { Container, Grid } from "@mui/material";
import BannerCard4 from "components/banners/BannerCard4";

import NavLink3 from "components/nav-link/NavLink3";

import { H2, H4, Paragraph, Span } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import Link from 'next/link'
import { useEffect, useState } from "react";
import { styled } from "@mui/material";

const Section4 = ({data1, data2, data3, userWishlist}) => {
  
  const imgbaseurl=process.env.NEXT_PUBLIC_BACKEND_API_BASE+'media/'
  const slugbaseurl='category/'
  const BannerCardWrapper = styled("div")(({ theme }) => ({
    "&:hover img": {
      filter: "brightness(50%)",
    },
    "&:hover h4": {
      color: theme.palette.common.white,
      fontSize:20
    },
    "&:hover a": {
      color: theme.palette.common.white,
    },
    "&:hover .banner-card img": {
      filter: "brightness(50%)",
    },
    "&:hover .banner-card h4": {
      color: theme.palette.common.white,
      fontSize: 20,
    },
    "&:hover .banner-card .nav-link": {
      color: theme.palette.common.white,
    },
  }));

  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={3} pt={8}>
        <Grid item md={4} xs={12}>
          <Link href={slugbaseurl+data1.category_slug}>
            <a>
            <BannerCardWrapper>
              <BannerCard4 img={data1.image &&data1.image?imgbaseurl+data1.image:'/assets/images/banners/default.png'} height={200} className="banner-card">
                <div>
                  <H4 fontSize={20} lineHeight={1} my={2}>
                    {data1.category_name&&data1.category_name?data1.category_name:"Category9"}
                    <br />
                  </H4>
                  <NavLink3
                    href={slugbaseurl+data1.category_slug}
                    text="Shop Now"
                    color="dark.main"
                    className="nav-link"
                  />
                </div>
              </BannerCard4>
            </BannerCardWrapper>
            </a>
          </Link>
        </Grid>
        
        <Grid item md={4} xs={12}>
          <Link href={slugbaseurl+data2.category_slug}>
            <a>
            <BannerCardWrapper>
              <BannerCard4 img={data2.image&&data2.image?imgbaseurl+data2.image:'/assets/images/banners/default.png'} height={200} className="banner-card">
                <div>
                  <H4 fontSize={20} lineHeight={1} my={2}>
                    {data2.category_name&&data2.category_name?data2.category_name:'Category10'}
                    <br />
                  </H4>
                  <NavLink3
                    href={slugbaseurl+data2.category_slug}
                    text="Shop Now"
                    color="dark.main"
                    className="nav-link"
                  />
                </div>
              </BannerCard4>
            </BannerCardWrapper>
            </a>
          </Link>
        </Grid>

        <Grid item md={4} xs={12}>
          <Link href={slugbaseurl+data3.category_slug}>
            <a>
            <BannerCardWrapper>
              <BannerCard4 img={data3.image&&data3.image?imgbaseurl+data3.image:'/assets/images/banners/default.png'} height={200} className="banner-card">
                <div>
                  <H4 fontSize={20} lineHeight={1} my={2}>
                    {data3.category_name && data3.category_name?data3.category_name:'Category11'}
                    <br />
                  </H4>
                  <NavLink3
                    href={slugbaseurl+data3.category_slug}
                    text="Shop Now"
                    color="dark.main"
                    className="nav-link"
                  />
                </div>
              </BannerCard4>
            </BannerCardWrapper>
            </a>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Section4;
