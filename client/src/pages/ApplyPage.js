import React from 'react'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import { Typography, Box, Button } from '@mui/material'

const ApplyPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Typography>Application Page</Typography>
            <Button variant="contained" href="/">Go Back</Button>
      </Box>
    </Box>
  )
}

export default ApplyPage