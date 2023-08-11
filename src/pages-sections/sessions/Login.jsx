import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { H3, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useCallback, useState,useEffect } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import SocialButtons from "./SocialButtons";
import {useSession,signIn,signOut} from 'next-auth/react';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import useSWR from 'swr'
import axios from 'axios';




const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));

const Login = () => {
  const { data: session } = useSession()



  const [loginError, setLoginError] = useState('');
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const server_ip = process.env.NEXT_PUBLIC_BACKEND_API_BASE;
  const { data, error } = useSWR(server_ip + 'getGeneralSetting', fetcher);


  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    

    
    await signIn("credentials", {
      
      username: values.email,
      password: values.password,
      role:3,
      callbackUrl: `${window.location.origin}/  `,
      redirect: false,

    }).then(function(result){
       ("Result",result)
      if (result.error !== null)
      {
          if (result.status=== 401)
          {
              setLoginError(
                       <Alert variant="filled" severity="error">
Invalid Credentials.Please try Again</Alert>
           
                
                );
          }
          else
          {
            toast.error("Invalid Credentials.Please try with correct credentials", {position: toast.POSITION.TOP_RIGHT});

              setLoginError(       <Alert variant="filled" severity="error">
              Invalid Credentials.Please try Again</Alert>);
          }
      }
      else
      {
        toast.success("Login Successfully", {position: toast.POSITION.TOP_RIGHT});

          router.push(result.url);
      }});
  };
  const router = useRouter();
  
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

const title=process.env.NEXT_PUBLIC_COMPANY_TITLE;

    if(session){
      router.push('/profile')
    }
   
 else{
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        {loginError}
        <H3 textAlign="center" mb={1}>
   Welcome to {data && data.length>0?data[0].site_name:'Site'}
        </H3>
        <Small
          mb={4.5}
          display="block"
          fontSize="12px"
          fontWeight="600"
          color="grey.800"
          textAlign="center"
        >
          Log in with email & password
        </Small>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email "
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            mb: "1.65rem",
            height: 44,
          }}
        >
          Login
        </BazaarButton>

      </form>
      <SocialButtons redirect="/signup" redirectText="Sign Up" />

    </Wrapper>
  );
 }
 
  
 
};

const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string(  ).email("invalid email").required("Email is required"),
});
export default Login;















  