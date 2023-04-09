import React from "react";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

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
            <Button variant="contained" as={Link} to="/applicants" style={{ textDecoration: 'none' }}>Login with CAS</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default MockCAS;
