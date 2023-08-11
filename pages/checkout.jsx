import { Container, Grid } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import SEO from "components/SEO";
import CheckoutForm2 from "pages-sections/checkout/CheckoutForm2";
import CheckoutSummary2 from "pages-sections/checkout/CheckoutSummary2";
import api from "utils/api/market-2";
import { useAppContext } from "contexts/AppContext";
import { useRouter } from 'next/router'
import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react'
import useSWR from 'swr';
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material/styles";
import axios from 'axios';


const Checkout = () => {
  const { data: session,status} = useSession();
  const [orderData,setOrderData] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const theme = useTheme();

  const router = useRouter()
  const { state } = useAppContext();
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const server_ip = process.env.NEXT_PUBLIC_BACKEND_API_BASE;
  const { data, error } = useSWR(server_ip + 'getGeneralSetting', fetcher);

  const deliveryFee = data && data.length > 0 ? data[0].shipping: "300";

  console.log("Data delivery fee",data)

  async function createOrder(values,cartList,totalPrice,router){
    // const { data: session,status} = useSession();
  

    // const data = await api.addOrder(values);
    if(session){
      const userid=session.user.id
    
      const data = await api.addOrder(values,cartList,totalPrice,userid )
      .then((res) => {
        if(res.status == 200){
          toast.success("Order Added Successfully", {position: toast.POSITION.TOP_RIGHT});
          }
          state.cart.length=null
          router.push('/order-confirmation');
      }).catch((error) => {
          if (error.response) {
            //// if api not found or server responded with some error codes e.g. 404
          if(error.response.status==400){
            var a =Object.keys(error.response.data)[0]
            toast.error(error.response.data[a].toString(), {position: toast.POSITION.TOP_RIGHT});
          }
          else{
            toast.error('Error Occured while Updating Product '+error.response.statusText, {position: toast.POSITION.TOP_RIGHT});
          }
          return error.response
        } else if (error.request) {
          /// Network error api call not reached on server 
          toast.error('Network Error', {position: toast.POSITION.TOP_RIGHT});
          return error.request
        } else {
          toast.error('Error Occured', {position: toast.POSITION.TOP_RIGHT});
          return error
        }
      });
      
      
  

    }
    else{
      const userid=null 
    
      const data = await api.addOrder(values,cartList,totalPrice,userid ).then((res) => {
        if(res.status == 200){
          toast.success("Order Added Successfully", {position: toast.POSITION.TOP_RIGHT});
          }
          state.cart.length=null
          router.push('/order-confirmation');
      }).catch((error) => {
          if (error.response) {
            //// if api not found or server responded with some error codes e.g. 404
          if(error.response.status==400){
            var a =Object.keys(error.response.data)[0]
            toast.error(error.response.data[a].toString(), {position: toast.POSITION.TOP_RIGHT});
          }
          else{
            toast.error('Error Occured while Adding Order '+error.response.statusText, {position: toast.POSITION.TOP_RIGHT});
          }
          return error.response
        } else if (error.request) {
          /// Network error api call not reached on server 
          toast.error('Network Error', {position: toast.POSITION.TOP_RIGHT});
          return error.request
        } else {
          toast.error('Error Occured', {position: toast.POSITION.TOP_RIGHT});
          return error
        }
      });
      

      
     
    }
   
  
  
  }
  const getTotalPrice = () => {
    const cartList = state.cart;
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };

  const handleFormSubmit = (values) => {
    const cartList = state.cart;
    const totalPrice = getTotalPrice()+deliveryFee;


  
    createOrder(values,cartList,totalPrice,router)
    setIsDisabled(true)
  };

  return (
    <ShopLayout1 topbarBgColor={theme.palette.grey[900]} navCategories={[]}>
      <SEO  title="Checkout" 
            metaTitle = "Checkout - Online Book Store"
      />
      <Container
        sx={{
          my: "1.5rem",
        }}
      >
    
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <CheckoutForm2
            isDisabled= {isDisabled}
            handleFormSubmit={handleFormSubmit} 


            />
          </Grid>

          <Grid item lg={4} md={4} xs={12}>
            <CheckoutSummary2
            
            DeliveryFee={data && data.length > 0 ? data[0].shipping: null}

            />
          </Grid>
        </Grid>
      </Container>
    </ShopLayout1>
  );
};

export default Checkout;
