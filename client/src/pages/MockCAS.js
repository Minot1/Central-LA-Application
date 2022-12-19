import React from "react";
import { Button, Grid } from "@mui/material";

function MockCAS() {

  const casStr = "https://login.sabanciuniv.edu/cas/login?service=" + encodeURIComponent("")

  return (
    <div>
      <header className="App-header">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5}
        >
          <Grid item>
            <Button variant="contained" href="/home">Instructor Login</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="#">Student Login</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default MockCAS;
