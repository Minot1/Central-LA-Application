import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AnnouncementTable from "../components/AnnouncementTable";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { getAllAnnouncements } from "../apiCalls";

function HomePage() {
  const [value, setValue] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    getAllAnnouncements().then((results) => setRows(results));
    console.log(rows);
  }, []);

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
                <Tab label="All Announcements" />
                <Tab label="My Announcements" />
              </Tabs>
            </Grid>
            <Grid item>
              <Button variant="contained" startIcon={<AddIcon />} href="/create-announcement">
                Add
              </Button>
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
