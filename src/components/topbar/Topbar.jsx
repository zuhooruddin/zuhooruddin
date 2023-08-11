import { CallOutlined, ExpandMore, MailOutline, LogOut } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { Box, Container, MenuItem, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { FlexBox } from "components/flex-box";
import { Span } from "components/Typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { layoutConstant } from "utils/constants";
import { useSession, signIn, signOut, destroy } from 'next-auth/react';
import DrawerComponent from "components/topbar/drawer";
import { toast } from 'react-toastify';


const TopbarWrapper = styled(Box)(({ theme, bgColor }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  background: bgColor || theme.palette.secondary.dark,
  color: theme.palette.secondary.contrastText,
  "& .topbarLeft": {
    "& .logo": {
      display: "none",
    },
    "& .title": {
      marginLeft: "10px",
      fontsize: 12,
    },
    "& .drawer": {
      display: "none",
    },

    "@media only screen and (max-width: 600px)": {
      "& .logo": {
        display: "none",
      },
      "& .title": {
        marginLeft: "0px",
        fontSize: 10,
        display: "none",
      },
      "& .icon": {
        display: "none"
      },
      "& .drawer": {
        justifyContent: 'flex-start',
        display: "block",
      },
      "& > *:not(.drawer)": {
        display: "none",
      },
    },
  },
  "& .topbarRight": {
    "& .link": {
      paddingRight: 30,
      color: theme.palette.secondary.contrastText,
      fontSize: 12,
    },
    "@media only screen and (max-width: 600px)": {
      "& .link": {
        display: "none",
        fontSize: 10,
      },
    },
  },


  "& .menuItem": {
    minWidth: 100,
  },
  "& .marginRight": {
    marginRight: "1.25rem",
  },
  "& .handler": {
    height: layoutConstant.topbarHeight,
  },
  "& .smallRoundedImage": {
    height: 15,
    width: 25,
    borderRadius: 2,
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600,
  },
}));



const Topbar = ({ bgColor,topbardata, color }) => {
  const { data: session } = useSession();
  async function tokenBlacklist(){
    const payload = {
      // refresh: session.refreshToken,
      userId:session.user.id,
      accessToken: session.accessToken
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE}apiSignOut`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
  
      })
      const res = await response.json()
      if(res['ErrorCode'] == 0){
              // toast.success(res.data['ErrorMsg'], {
              //   position: toast.POSITION.TOP_RIGHT
              // });
              signOut();
            }
      else{toast.error(res['ErrorMsg'], {position: toast.POSITION.TOP_RIGHT});}
      return res;
    } catch (error) {
      if (error.response) {
          if(error.response.status==400){
            for(var i=0;i<Object.keys(error.response.data).length;i++){
              var key = Object.keys(error.response.data)[i];
              var value = error.response.data[key].toString();
              toast.error(<div>Field: {key} <br/>Error Message: {value}</div>, {position: toast.POSITION.TOP_RIGHT});
            }
          }
          else{toast.error('Error Occured! '+error.response.statusText, {position: toast.POSITION.TOP_RIGHT});
          }
          return error.response
      } else if (error.request) {toast.error('Network Error', {position: toast.POSITION.TOP_RIGHT});
          return error.request
        } else {toast.error('Error Occured', {position: toast.POSITION.TOP_RIGHT});
          return error
        }
    }
    }


    const imgbaseurl = process.env.NEXT_PUBLIC_BACKEND_API_BASE + "media/";

    const handleSignOut = () => {tokenBlacklist()}

    const phonenumber=process.env.NEXT_PUBLIC_PHONE
    const email=process.env.NEXT_PUBLIC_EMAIL
  // const { signoutFlag, setsignoutFlag } = useState(false);
  // useEffect(() => {
  //   if (signoutFlag) {
  //     alert("about to logout");
  //     signOut;
  //   }
  // }
  // );
  // const handleClick = async () => {
  //   try {
  //     const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API_BASE + 'api/auth/logout/', {
  //       method: 'POST',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: { "username": session.user.username }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error! status: ${response.status}`);
  //     }

  //     const result = await response.json();

  //     // signOut;
  //     alert("finally signed out");
  //     setsignoutFlag(true);
  //     alert("after signed out flag true ");
  //   } catch (err) {
  //   } finally {

  //   }
  // };
  if (session) {
    return (
      <TopbarWrapper bgColor={bgColor}>
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <FlexBox className="topbarLeft">
            <div className="logo">
              <Link href="/" passHref>
                <Image
                  display="block"
                  height="28px"
                  src={topbardata?imgbaseurl+topbardata[0].site_logo:'assets/images/logos/webpack.png'}
                  alt="logo"
                />
              </Link>
            </div>
            <FlexBox className="drawer">
              <DrawerComponent />
            </FlexBox>
            <FlexBox>
              <FlexBox alignItems="center">
                <CallOutlined className="icon" fontSize="small" />
                <Span className="title">
  <a href={`tel:${topbardata ? topbardata[0].top_bar_left_phone : ''}`}>
    {topbardata ? topbardata[0].top_bar_left_phone : '+923'}
  </a>
</Span>
              </FlexBox>

              <FlexBox alignItems="center" ml={2.5}>
                <MailOutline className="icon" fontSize="small" />
                <Span className="title"><a href={`mailto:${topbardata?topbardata[0].top_bar_left_email:''}`}>{topbardata?topbardata[0].top_bar_left_email:'email@company.com'}</a></Span>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox className="topbarRight" alignItems="center" onClick={handleSignOut} style={{'cursor': 'pointer'}}>
            <LogoutIcon fontSize="small" />
            <p> Sign Out</p>
          </FlexBox>
        </Container>
      </TopbarWrapper>
    );
  }
  // handleClick();onClick={() => {  signOut;}}
  else {
    return (
      <TopbarWrapper bgColor={bgColor} color={color}>
        <Container
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FlexBox className="topbarLeft">
            <div className="logo">
              <Link href="/" passHref>
              <Image
                  display="block"
                  height="28px"
                  src={topbardata?imgbaseurl+topbardata[0].site_logo:''}
                  alt="logo"
                />
              </Link>
            </div>
            <FlexBox className="drawer">
              <DrawerComponent />
            </FlexBox>
            <FlexBox>
              <FlexBox alignItems="center">
                <CallOutlined className="icon" fontSize="small" />
                <Span className="title"><a href={topbardata?topbardata[0].top_bar_left_phone:''}>    {topbardata ? topbardata[0].top_bar_left_phone : '+923'}
</a></Span>
              </FlexBox>

              <FlexBox alignItems="center" ml={2.5}>
                <MailOutline className="icon" fontSize="small" />
                <Span className="title"><a href={`mailto:${topbardata?topbardata[0].top_bar_left_email:''}`}>{topbardata?topbardata[0].top_bar_left_email:'email@company.com'}</a></Span>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox className="topbarRight" alignItems="center" onClick={signIn} style={{'cursor': 'pointer'}} >
            <LoginIcon fontSize="small" />
            <p> Sign In</p>
          </FlexBox>
        </Container>
      </TopbarWrapper>
    );
  }

};

export default Topbar;
