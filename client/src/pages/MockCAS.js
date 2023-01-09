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
            <Button variant="contained" href="/home">Instructor Login</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href="/apply/2">Student Login</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" href={casLoginBaseURL + "http%3A%2F%2Fpro2-dev.sabanciuniv.edu"}>CAS Login</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default MockCAS;
