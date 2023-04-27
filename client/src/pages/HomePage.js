import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
} from "@mui/material";
import React, { useEffect } from "react";
import AnnouncementTable from "../components/AnnouncementTable";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { getAllAnnouncements } from "../apiCalls";
import { useSelector } from "react-redux";

function HomePage() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);
  const isInstructor = useSelector((state) => state.user.isInstructor);

  useEffect(() => {
    getAllAnnouncements().then((results) => setRows(results));
    console.log(rows);
  }, []); //needs to be fixed

  const handleAnnTableChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container direction="column" spacing={2}>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item></Grid>
            <Grid item>
              <Tabs onChange={handleAnnTableChange} value={value}>
                <Tab label="All Announcements"/>
                {!isInstructor && <Tab label="My Applications"/>}
                {isInstructor && <Tab label="My Announcements"/>}
              </Tabs>
            </Grid>
            <Grid item>
              {isInstructor && <Button
                variant="contained"
                startIcon={<AddIcon />}
                href="/create-announcement"
              >
                Add
              </Button>}
            </Grid>
          </Grid>
          <Grid item>
            <AnnouncementTable rows={rows}></AnnouncementTable>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
