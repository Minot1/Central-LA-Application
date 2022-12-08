import {
  Box,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import AnnouncementTable from "../components/AnnouncementTable";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import AddIcon from "@mui/icons-material/Add";

function HomePage() {
  const [alignment, setAlignment] = React.useState("all-ann");

  const handleAnnClick = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container direction="column" spacing={3}>
          <Grid item container direction="row" justifyContent="space-between">
            <Grid item></Grid>
            <Grid item>
              <ToggleButtonGroup
                exclusive
                value={alignment}
                onChange={handleAnnClick}
                color="primary"
              >
                <ToggleButton value="all-ann">All Announcements</ToggleButton>
                <ToggleButton value="my-ann">My Announcements</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                href="/create-announcement"
              >
                Add
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <AnnouncementTable></AnnouncementTable>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
