import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

function LoginCAS() {
    const url = window.location.href;
    const encodedURL = encodeURIComponent(url);
    const casLoginBaseURL = "https://login.sabanciuniv.edu/cas/login?service=";
    const casLoginURL = casLoginBaseURL + encodedURL;
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
      if (url.indexOf("?ticket=") != -1 || url.indexOf("&ticket=") != -1 || isLoggedIn) {
        
      }
      else {
        window.location.replace(casLoginURL);
      }
    
    }, [])
    

  return (
    <>
    </>
  )
}

export default LoginCAS