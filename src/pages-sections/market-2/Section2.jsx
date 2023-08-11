import { Box, Container, Card, Grid, keyframes, styled } from "@mui/material";
import CategoryCard1 from "components/category-cards/CategoryCard1";
import { FlexBox } from "components/flex-box";
import { H3, Paragraph, Span } from "components/Typography";
import { FlexBetween } from "components/flex-box";
import { H2 } from "components/Typography";
import Link from 'next/link';
import { carouselStyled } from "components/carousel/CarouselStyled";
import Carousel from "components/carousel/Carousel";
import { useEffect, useState } from "react"; // ======================================================================

import useWindowSize from "hooks/useWindowSize";

import shuffle from "lodash/shuffle";



const slideX = keyframes`
    from { left: 120% }
    to { left: -100% }
`; // custom styled components



const Section2 = (data) => {

console.log("byundle",data)

  const imgbaseurl=process.env.NEXT_PUBLIC_BACKEND_API_BASE
  const slugbaseurl='brand/'
  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(4);
  const [selected, setSelected] = useState("new");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => setFilteredProducts(shuffle(data)), [selected, data]);
  useEffect(() => {
    if (width < 426) setVisibleSlides(1);
    else if (width < 650) setVisibleSlides(2);
    else if (width < 1024) setVisibleSlides(3);
    else if (width < 1200) setVisibleSlides(4);
    else setVisibleSlides(5);
  }, [width]);

  return (
    <Container sx={{ mt: 8 }}>
      <FlexBetween mb={3}>
        <H2 style={{ color: '#d83c54', fontSize: 20 }}>Brand Bundles</H2>
        <Link href="/brands"><a style={{ color: '#d83c54', fontSize: 16 }}>View All</a></Link>
      </FlexBetween>
        <Carousel
        totalSlides={data.data.length}
        visibleSlides={visibleSlides}
        sx={carouselStyled}
      >
          {data.data.length>0?data.data.map((item) => (
            <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
              <CategoryCard1 image={imgbaseurl+item.icon} title={item.name} url={slugbaseurl+item.slug} />
            </Grid>
          )):"No data"}
          </Carousel>
    </Container>
  );
};

export default Section2;
