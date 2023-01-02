import { Button, Box, Typography, Grid } from '@mui/material'
import React, { useEffect } from "react";
import { getApplicationsByPost } from '../apiCalls';
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import ApplicantsTable from "../components/ApplicantsTable";

function ApplicantsPage() {
    const [rows, setRows] = React.useState([]);
  
    useEffect(() => {
        getApplicationsByPost("1").then((results) => setRows(results));
        console.log(rows);
    }, []);

  return (
    <>
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container
  direction="column"
  justifyContent="center"
  alignItems="center">
            <Grid item>
                <Typography variant='h4' marginBottom={2} marginRight={1}>CS201 Applicants</Typography>
            </Grid>
            <Grid item>
                <ApplicantsTable rows={rows}></ApplicantsTable>
            </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  )
}

export default ApplicantsPage