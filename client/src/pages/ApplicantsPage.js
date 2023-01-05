import {
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  Grow,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getApplicationsByPost } from "../apiCalls";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import ApplicantsTable from "../components/ApplicantsTable";
import FilterListIcon from "@mui/icons-material/FilterList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const initialCheckboxWorkHours = [
  { name: "all", value: true },
  { name: "5", value: true },
  { name: "10", value: true },
];

const initialCheckboxWorkHoursFalse = [
  { name: "all", value: false },
  { name: "5", value: false },
  { name: "10", value: false },
];

function ApplicantsPage() {
  const [rows, setRows] = React.useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const anchorRef = useRef(null);
  const filterId = openFilter ? "simple-popper" : undefined;

  const [checkboxWorkHours, setCheckboxWorkHours] = useState(initialCheckboxWorkHours);

  const onChangeCheckbox = (event) => {
    if (event.target.name === "all") {
      if (checkboxWorkHours[1].value && checkboxWorkHours[2].value) {
        setCheckboxWorkHours(initialCheckboxWorkHoursFalse);
      } else {
        setCheckboxWorkHours(initialCheckboxWorkHours);
      }
    } else {
      const newCheckboxes = checkboxWorkHours.map((checkbox) => {
        if (checkbox.name === event.target.name) {
          return { name: checkbox.name, value: !checkbox.value };
        } else {
          return checkbox;
        }
      });
      setCheckboxWorkHours(newCheckboxes);
    }
  };

  const handleClickFilter = (event) => {
    setOpenFilter(!openFilter);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

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
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Grid item container direction="row" justifyContent="space-between" alignItems="center">
              <Grid item></Grid>
              <Grid item>
                <Typography variant="h4" marginBottom={2} marginRight={1}>
                  CS201 Applicants
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<FilterListIcon></FilterListIcon>}
                  variant="outlined"
                  ref={anchorRef}
                  onClick={handleClickFilter}
                >
                  Filter
                </Button>
                <Popper
                  id={filterId}
                  open={openFilter}
                  anchorEl={anchorRef.current}
                  placement="bottom-end"
                  transition
                >
                  {({ TransitionProps }) => (
                    <Grow
                      {...TransitionProps}
                      timeout="auto"
                      style={{
                        transformOrigin: "top right",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseFilter}>
                          <div>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Status</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <FormControl>
                                  <RadioGroup defaultValue="all" name="status-radio-buttons">
                                    <FormControlLabel value="all" control={<Radio />} label="All" />
                                    <FormControlLabel
                                      value="applied"
                                      control={<Radio />}
                                      label="Applied"
                                    />
                                    <FormControlLabel
                                      value="accepted"
                                      control={<Radio />}
                                      label="Accepted"
                                    />
                                    <FormControlLabel
                                      value="rejected"
                                      control={<Radio />}
                                      label="Rejected"
                                    />
                                    <FormControlLabel
                                      value="interested"
                                      control={<Radio />}
                                      label="Interested"
                                    />
                                  </RadioGroup>
                                </FormControl>
                              </AccordionDetails>
                            </Accordion>
                            <Accordion>
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                              >
                                <Typography>Working Hours</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <FormControlLabel
                                  label="All"
                                  control={
                                    <Checkbox
                                      checked={
                                        checkboxWorkHours[1].value && checkboxWorkHours[2].value
                                      }
                                      indeterminate={
                                        checkboxWorkHours[1].value != checkboxWorkHours[2].value
                                      }
                                      onChange={onChangeCheckbox}
                                      name="all"
                                    />
                                  }
                                ></FormControlLabel>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    ml: 3,
                                  }}
                                >
                                  <FormControlLabel
                                    label="5"
                                    control={
                                      <Checkbox
                                        checked={checkboxWorkHours[1].value}
                                        onChange={onChangeCheckbox}
                                        name="5"
                                      />
                                    }
                                  />
                                  <FormControlLabel
                                    label="10"
                                    control={
                                      <Checkbox
                                        checked={checkboxWorkHours[2].value}
                                        onChange={onChangeCheckbox}
                                        name="10"
                                      />
                                    }
                                  />
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Grid>
            </Grid>
            <Grid item>
              <ApplicantsTable rows={rows}></ApplicantsTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ApplicantsPage;
