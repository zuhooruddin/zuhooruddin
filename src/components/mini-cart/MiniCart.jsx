/* eslint-disable react-hooks/exhaustive-deps */
import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BazaarAvatar from "components/BazaarAvatar";
import BazaarButton from "components/BazaarButton";
import BazaarIconButton from "components/BazaarIconButton";
import { FlexBox } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import LazyImage from "components/LazyImage";
import { H5, Tiny } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import React, { useCallback } from "react"; // =========================================================
// import {server_ip} from "utils/backend_server_ip.jsx"

// =========================================================
const MiniCart = ({ toggleSidenav }) => {
  const imgurl = process.env.NEXT_PUBLIC_BACKEND_API_BASE;
  const slugbaseurl='/product/'

  const { palette } = useTheme();
  const { state, dispatch } = useAppContext();
  const cartList = state.cart;

  const handleCartAmountChange = useCallback(
    (amount, product) => () => {
      if('bundle' in product){product.bundle = false}
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: { ...product, qty: amount },
      });
    },
    []
  );

  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.mrp * item.qty, 0);
  };

  return (
    <Box width="380px">
      <Box
        overflow="auto"
        height={`calc(100vh - ${!!cartList.length ? "80px - 3.25rem" : "0px"})`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartList.length} item
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList.length && (
          <FlexBox
            alignItems="center"
            flexDirection="column"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              src="/assets/images/logos/shopping-bag.svg"
              width={90}
              height={100}
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}

        {cartList.map((item) => (
          <FlexBox
            py={2}
            px={2.5}
            key={item.id}
            alignItems="center"
            borderBottom={`1px solid ${palette.divider}`}
          >
            <FlexBox alignItems="center" flexDirection="column">
              <BazaarButton
                color="primary"
                variant="outlined"
                onClick={handleCartAmountChange(item.qty + 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Add fontSize="small" />
              </BazaarButton>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <BazaarButton
                color="primary"
                variant="outlined"
                disabled={item.qty === 1}
                onClick={handleCartAmountChange(item.qty - 1, item)}
                sx={{
                  height: "32px",
                  width: "32px",
                  borderRadius: "300px",
                }}
              >
                <Remove fontSize="small" />
              </BazaarButton>
            </FlexBox>

            <Link href={slugbaseurl+`${item.slug}`}>
              <a>
                <BazaarAvatar
                  mx={2}
                  width={76}
                  height={76}
                  alt={item.name}
                  src={item.image || "/assets/images/products/iphone-x.png"}
                />
              </a>
            </Link>

            <Box flex="1 1 0">
            <Link href="/product/[slug]" as={`/product/${item.slug}`}>
            <a>
                  <H5 className="title" fontSize="14px">
                    {item.name}
                  </H5>
                </a>
                    </Link>
            {/* <Link href={slugbaseurl+`${item.slug}` }>
                <a>
                  <H5 className="title" fontSize="14px">
                    {item.name}{item.slug}
                  </H5>
                </a>
              </Link> */}

              <Tiny color="grey.600">
                Rs. {item.mrp?.toFixed(2)} x {item.qty}
              </Tiny>

              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                Rs. {(item.qty * item.mrp).toFixed(2)}
              </Box>
            </Box>

            <BazaarIconButton
              ml={2.5}
              size="small"
              onClick={handleCartAmountChange(0, item)}
            >
              <Close fontSize="small" />
            </BazaarIconButton>
          </FlexBox>
        ))}
      </Box>

      {!!cartList.length && (
        <Box p={2.5}>
          <Link href="/checkout" passHref>
            <BazaarButton
              fullWidth
              color="primary"
              variant="contained"
              sx={{
                mb: "0.75rem",
                height: "40px",
              }}
              onClick={toggleSidenav}
            >
              Checkout Now (Rs. {getTotalPrice().toFixed(2)})
            </BazaarButton>
          </Link>

          <Link href="/cart" passHref>
            <BazaarButton
              fullWidth
              color="primary"
              variant="outlined"
              sx={{
                height: 40,
              }}
              onClick={toggleSidenav}
            >
              View Cart
            </BazaarButton>
          </Link>
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};
export default MiniCart;
