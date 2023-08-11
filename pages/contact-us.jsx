import { Container } from "@mui/material";
import ShopLayout1 from "components/layouts/ShopLayout1";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import SEO from "components/SEO";
import { H3, H5, Small,Paragraph } from "components/Typography";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import Setting from "components/Setting";
import Link from "next/link";
import { CreditCard, Email, Phone, Place } from "@mui/icons-material";
import { FlexBox } from "components/flex-box";
import axios from "axios";
import { useEffect, useState } from "react";


const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  boxShadow: "none",
  background:"white !important",
  alignItems: "center",
  padding: "20px 50px",
  justifyContent: "center",
  background: theme.palette.paste[50],
  [theme.breakpoints.down("sm")]: {
    padding: "20px 30px",
    "& h3": {
      fontSize: 20,
    },
  },
})); // ======================================================

// ======================================================
const ContactUs = (props) => {
  const imgbaseurl=process.env.NEXT_PUBLIC_BACKEND_API_BASE+'media/'
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_BASE;

  const title = "contact-us";
  const [data, setData] = useState(null);
  useEffect(() => {
    if (title) {
      fetchData();
    }
  }, [title]);

  const fetchData = () => {
    const url = `${apiUrl}get_dynamictext?key=${encodeURIComponent(title)}`;

    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        console.log("Respomse", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  return (
    <ShopLayout1>
      <SEO 
        title="Contact Us" 
        description={"Looking for Books? Order online and get it to your door-step."}
        metaTitle = "Contact Us"
      />
       {data && data
              .filter((item) => item.status === 1)
              .map((item) => (
                <div
                  key={item.id}
                  dangerouslySetInnerHTML={{ __html: item.value }}
                />
              ))}
      <Container
      sx={{
        mb: "70px",
      }}
      >
        
        <Grid container spacing={3}>
          {/* ==================== CARD 1 ================== */}
         
          <Grid item xs={12} md={4}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.373192551484!2d73.05024881454193!3d33.59562024910311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df949ccb759c21%3A0x3b738aa09d4ac3d1!2sIdris%20Book%20Bank!5e0!3m2!1sen!2s!4v1623312812821!5m2!1sen!2s" style={{'width': '100%', 'height': '300px'}} frameBorder="0" allowfullscreen="" aria-hidden="false" tabIndex="0"></iframe>
            <br/>
            <H3>Saddar Rawalpindi</H3>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Place
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <span>Bank Road Saddar Rawalpindi.</span>
            </FlexBox>
            <br/>
            <H5>Contact Info</H5>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Phone
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
                <a href="tel:0515568898" style={{'color': 'gray','font-family': 'Lato'}}>051-5568898</a>
                <a href="tel:0515568272" style={{'color': 'gray','font-family': 'Lato'}}>051-5568272</a>
                <a href="tel:0518460272" style={{'color': 'gray','font-family': 'Lato'}}>051-8460272</a> 
            </FlexBox>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Email
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <a href="mailto:idrisbookbank@gmail.com " style={{'color': 'gray','font-family': 'Lato'}}> idrisbookbank@gmail.com </a>
            </FlexBox>
          </Grid>

          {/* ==================== CARD 2 ================== */}

          <Grid item xs={12} md={4}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3324.3609355852223!2d73.13930221454119!3d33.56997675043842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfec50c5d59683%3A0xc5bfdf5adf0d12f1!2sIdris%20Book%20Bank%20Too*21%20PWD!5e0!3m2!1sen!2s!4v1623312703848!5m2!1sen!2s" style={{'width': '100%', 'height': '300px'}} frameBorder="0" allowfullscreen="" aria-hidden="false" tabIndex="0"></iframe>
            <br/>
            <H3>Main PWD Road Islamabad</H3>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Place
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <span>Main PWD Road, Din Plaza ,Islamabad.</span>
            </FlexBox>
            <br/>
            <H5>Contact Info</H5>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Phone
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
                <a href="tel:0515170709" style={{'color': 'gray','font-family': 'Lato'}}>051-5170709</a>
                <a href="tel:0515194196" style={{'color': 'gray','font-family': 'Lato'}}>051-5194196</a>
            </FlexBox>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Email
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <a href="mailto:idrisbookbank@gmail.com " style={{'color': 'gray','font-family': 'Lato'}}> idrisbookbank@gmail.com </a>
            </FlexBox>
          </Grid>

          {/* ==================== CARD 3 ================== */}


          <Grid item xs={12} md={4}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3325.7464385439876!2d73.12702861454015!3d33.53397755231164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfedf75d8d1047%3A0xd7f831a8e140ac48!2sIdris%20Book%20Bank%20Too%20GT%20Road%20Dha%202!5e0!3m2!1sen!2s!4v1623312900922!5m2!1sen!2s" style={{'width': '100%', 'height': '300px'}} frameBorder="0" allowfullscreen="" aria-hidden="false" tabIndex="0"></iframe>
          <br/>
          <H3>DHA Phase 2 Islamabad</H3>
          <br/>
            <FlexBox alignItems="center" gap={1}>
              <Place
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <span>Main G.T Road, DHA Phase 2 ,Islamabad.</span>
            </FlexBox>
            <br/>
            <H5>Contact Info</H5>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Phone
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
                <a href="tel:0518448496" style={{'color': 'gray','font-family': 'Lato'}}>051-8448496</a>
                <a href="tel:0514720439" style={{'color': 'gray','font-family': 'Lato'}}>051-4720439</a> 
            </FlexBox>
            <br/>
            <FlexBox alignItems="center" gap={1}>
              <Email
                color="inherit"
                fontSize="small"
                className="nav-icon"
              />
              <a href="mailto:idrisbookbank@gmail.com " style={{'color': 'gray','font-family': 'Lato'}}> idrisbookbank@gmail.com </a>
            </FlexBox>
          </Grid>

        </Grid>
      </Container>
    </ShopLayout1>
  );
};


export default ContactUs;
