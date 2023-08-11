import { Apps, ViewList } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import SEO from "components/SEO";
import { FlexBox } from "components/flex-box";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductCard1List from "components/products/ProductCard1List";
import ProductCard9List from "components/products/ProductCard9List";
import { H5, H3, Paragraph } from "components/Typography";
import { useCallback, useState } from "react";
import api from "utils/api/market-2";
import { useRouter } from "next/router";


const ProductSearchResult = (props) => {
  const { categoryDetail,ProductReviews } = props;



  const [view, setView] = useState("grid");
  const downMd = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const toggleView = useCallback((v) => () => setView(v), []);
  const router = useRouter();
  const handleGoBack = () => router.back();

  return (
    <ShopLayout1>
      <SEO title={categoryDetail['name']}
        description={categoryDetail['metaDescription'] && categoryDetail['metaDescription'] != "undefined" ? categoryDetail['metaDescription'] : "Home Delivery Service for all " + categoryDetail['name'] + ". Order online from a wide range of " + categoryDetail['name'] + " at your doorstep across Pakistan."}
        metaTitle={categoryDetail['metaTitle'] && categoryDetail['metaTitle'] != "undefined" ? categoryDetail['metaTitle'] : "Buy " + categoryDetail['name'] + " Now"}
      />
      <Container
        sx={{
          mt: 4,
          mb: 6,
        }}
      >
        <Card
          elevation={1}
          sx={{
            mb: "55px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            p: {
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
              xs: "1.25rem 1.25rem 0.25rem",
            },
          }}
        >
          <Box>
            <H5>Searching for “ {categoryDetail['name']} ”</H5>
            {/* <Paragraph color="grey.600">{categoryDetail['title']?searchCategory.length:0} results found</Paragraph> */}
          </Box>

          <FlexBox
            alignItems="center"
            columnGap={4}
            flexWrap="wrap"
            my="0.5rem"
          >

            <FlexBox alignItems="center" my="0.25rem">
              <Paragraph color="grey.600" mr={1}>
                View:
              </Paragraph>

              <IconButton onClick={toggleView("grid")}>
                <Apps
                  color={view === "grid" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              <IconButton onClick={toggleView("list")}>
                <ViewList
                  color={view === "list" ? "primary" : "inherit"}
                  fontSize="small"
                />
              </IconButton>

              {/* {downMd && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <ProductFilterCard />
                </Sidenav>
              )} */}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3}>
          {/* <Grid
            item
            md={3}
            sx={{
              display: {
                md: "block",
                xs: "none",
              },
            }}
          >
            <ProductFilterCard />
          </Grid> */}

          <Grid item md={12} xs={12}>
            {categoryDetail['name'] ?
              view === "grid" ? <ProductCard1List category={categoryDetail} ProductReviews={ProductReviews && ProductReviews?ProductReviews:[]} /> : <ProductCard9List category={categoryDetail} ProductReviews={ProductReviews && ProductReviews?ProductReviews:[]} />
              :
              <Box><H3 color="red">No Result Found</H3></Box>
            }

          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );

};

export async function getServerSideProps(context) {
  const catSlug = context.query['slug'];
  const categoryDetail = await api.getCategoryDetail(catSlug);
  const ProductReviews=await api.getReviews()

  return {
    props: {
      categoryDetail,
      ProductReviews,
    },
  };
}
export default ProductSearchResult;
