import React from "react";
import { Button, Grid } from "@mui/material";

function MockCAS() {

  const casLoginBaseURL = "https://login.sabanciuniv.edu/cas/login?service=";

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
            <Button variant="contained" href="/home">Login with CAS</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default MockCAS;
