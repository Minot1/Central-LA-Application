import React, { useState, useEffect } from "react";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import AddQuestion from "../components/AddQuestion";
import { Typography, Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { getAllInstructors } from "../apiCalls";

function CreateAnnouncement() {
  const grades = [
    { value: "A", label: "A" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B", label: "B" },
    { value: "B-", label: "B-" },
    { value: "C+", label: "C+" },
  ];
  const WorkHour = [
    { value: "5 Hours", label: "5 Hours" },
    { value: "10 Hours", label: "10 Hours" },
  ];
  // const authUsers = [
  //   { display_name: "Murat Karaca", username: "muratkaraca" },
  //   { display_name: "Taner Dincer", username: "tanerd" },
  //   { display_name: "Melih Gursoy", username: "melihg" },
  //   { display_name: "Baha Ersoy", username: "bersoy" },
  //   { display_name: "Cem Kaya", username: "cemkaya" },
  // ]

  const [authUsersList, setAuthUserList] = useState([]); //get instructors from database
  const [authPeople, setAuthPeople] = useState([]); //used for send request as selected from list
  const [authValue, setAuthValue] = useState(""); // for autocomplete
  const [inputAuthValue, setAuthInputValue] = useState(""); // for autocomplete

  //get all instructors
  useEffect(() => {
    getAllInstructors().then((results) => {
      const transformedResults = results.map((instructor) => {
        const [lastName, firstName] = instructor.name.split(",");
        const displayName = firstName.trim() + " " + lastName.trim();

        return {
          display_name: displayName,
          username: instructor.instructor_username,
        };
      });
      setAuthUserList(transformedResults);
    });
  }, []);

  console.log(authUsersList);

  //used in autocomplete for keeping value and input value
  function handleAuthAdd(newValue) {
    if (newValue !== null) {
      const selectedUser = authUsersList.find((user) => user.display_name === newValue);
      setAuthPeople([...authPeople, selectedUser]);
    }
    setAuthValue("");
    setAuthInputValue("");
  }

  function handleAuthDelete(userToDelete) {
    const updatedAuthPeople = authPeople.filter((user) => user.username !== userToDelete.username);
    // console.log(updatedAuthPeople)
    setAuthPeople(updatedAuthPeople);
  }

  function filterOptions(options, { inputValue }) {
    const filtered = options.filter((option) => {
      if (authPeople.some((person) => person.display_name === option)) {
        return false; // filter out if already in authPeople
      }
      return option.toLowerCase().includes(inputValue.toLowerCase());
    });

    // sort the filtered options based on their match with the input value
    const inputValueLowerCase = inputValue.toLowerCase();
    filtered.sort((a, b) => {
      const aIndex = a.toLowerCase().indexOf(inputValueLowerCase);
      const bIndex = b.toLowerCase().indexOf(inputValueLowerCase);
      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }
      return a.localeCompare(b);
    });

    return filtered;
  }

  //console.log(authPeople) //for debugging authPeople

  const [announcementDetails, setAnnouncementDetails] = useState({
    course_code: "",
    lastApplicationDate: new Date().toLocaleDateString("en-CA"),
    lastApplicationTime: new Date().toLocaleTimeString().replace(/(.*)\D\d+/, "$1"),
    letterGrade: "A",
    workHours: "5 Hours",
    jobDetails: "",
    authInstructor: authPeople,
  });

  // set changes for autocomplete
  useEffect(() => {
    setAnnouncementDetails((prevDetails) => ({
      ...prevDetails,
      authInstructor: authPeople,
    }));
  }, [authPeople]);

  function handleInput(event) {
    const { name, value } = event.target;
    setAnnouncementDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  //console.log(announcementDetails) //for debugging announcement details

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 4, mt: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Create Announcement
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" sx={{ textDecoration: "underline", marginY: 2, fontWeight: "bold" }}>
              Announcement Details:
            </Typography>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography>Course Code:</Typography>
              <TextField
                id="outlined-required"
                name="course_code"
                label="Enter course code"
                variant="outlined"
                size="small"
                multiline
                maxRows={20}
                sx={{ m: 2, width: 350 }}
                value={announcementDetails.course_code}
                onChange={handleInput}
              />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography>Last Application Date:</Typography>
              <TextField
                id="outlined-required"
                name="lastApplicationDate"
                label="Enter last date"
                variant="outlined"
                type="date"
                value={announcementDetails.lastApplicationDate}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ m: 2 }}
                onChange={handleInput}
              />
              <TextField
                id="outlined-required"
                name="lastApplicationTime"
                label="Enter deadline"
                variant="outlined"
                type="time"
                value={announcementDetails.lastApplicationTime}
                InputLabelProps={{ shrink: true }}
                size="small"
                sx={{ m: 2 }}
                onChange={handleInput}
              />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography> Minimum Desired Letter Grade:</Typography>
              <TextField
                id="outlined-select-currency"
                name="letterGrade"
                select
                value={announcementDetails.letterGrade}
                size="small"
                sx={{ m: 2, width: 225 }}
                onChange={handleInput}
              >
                {grades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography>Work Hours:</Typography>
              <TextField
                id="outlined-select-currency"
                name="workHours"
                select
                value={announcementDetails.workHours}
                size="small"
                sx={{ m: 2, width: 225 }}
                onChange={handleInput}
              >
                {WorkHour.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="flex-start">
              <Typography paddingTop={3}>Job Details:</Typography>
              <TextField
                placeholder="Enter Job Details..."
                name="jobDetails"
                value={announcementDetails.jobDetails}
                multiline
                size="small"
                rows={5}
                maxRows={20}
                sx={{ m: 2, width: 400 }}
                onChange={handleInput}
              />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="flex-start">
              <Typography sx={{ my: 2 }}>Authorized Instructor(s):</Typography>
              <Grid item xs={6} direction="column" justifyContent="center" alignItems="flex-start">
                <Autocomplete
                  id="controllable-states-demo"
                  options={authUsersList.map((authUser) => {
                    return authUser.display_name;
                  })}
                  filterOptions={filterOptions}
                  value={authValue}
                  inputValue={inputAuthValue}
                  onInputChange={(event, newInputValue) => {
                    if (newInputValue !== null) {
                      setAuthInputValue(newInputValue);
                    }
                  }}
                  onChange={(event, newValue) => {
                    if (newValue !== null) handleAuthAdd(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} multiline size="small" sx={{ mx: 2, mt: 1, mb: 2, width: 300 }} />}
                />
                {authPeople.length > 0 &&
                  authPeople.map((authPerson, index) => {
                    return (
                      <Chip
                        key={authPerson.username}
                        label={authPerson.display_name}
                        variant="outlined"
                        avatar={
                          <Avatar sx={{ backgroundColor: index % 2 === 0 ? "#6A759C" : "#4D5571" }}>
                            <Typography fontSize="small" sx={{ color: "white" }}>
                              {authPerson.display_name.split(" ")[0][0]}
                            </Typography>
                          </Avatar>
                        }
                        sx={{ m: 1 }}
                        onDelete={() => handleAuthDelete(authPerson)}
                      />
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: "#F2F2F2",
                p: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Warnings:
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "unset", marginRight: "8px" }}>
                    <FiberManualRecordIcon fontSize="inherit" />
                  </ListItemIcon>
                  <ListItemText primary="At most (20) questions can add on the application." />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "unset", marginRight: "8px" }}>
                    <FiberManualRecordIcon fontSize="inherit" />
                  </ListItemIcon>
                  <ListItemText primary="These information come automatically to you:" />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="1) Name" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="2) ID" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="3) Term" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="4) Previous Grade" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="5) Class" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemText secondary="6) GPA" secondaryTypographyProps={{ component: "span", variant: "body2", sx: { pl: "24px" } }} />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: "unset", marginRight: "8px" }}>
                    <FiberManualRecordIcon fontSize="inherit" />
                  </ListItemIcon>
                  <ListItemText primary="Please do not add these as questions." />
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <AddQuestion AnnouncementDetails={announcementDetails} />
      </Box>
    </Box>
  );
}

export default CreateAnnouncement;
