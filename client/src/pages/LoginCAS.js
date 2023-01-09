import { Typography } from '@mui/material'
import React, { useEffect } from 'react'

function LoginCAS() {
    const url = window.location.href;
    const encodedURL = encodeURIComponent(url);
    const casLoginBaseURL = "https://login.sabanciuniv.edu/cas/login?service=";
    const casLoginURL = casLoginBaseURL + encodedURL;

    useEffect(() => {
      window.location.replace(casLoginURL);
    
      return null;
    }, [])
    

  return (
    <>
    </>
  )
}

export default LoginCAS