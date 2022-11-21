import React from "react";
import { Button, Grid } from "@mui/material";

function MockCAS() {
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
            <Button variant="contained">Instructor Login</Button>
          </Grid>
          <Grid item>
            <Button variant="contained">Student Login</Button>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}

export default MockCAS;