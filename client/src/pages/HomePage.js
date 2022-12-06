import { Box } from '@mui/material'
import React from 'react'
import AnnouncementTable from '../components/AnnouncementTable'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'

function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <AnnouncementTable></AnnouncementTable>
      </Box>
    </Box>
  )
}

export default HomePage