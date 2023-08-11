import { Box, Container, Grid, keyframes, styled } from "@mui/material";
import CategoryCard1 from "components/category-cards/CategoryCard1";
import CategoryCard2 from "components/category-cards/CategoryCard2";

import { FlexBox } from "components/flex-box";
import { H3, Paragraph, Span } from "components/Typography";

const slideX = keyframes`
    from { left: 120% }
    to { left: -100% }
`; // custom styled components

const AdWrapper = styled(FlexBox)(({ theme }) => ({
  color: "#fff",
  marginTop: "3rem",
  overflow: "hidden",
  backgroundColor: "#434343",
  position: "relative",
  "::before": {
    inset: 5,
    zIndex: 3,
    content: "''",
    position: "absolute",
    border: "1px dashed #fff",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const AdTitle1 = styled(H3)(({ theme }) => ({
  zIndex: 10,
  fontSize: 27,
  padding: "1.5rem",
  position: "relative",
  backgroundColor: "#e0e0e0",
  textTransform: "uppercase",
  color: theme.palette.dark.main,
  "::after": {
    top: -36,
    bottom: 0,
    zIndex: -1,
    right: -17,
    content: "''",
    position: "absolute",
    transform: "rotate(23deg)",
    border: "70px solid #e0e0e0",
  },
  [theme.breakpoints.down("sm")]: {
    marginBottom: 16,
    "::after": {
      display: "none",
    },
  },
}));

const Section3 = (dataa) => {
 console.log("Data3",dataa)
  const imgbaseurl=process.env.NEXT_PUBLIC_IMAGE_BASE_API_URL
  const slugbaseurl='category/'
  const data = [
    {
      url: slugbaseurl+ dataa.data1.category_slug ,
      title: dataa.data1.category_name && dataa.data1.category_name?dataa.data1.category_name:"Category3",
      id: dataa.data1.id,
      img:dataa.data1.image && +dataa.data1.image? imgbaseurl+dataa.data1.image:'/assets/images/banners/default.png',
    },
    {
      url: slugbaseurl+ dataa.data2.category_slug,
      title:dataa.data2.category_name &&dataa.data2.category_name?dataa.data2.category_name:"Category4",
      id: dataa.data2.id,
      img: dataa.data2.image &&dataa.data2.image?imgbaseurl+dataa.data2.image:'/assets/images/banners/default.png',
    },
    {
      url:  slugbaseurl+ dataa.data3.category_slug,
      title:dataa.data3.category_name && dataa.data3.category_name?dataa.data3.category_name:"Category5",
      id: dataa.data3.id,
      img: dataa.data3.image&&dataa.data3.image?imgbaseurl+dataa.data3.image:'/assets/images/banners/default.png',
    },
    {
      url: slugbaseurl+ dataa.data4.category_slug,
      title: dataa.data4.category_name&&dataa.data4.category_name?dataa.data4.category_name:"Category6",
      id: dataa.data4.id,
      img:dataa.data4.image && dataa.data4.image? imgbaseurl+dataa.data4.image:'/assets/images/banners/default.png',
    },
    {
      url:  slugbaseurl+ dataa.data5.category_slug,
      title:dataa.data5.category_name&&dataa.data5.category_name?dataa.data5.category_name:"Category7",
      id: dataa.data5.id,
      img: dataa.data5.image && dataa.data5.image?imgbaseurl+dataa.data5.image:'/assets/images/banners/default.png',
    },
    {
      url: slugbaseurl+ dataa.data6.category_slug,
      title:dataa.data6.category_name && dataa.data6.category_name?dataa.data6.category_name:'Category8',
      id: dataa.data6.id,
      img: dataa.data6.image&&dataa.data6.image?imgbaseurl+dataa.data6.image:'/assets/images/banners/default.png',
    },
  ];
  return (
    <Container
      sx={{
        mt: 8,
      }}
    >
      <Grid container spacing={3}>
        {data.length>0?data.map((item) => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={item.id}>
            <CategoryCard2 image={item.img} title={item.title} url={item.url} />
          </Grid>
        )):"No Product Added"}

      
      </Grid>
    </Container>
  );
};

export default Section3;
