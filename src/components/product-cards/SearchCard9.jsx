import { Add, Remove,Favorite  } from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Rating,
  styled,
} from "@mui/material";
import Image from "components/BazaarImage";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Span ,Small} from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { useCallback,useState  } from "react"; // styled components
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import BazaarRating from "components/BazaarRating";


const Wrapper = styled(Card)(() => ({
  width: "100%",
  overflow: "hidden",
  position: "relative",
  marginBottom: "1.25rem",
})); // ===========================================================
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
// ===========================================================
const SearchCard9 = ({ 
  id,
  name,
  mrp,
  image,
  slug,
  sku,
  salePrice,
  description,
  // category = "Product Dialog",
  rating = 5,
  hideRating,
  hoverEffect,
  discount,
  stock,
  isNewArrival,
  showProductSize,
  category,
  wishList,ProductReviews,
  wishlist
}) => {
  const imgbaseurl=process.env.NEXT_PUBLIC_IMAGE_BASE_API_URL

  const { state, dispatch } = useAppContext();
  const cartItem = state.cart.find((item) => item.id === id);
  const { data: session, status } = useSession()
  const addwishtlist = async () => {
    
    let userid = session.user.id
    await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE+"updateWishlist", {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        itemid: id,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer '+session.accessToken
      },
    }).then((res) => res.json());
    setIsFavorite((fav) => !fav)
  }
  const Reviews = ProductReviews.Reviews.filter((item) => item.itemid_id === id);

  const totalRatings = Reviews.reduce((total, item) => total + item.rating, 0);
  
  const averageRating = totalRatings /Reviews.length;
   
  const roundedAverageRating = Math.min(Math.round(averageRating * 100) / 100, 5);
  
  const total=Reviews.length;
  const [isFavorite, setIsFavorite] = useState(undefined);
  if (Array.isArray(wishlist) && isFavorite === undefined) {
    setIsFavorite((fav) =>
      fav === undefined ? wishlist.some((item) => item.id === id) : false
    );
  }



  const handleCartAmountChange = useCallback(
    (product,amount) => () =>{
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: product,
      });
      if (amount==true) {
      
        toast.success("Added to cart", { position: toast.POSITION.TOP_RIGHT });
      } else {

        toast.error("Removed from cart", { position: toast.POSITION.TOP_RIGHT });
      }
    }
     
    
  );
  if (session)
  {
    return (
      <Wrapper>
       <IconButton
        onClick={() => addwishtlist()}
          size="small"
          sx={{
            position: "absolute",
            top: 15,
            right: 15,
          }}
        >
          
        
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
       
        </IconButton>
  
        <Grid container spacing={1}>
        <Grid item sm={1.5} xs={10}>
            <Box position="relative">
              {!!discount && (
                <Chip
                  size="small"
                  color="primary"
                  label={`${discount}% off`}
                  sx={{
                    top: 15,
                    left: 15,
                    px: "5px",
                    fontSize: 10,
                    fontWeight: 600,
                    position: "absolute",
                  }}
                />
              )}
  
              <Image src={imgbaseurl+image} alt={name} width="100%" />
            </Box>
          </Grid>
  
          <Grid item sm={9} xs={12}>
            <FlexBox
              flexDirection="column"
              justifyContent="center"
              height="100%"
              p={2}
            >
              <Link href={`/product/${slug}`}>
                <a>
                  <H5 fontWeight="600" my="0.5rem">
                    {name}
                  </H5>
                </a>
              </Link>
              <FlexBox>
                <BazaarRating
                  value={averageRating && averageRating ? averageRating : 0}
                  color="warn"
                  readOnly
                />
                <Small ml={2} fontWeight={600} color="grey.500">
                  ({total && total ? total : 0})
                </Small>
              </FlexBox>
  
              <FlexBox mt={1} mb={2} alignItems="center">
                <H5 fontWeight={600} color="primary.main" mr={1}>
                  Rs. {mrp?.toFixed(2)}
                </H5>
  
                {!!discount && (
                  <Span fontWeight="600" color="grey.600">
                    <del>Rs. {(mrp - (mrp * discount) / 100).toFixed(2)}</del>
                  </Span>
                )}
              </FlexBox>
              {stock==0.00?(
    <><StyledChip color="primary" size="small" label='Out of Stock' /></>
  ):(
    <FlexBox>
                {!cartItem?.qty && (
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      height: 32,
                    }}
                    onClick={handleCartAmountChange({
                      id,
                      mrp,
                      salePrice,
                      price: salePrice,
                      sku,
                      slug,
                      image:imgbaseurl+image,
                      name: name,
                      qty: (cartItem?.qty || 0) + 1,
                    },true)}
                  >
                    Add To Cart
                  </Button>
                )}
  
  {!!cartItem?.qty && (
                  <FlexBetween>
                   
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{
                        padding: "5px",
                      }}
                      onClick={handleCartAmountChange({
                        id,
                        mrp,
                        salePrice,
                        price: salePrice,
                        sku,
                        slug,
                        image:imgbaseurl+image,
                        name: name,
                        qty: (cartItem?.qty || 0) - 1,
                      },false)}
                    >
                      <Remove fontSize="small" />
                    </Button>
                    <H5 fontWeight="600" fontSize="15px" mx={1.5}>
                      {cartItem.qty}
                    </H5>
                    <Button
                      color="primary"
                      variant="outlined"
                      sx={{
                        padding: "5px",
                      }}
                      onClick={handleCartAmountChange({
                        id,
                        mrp,
                        salePrice,
                        price: salePrice,
                        sku,
                        image:imgbaseurl+image,
                        name: name,
                        qty: (cartItem?.qty || 0) + 1,
                      },true)}
                    >
                      <Add fontSize="small" />
                    </Button>
                    
                  </FlexBetween>
                )}
              </FlexBox>
  )}
  
              
            </FlexBox>
          </Grid>
        </Grid>
      </Wrapper>
    );

  }
  else{
    return (
      <Wrapper>
       
  
        <Grid container spacing={1}>
        <Grid item sm={1.5} xs={10}>
            <Box position="relative">
              {!!discount && (
                <Chip
                  size="small"
                  color="primary"
                  label={`${discount}% off`}
                  sx={{
                    top: 15,
                    left: 15,
                    px: "5px",
                    fontSize: 10,
                    fontWeight: 600,
                    position: "absolute",
                  }}
                />
              )}
  
              <Image src={imgbaseurl+image} alt={name} width="100%" />
            </Box>
          </Grid>
  
          <Grid item sm={9} xs={12}>
            <FlexBox
              flexDirection="column"
              justifyContent="center"
              height="100%"
              p={2}
            >
              <Link href={`/product/${slug}`}>
                <a>
                  <H5 fontWeight="600" my="0.5rem">
                    {name}
                  </H5>
                </a>
              </Link>
              <FlexBox>
                <BazaarRating
                  value={averageRating && averageRating ? averageRating : 0}
                  color="warn"
                  readOnly
                />
                <Small ml={2} fontWeight={600} color="grey.500">
                  ({total && total ? total : 0})
                </Small>
              </FlexBox>
  
              <FlexBox mt={1} mb={2} alignItems="center">
                <H5 fontWeight={600} color="primary.main" mr={1}>
                  Rs. {mrp?.toFixed(2)}
                </H5>
  
                {!!discount && (
                  <Span fontWeight="600" color="grey.600">
                    <del>Rs. {(mrp - (mrp * discount) / 100).toFixed(2)}</del>
                  </Span>
                )}
              </FlexBox>
              {stock==0.00?(
    <><StyledChip color="primary" size="small" label='Out of Stock' /></>
  ):(
    <FlexBox>
    {!cartItem?.qty && (
      <Button
        color="primary"
        variant="contained"
        sx={{
          height: 32,
        }}
        onClick={handleCartAmountChange({
          id,
          mrp,
          salePrice,
          price: salePrice,
          sku,
          slug,
          image:imgbaseurl+image,
          name: name,
          qty: (cartItem?.qty || 0) + 1,
        },true)}
      >
        Add To Cart
      </Button>
    )}

    {!!cartItem?.qty && (
      <FlexBetween>
       
        <Button
          color="primary"
          variant="outlined"
          sx={{
            padding: "5px",
          }}
          onClick={handleCartAmountChange({
            id,
            mrp,
            salePrice,
            price: salePrice,
            sku,
            slug,
            image:imgbaseurl+image,
            name: name,
            qty: (cartItem?.qty || 0) - 1,
          },false)}
        >
          <Remove fontSize="small" />
        </Button>
        <H5 fontWeight="600" fontSize="15px" mx={1.5}>
          {cartItem.qty}
        </H5>
        <Button
          color="primary"
          variant="outlined"
          sx={{
            padding: "5px",
          }}
          onClick={handleCartAmountChange({
            id,
            mrp,
            salePrice,
            price: salePrice,
            sku,
            slug,
            image:imgbaseurl+image,
            name: name,
            qty: (cartItem?.qty || 0) + 1,
          },true)}
        >
          <Add fontSize="small" />
        </Button>
        
      </FlexBetween>
    )}
  </FlexBox>
  )}
  
             
            </FlexBox>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
 
};

// ProductCard9.defaultProps = {
//   title:
//     "Apple iPhone 5 Unlocked 16GB 8MP Used Cell-Phone-16gbIOS Used Refurbished 100%Factory Used",
//   imgUrl: "/assets/images/products/macbook.png",
//   off: 50,
//   price: 450,
//   rating: 0,
//   subcategories: [
//     {
//       title: "Bike",
//       url: "/#",
//     },
//     {
//       title: "Ducati",
//       url: "/#",
//     },
//     {
//       title: "Motors",
//       url: "/#",
//     },
//   ],
// };
export default SearchCard9;
