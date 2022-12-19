import React, { useEffect, useMemo, useState } from 'react'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import { Typography, Box, Button, Grid, Divider } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'
import { getAnnouncement } from '../apiCalls'

const ApplyPage = (props) => {
    const [questions, setQuestions] = useState("");
    const [questionList, setQuestionList] = useState([]);
    const { id } = useParams();

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container direction="column" alignItems="center" justifyContent="center">
            <Grid item>
                <Typography variant='h4'>Course Application</Typography>
                <Divider></Divider>
            </Grid>
            <Grid item container direction="column" alignItems="center" justifyContent="center">
                <Grid item>
                    <Typography></Typography>
                </Grid>
            </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default ApplyPage