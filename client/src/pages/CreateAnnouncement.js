import React from 'react'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import { Typography, Box, Button } from '@mui/material'

function CreateAnnouncement() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Typography>Create Announcement</Typography>
            <Button variant="contained" href="/home">Go Back</Button>
      </Box>
    </Box>
  )
}

export default CreateAnnouncement