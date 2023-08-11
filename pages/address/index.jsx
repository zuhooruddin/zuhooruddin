import { Delete, Edit, Place } from "@mui/icons-material";
import { Button, IconButton, Pagination, Typography,Box  } from "@mui/material";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import TableRow from "components/TableRow";
import Link from "next/link";
import useSWR from 'swr';
import { H5,H4 } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import Login from "pages-sections/sessions/Login";

import axios from 'axios';
import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';



// function Profile() {
//   const fetcher =(url)=>axios.get(url).then(response=>response.data)

//   const { data,error } = useSWR('https://idrisbookbank-dev-server.inara.tech/deleteCustomerShipping', fetcher)
 
// }



const AddressList = () => {
  const [orderData,setOrderData] = useState([]);

  const deleteCustomerShipping = async (url, user_id, shipping_id, index) =>
  await fetch( process.env.NEXT_PUBLIC_BACKEND_API_BASE+'deleteCustomerShipping', {
    method: "POST",
    body: JSON.stringify({
      "id": user_id,
      shipping: shipping_id
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())
  .then(() => {
    setOrderData(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  }).catch((err) => {
     (err);
  });

  const url = process.env.NEXT_PUBLIC_BACKEND_API_BASE+'getCustomerShipping'
  const fetcher = (...args) =>   fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      // "Authorization":'Bearer '+session.accessToken
    },
    body: JSON.stringify({"id":session.user.id})
  }).then(res => res.json())
  .then((customerOrders) => {
    setOrderData(customerOrders)
  }).catch((err) => {
     (err);
});
const { orders, error} =  useSWR(url, fetcher);
const { data: session } = useSession();
("Session", session)
if (session && 'error' in session && session.error == "SessionTimedOut") {
  ("You have been logged out as your session was outdated. Please login again to continue shopping.");
 signOut();
 return (
   <FlexRowCenter flexDirection="column" minHeight="100vh">

<Login />
   </FlexRowCenter>
 )
}

else if(session){

  return (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Place}
        title="My Addresses"
        navigation={<CustomerDashboardNavigation />}
        // button={
        //   <Button
        //     color="primary"
        //     sx={{
        //       bgcolor: "primary.light",
        //       px: 4,
        //     }}
        //   >
        //     Add New Address
        //   </Button>
        // }
      />

      {
      orderData.length>0?
      orderData.map((item,index) => (
        <TableRow
          sx={{
            my: 2,
            padding: "6px 18px",
          }}
          key={item}
        >
          <Typography whiteSpace="pre" m={0.75} textAlign="left">
           {item.city}
          </Typography>

          <Typography flex="1.9  1.9 250px !important" m={0.75} textAlign="left">
            {item.address}
          </Typography>

        

          <Typography whiteSpace="pre" textAlign="center" color="grey.600">
            

          <IconButton onClick={() => deleteCustomerShipping('', item.user, item.id, index)}>
              <Delete fontSize="small" color="inherit" />
            </IconButton>
          </Typography>
        </TableRow>
      ))
    : <Box ml={5} ><H4 color="red">No Address Found</H4></Box>
    }

     
    </CustomerDashboardLayout>
  );
}
return (
  <FlexRowCenter flexDirection="column" minHeight="100vh">

    <Login />
    <Link href='/'>Back to Home</Link>
  </FlexRowCenter>
)
};


export default AddressList;
