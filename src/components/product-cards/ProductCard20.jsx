import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
import { Chip} from "@mui/material";
import { Add,  Remove} from "@mui/icons-material";
import BazaarButton from "components/BazaarButton";
import { H1, H2, H3,H4, H6 } from "components/Typography";
import ProductViewDialog from "components/products/ProductViewDialog";
import {  Paragraph, Small } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox } from "../flex-box";
import { Fragment, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';
import { FlexRowCenter } from "components/flex-box";

// import { useState } from "react"; // custom styled components
// import mypic from '../../public/assets/images/promotion/offer-1.png'

const Card = styled(Box)(({ theme }) => ({
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[100]}`,
  ":hover": {
    "& .product-actions": {
      right: 5,
    },
    "& img": {
      transform: "scale(1.1)",
    },
    border: `1px solid ${theme.palette.dark.main}`,
  },
}));
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
const StyledChip1 = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "15px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const CardMedia = styled(Box)(() => ({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
}));
const AddToCartButton = styled(IconButton)(() => ({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
}));
const FavouriteButton = styled(IconButton)(() => ({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s",
})); // ==============================================================

// ==============================================================
const ProductCard20 = ({ product, wishList,data}) => {
  // const imgbaseurl=process.env.NEXT_PUBLIC_BACKEND_API_BASE
console.log("Section22",data)



const Reviews = data.Reviews.filter((item) => item.itemid_id === product.id);

const totalRatings = Reviews.reduce((total, item) => total + item.rating, 0);

const averageRating = totalRatings /Reviews.length;
 
const roundedAverageRating = Math.min(Math.round(averageRating * 100) / 100, 5);

const total=Reviews.length;

  const imgbaseurl = process.env.NEXT_PUBLIC_IMAGE_BASE_API_URL;
  const slugbaseurl='/product/'

  const { data: session, status } = useSession()
  const addwishtlist = async () => {
    
    let userid = session.user.id
    await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE+"updateWishlist", {
      method: "POST",
      body: JSON.stringify({
        userid: userid,
        itemid: product.id,
      }),
      headers: {
        "Content-Type": "application/json",
        "Authorization":'Bearer '+session.accessToken
      },
    }).then((res) => res.json());
    setIsFavorite((fav) => !fav)
  }

  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(undefined);
  if (Array.isArray(wishList) && isFavorite === undefined) {
    setIsFavorite((fav) =>
      fav === undefined ? wishList.some((item) => item.id === product.id) : false
    );
  }
  const cartItem = state.cart.find((item) => item.id === product.id); // handle favourite
  const MAX_LENGTH = 18;
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);
  const [active, setActive] = useState(false)

  // const handleCartAmountChange = useCallback(
  //   (product) => () =>
  //     dispatch({
  //       type: "CHANGE_CART_AMOUNT",
  //       payload: product,
  //     }),
  //   []
  // );
  const handleCartAmountChange = useCallback(
    (amount,addedflag) => () => {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          mrp:product.mrp,
          salePrice: product.salePrice,
          price:product.salePrice,
          qty: amount,
          name: product.name,
          sku:product.sku,
          slug:product.slug,
          image: imgbaseurl+product.image,
          id: product.id || routerId,

        }
      });
      if (addedflag==true) {
      
        toast.success("Added to cart", { position: toast.POSITION.TOP_RIGHT });
      } else {

        toast.error("Removed from cart", { position: toast.POSITION.TOP_RIGHT });
      }
    },
    []
  );

  const handleAddToCart = (product) => {
    const payload = {
      id: product.id,
      name: product.name,
      imgUrl: product.image,
      mrp: product.salePrice,
      qty: (cartItem?.quantity || 0) + 1,
    };
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload,
    });
  };
  if (session) {
    return (
      <Card height="100%">
        <CardMedia>
       
          <Link href={slugbaseurl+`${product.slug}`}>
      
            <a>
            {!!product.discount && (
            <StyledChip color="primary" size="small" label='Sale' />

        )}
 {product.stock == "0.00" && product.isNewArrival == 1 ? (
                <StyledChip color="secondary" size="small" label="Out of Stock | New Arrival" sx={{ml:1}} />
              ) : (
                product.isNewArrival == 1 && product.stock >"0.00"  ?(
                  <StyledChip1 color="secondary"  size="small" label="New Arrival" />

                ):(
                  product.isNewArrival <1 && product.stock =="0.00"  ?(
                    <StyledChip1 color="secondary"  size="small" label="Out of Stock" />
  
                  ):("")
                )
              
              
              )}


<div className="product-img-container">
  <Image
    width={300}
    height={300}
    alt="category"
    objectFit="contain"
    layout="intrinsic"
    className="product-img"
    src={imgbaseurl+product.image}
    media={{
      // Adjust image size for screens smaller than 600px wide
      '(max-width: 600px)': {
        width: '100%',
        height: 'auto',
      },
    }}
  />
</div>

<style>
  {`
    .product-img-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}
</style>
            </a>
          </Link>

          <AddToCartButton
            className="product-actions"
            onClick={() => setOpenDialog(true)}
          >
            <RemoveRedEye color="disabled" fontSize="small" />
          </AddToCartButton>
<FavouriteButton className="product-actions" onClick={() => addwishtlist()}>
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder color="disabled" fontSize="small" />
            )}
          </FavouriteButton>
        </CardMedia>

        <ProductViewDialog
          openDialog={openDialog}
          handleCloseDialog={() => setOpenDialog(false)}
          product={{
            id: product.id,
            name: product.name,
            mrp: product.mrp,
            sku:product.sku,
            slug:product.slug,
            salePrice:product.salePrice,
            description: product.description,
            categoryName:product.categoryName,
            stock:product.stock,
            image: imgbaseurl+product.image,

            imgGroup: [imgbaseurl+product.image, imgbaseurl+product.image],
          }}
        />

        <Box p={2} textAlign="center">

          <Paragraph style={{ "lineHeight": "1.5em", "height": "3em", "overflow": "hidden" }}>{product.name}</Paragraph>

     
          <H4 fontWeight={700} py={0.5}>
          <FlexBox alignItems="center" gap={1} mt={0.5}  flexDirection= "column">
              <Box 
              fontWeight="600" color="primary.main" sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',}}
              
              >
                Rs. {(product.salePrice).toFixed(2)}
              </Box>

              {!!product.discount && (
                <Box color="grey.600" fontWeight="600" sx={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex'
                }}>
                  <del>{product.mrp?.toFixed(2)}</del>
                </Box>
              )}
            </FlexBox>
          </H4>

          <FlexRowCenter gap={1} mb={2}>
          <Rating
            name="read-only"
            value={averageRating && averageRating?averageRating:0}
            readOnly
            sx={{
              fontSize: 14,
            }}
          />
          <Small fontWeight={600} color="grey.500">
            ({total &&total?total:0})
          </Small>
        </FlexRowCenter>
    
        {
  product.stock==0.00?(
    <><Button
    color="primary"
    variant="contained"
    disabled={true}
    fullWidth

  >
    Add to Cart
  </Button></>
  ):(
    !cartItem?.qty ? (
      <Button
      fullWidth
      color="dark"
      variant="outlined"
        onClick={handleCartAmountChange(1,true)}
     
      >
        Add to Cart
      </Button>
    ) : (
      <FlexBox alignItems="center" mb={4.5} sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row'
        }}>
        <BazaarButton
          size="small"
          sx={{
            p: 1,
          }}
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(cartItem?.qty - 1,false)}
        >
          <Remove fontSize="small" />
        </BazaarButton>

        <H3 fontWeight="600" mx={2.5}>
          {cartItem?.qty.toString().padStart(2, "0")}
        </H3>

        <BazaarButton
          size="small"
          sx={{
            p: 1,
          }}
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(cartItem?.qty + 1,true)}
        >
          <Add fontSize="small" />
        </BazaarButton>
      </FlexBox>
    )

  )

}
        

         
{/* <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{
                padding: "3px",
              }}
              onClick={handleCartAmountChange({
                id:product.id,
                mrp:product.mrp,
               salePrice:product.salePrice,
                price: product.salePrice,
                sku:product.sku,
                image:product.image,
                name: product.name,
                qty: (cartItem?.qty || 0) + 1,
              })}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={handleCartAmountChange({
                    id:product.id,
                    mrp:product.mrp,
                    salePrice:product.salePrice,
                    price: product.salePrice,
                    sku:product.sku,
                    image:product.image,
                    name: product.name,
                    qty: (cartItem?.qty || 0) - 1,
                  })}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox> */}
        </Box>
      </Card>
    );
  }
  else {
    return (
      <Card height="100%">
        <CardMedia>
       
          <Link href={slugbaseurl+`${product.slug}`}>
      
            <a>
            {!!product.discount && (
            <StyledChip color="primary" size="small" label='Sale' />

        )}
 {product.stock == "0.00" && product.isNewArrival == 1 ? (
                <StyledChip color="secondary" size="small" label="Out of Stock | New Arrival" sx={{ml:1}} />
              ) : (
                product.isNewArrival == 1 && product.stock >"0.00"  ?(
                  <StyledChip1 color="secondary"  size="small" label="New Arrival" />

                ):(
                  product.isNewArrival <1 && product.stock =="0.00"  ?(
                    <StyledChip1 color="secondary"  size="small" label="Out of Stock" />
  
                  ):("")
                )
              
              
              )}


<div className="product-img-container">
  <Image
    width={300}
    height={300}
    alt="category"
    objectFit="contain"
    layout="intrinsic"
    className="product-img"
    src={imgbaseurl+product.image}
    media={{
      // Adjust image size for screens smaller than 600px wide
      '(max-width: 600px)': {
        width: '100%',
        height: 'auto',
      },
    }}
  />
</div>

<style>
  {`
    .product-img-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `}
</style>


            </a>
          </Link>

          <AddToCartButton
            className="product-actions"
            onClick={() => setOpenDialog(true)}
          >
            <RemoveRedEye color="disabled" fontSize="small" />
          </AddToCartButton>

        </CardMedia>

        <ProductViewDialog
          openDialog={openDialog}
          handleCloseDialog={() => setOpenDialog(false)}
          product={{
            id: product.id,
            name: product.name,
            mrp: product.mrp,
            sku:product.sku,
            slug:product.slug,
            salePrice:product.salePrice,
            description: product.description,
            categoryName:product.categoryName,
            stock:product.stock,
                      image: imgbaseurl+product.image,

            imgGroup: [imgbaseurl+product.image, imgbaseurl+product.image],
          }}
        />

        <Box p={2} textAlign="center">

          <Paragraph style={{ "lineHeight": "1.5em", "height": "3em", "overflow": "hidden" }}>{product.name}</Paragraph>

     
          <H4 fontWeight={700} py={0.5} textAlign="center">
          <FlexBox alignItems="center" gap={1} mt={0.5} textAlign="center" flexDirection= "column">
              <Box fontWeight="600" color="primary.main" sx={{
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
              }}>
                Rs. {(product.salePrice).toFixed(2)}
              </Box>

              {!!product.discount && (
                <Box color="grey.600" fontWeight="600" sx={{
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                }}>
                  <del>{product.mrp?.toFixed(2)}</del>
                </Box>
              )}
            </FlexBox>
          </H4>

          {/* <FlexRowCenter gap={1} mb={2}>
          <Rating
            name="read-only"
            value={4}
            readOnly
            sx={{
              fontSize: 14,
            }}
          />
          <Small fontWeight={600} color="grey.500">
            ({product.reviews})
          </Small>
        </FlexRowCenter> */}
        {
  product.stock==0.00?(
    <><Button
                color="primary"
                variant="contained"
                disabled={true}
                fullWidth

              >
                Add to Cart
              </Button></>
    

  ):(
    !cartItem?.qty ? (
      <Button
      fullWidth
      color="dark"
      variant="outlined"
        onClick={handleCartAmountChange(1,true)}
      
      >
        Add to Cart
      </Button>
    ) : (

      // ==================================================================================

      <FlexBox alignItems="center" mb={4.5} sx={{
        display: 'flex',
        justifyContent: 'center',
        }}>
        <BazaarButton
          size="small"
          sx={{
            p: 1,
          }}
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(cartItem?.qty - 1,false)}
        >
          <Remove fontSize="small" />
        </BazaarButton>

        <H3 fontWeight="600" mx={2.5}>
          {cartItem?.qty.toString().padStart(2, "0")}
        </H3>

        <BazaarButton
          size="small"
          sx={{
            p: 1,
          }}
          color="primary"
          variant="outlined"
          onClick={handleCartAmountChange(cartItem?.qty + 1,true)}
        >
          <Add fontSize="small" />
        </BazaarButton>
      </FlexBox>
    )

  )

}
        

         
{/* <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={!!cartItem?.qty ? "space-between" : "flex-start"}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{
                padding: "3px",
              }}
              onClick={handleCartAmountChange({
                id:product.id,
                mrp:product.mrp,
               salePrice:product.salePrice,
                price: product.salePrice,
                sku:product.sku,
                image:product.image,
                name: product.name,
                qty: (cartItem?.qty || 0) + 1,
              })}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={handleCartAmountChange({
                    id:product.id,
                    mrp:product.mrp,
                    salePrice:product.salePrice,
                    price: product.salePrice,
                    sku:product.sku,
                    image:product.image,
                    name: product.name,
                    qty: (cartItem?.qty || 0) - 1,
                  })}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox> */}
        </Box>
      </Card>
    );
  }


};


export default ProductCard20;
