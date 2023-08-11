import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { Button } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { FlexBox, FlexRowCenter } from "components/flex-box";
import SEO from "components/SEO";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductDescription from "components/products/ProductDescription";
import ProductInstruction from "components/products/ProductInstruction";
import ProductIntro from "components/products/ProductIntro";
import { H2 } from "components/Typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import StructuredData from "components/schema/StructuredData";
import ProductReview from "components/products/ProductReview";

import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/api/related-products";
import api from "utils/api/market-2";

const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

const ErrorContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& h1": {
    fontSize: "4rem",
    marginBottom: "1rem",
    color: theme.palette.text.secondary,
  },
  "& p": {
    fontSize: "1.2rem",
    marginBottom: "1.5rem",
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  "& a": {
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const ProductDetails = (props) => {
  const { productDetails,ProductReviews } = props;

  const imgbaseurl = process.env.NEXT_PUBLIC_IMAGE_BASE_API_URL;
  const baseurl = process.env.NEXT_PUBLIC_URL;
  const currentDate = new Date().toLocaleDateString();
  const [product, setProduct] = useState(productDetails[0]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBought, setFrequentlyBought] = useState([]);
  const router = useRouter();

  const filteredReviews = ProductReviews.Reviews.filter((item) => item.itemid_id === product.id);

const totalRatings = filteredReviews.reduce((total, item) => total + item.rating, 0);

const averageRating = totalRatings / filteredReviews.length;

const roundedAverageRating = Math.min(Math.round(averageRating * 100) / 100, 5);
const companyname=process.env.NEXT_PUBLIC_COMPANY_NAME
  const handleGoBack = () => router.back();
  const searchWords =
    process.env.NEXT_PUBLIC_URL + "/search/" + productDetails[0]["slug"];
  const slugbaseurl = "/product/";

  useEffect(() => {
    getRelatedProducts().then((data) => setRelatedProducts(data));
    getFrequentlyBought().then((data) => setFrequentlyBought(data));
  }, []);

  const handleOptionClick = (_, value) => setSelectedOption(value);
  const handleGoRelevantPage = () => router.push(searchWords);

  // const bookschema = {
  //   "@context": "https://schema.org",
  //   "@type": "DataFeed",
  //   dataFeedElement: [
  //     {
  //       "@context": "https://schema.org",
  //       "@type": "Book",
  //       "@id": baseurl + slugbaseurl + productDetails[0]["slug"],

  //       url: baseurl + slugbaseurl + productDetails[0]["slug"],
  //       name: productDetails[0]["name"],
  //       "image": imgbaseurl + productDetails[0]["imgUrl"],

  //       author: {
  //         "@type": "Person",
  //         name: productDetails[0]["author"],
  //       },
  //       workExample: [
  //         {
  //           "@type": "Book",
  //           "@id": baseurl + slugbaseurl + productDetails[0]["slug"],

  //           url: baseurl + slugbaseurl + productDetails[0]["slug"],

  //           potentialAction: {
  //             "@type": "ReadAction",

  //             expectsAcceptanceOf: {
  //               "@type": "Offer",

  //               price: productDetails[0]["salePrice"],

  //               priceCurrency: "PKR",

  //               eligibleRegion: {
  //                 "@type": "Country",
  //                 name: "PK",
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  //   "dateModified":currentDate
  // };

  // if (productDetails[0]["isbn"]) {
  //   bookschema.isbn = productDetails[0]["isbn"];
  // }

  const productschema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: productDetails[0]["name"],
    // "image": imgbaseurl+productDetails[0]["imgUrl"],

    image: [imgbaseurl + productDetails[0]["imgUrl"]],

    offers: {
      "@type": "Offer",
      url: baseurl + slugbaseurl + productDetails[0]["slug"],

      price: productDetails[0]["salePrice"],
      priceCurrency: "PKR",
    },
  };

  // const bookschema = {

  //   "@context": "https://schema.org",

  //   "@type": "Book",
  //   "@id": "Book",
  //   name: productDetails[0]["name"],
  //   thumbnailUrl: imgbaseurl + productDetails[0]["imgUrl"],
  //   url: imgbaseurl + slugbaseurl + productDetails[0]["slug"],
 

  //   image: imgbaseurl + productDetails[0]["imgUrl"],
  //   publisher: productDetails[0]["manufacturer"],
  //   // price: productDetails[0]['salePrice'],
  //   "expectsAcceptanceOf": {
  //     "@type": "Offer",

  //     "price": productDetails[0]['salePrice'],
  //     "priceCurrency": "PKR",

  //     "eligibleRegion": {
  //       "@type": "Country",
  //       "name": "PAKISTAN"
  //     }
  //   },

  // };

  if (productDetails[0]["description"]) {
    // bookschema.description = productDetails[0]["description"];
    productschema.description = productDetails[0]["description"];
  }
  if (productDetails[0]["isbn"]) {
    // bookschema.isbn = productDetails[0]["isbn"];
  }
  if (productDetails[0]["author"] !== "NOT AVAILABLE" && productDetails[0]["author"] !=undefined && productDetails[0]["author"]) {
    // bookschema.author = productDetails[0]["author"];
    productschema.author = productDetails[0]["author"];
  }
  if (
    productDetails[0]["manufacturer"] !== "NOT AVAILABLE" &&
    productDetails[0]["manufacturer"] != undefined &&
    productDetails[0]["manufacturer"]
  ) {
    //  bookschema.manufacturer= productDetails[0]["manufacturer"];
    productschema.manufacturer = productDetails[0]["manufacturer"];
  }

  if (productDetails[0]["sku"]) {
    productschema.sku = productDetails[0]["sku"];
  }

  return (
    <ShopLayout1>
        <StructuredData data={productschema} />


      {/* {productDetails[0]["publisherFlag"] === true ? (
        <StructuredData data={bookschema} />
      ) : (
        <StructuredData data={productschema} />
      )} */}

      <SEO
        title={
          productDetails[0]["name"]
            ? productDetails[0]["name"]
            : {companyname}
        }
        description={
          productDetails[0]["metaDescription"] &&
          productDetails[0]["metaDescription"] != "undefined"
            ? productDetails[0]["metaDescription"]
            : productDetails[0]["name"]
            ? "Looking for " +
              productDetails[0]["name"] +
              "? Order online and get it to your door-step."
            : {companyname}
        }
        metaTitle={
          productDetails[0]["metaTitle"] &&
          productDetails[0]["metaTitle"] != "undefined"
            ? productDetails[0]["metaTitle"]
            : productDetails[0]["name"]
            ? "Buy " + productDetails[0]["name"]
            : {companyname}
        }
      />

      <Container sx={{ my: 4 }}>
        {productDetails[0] ? (
          <ProductIntro
            product={productDetails[0]}
            slug={productDetails[0]["slug"]}
            total={filteredReviews.length}
            average={averageRating}
              />
        ) : (
          <H2>Loading...</H2>
        )}

<StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Product Instructions" />
          <Tab className="inner-tab" label="Review (3)" />

          {/* <Tab className="inner-tab" label="Review (3)" /> */}
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && <ProductDescription product={product} />}
          {selectedOption === 1 && <ProductInstruction product={product} />}
          
          {selectedOption === 2 && <ProductReview itemid={product.id} itemname={product.name}   reviews={ProductReviews && ProductReviews.Reviews.filter((item) => item.itemid_id === product.id)}

 />}

        </Box>
      </Container>
    </ShopLayout1>
  );
};
export async function getServerSideProps(context) {
  const slug = context.query["slug"];

  const productDetails = await api.getItemDetail(slug);
  const ProductReviews=await api.getReviews()
  if (!productDetails || !productDetails.length) {
    return {
      redirect: {
        destination: "/search/" + slug,
        permanent: false,
      },
    };
  }
  return {
    props: { productDetails,ProductReviews },
  };
}

export default ProductDetails;
