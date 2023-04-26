import React, { useState } from 'react'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import AddQuestion from '../components/AddQuestion'
import { Typography, Box, Button, Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

function CreateAnnouncement() {
  const grades = [
    { value: 'A', label: 'A' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B', label: 'B' },
    { value: 'B-', label: 'B-' },
    { value: 'C+', label: 'C+' },
  ];
  const workHour = [
    { value: '5 Hours', label: '5 Hours' },
    { value: '10 Hours', label: '10 Hours' },
  ]
  const questionType = [
    { value: 'Short Answer', label: 'Short Answer' },
    { value: 'Long Answer', label: 'Long Answer' },
  ]

  const authUsers = [
    { display_name: "Murat Karaca", username: "muratkaraca" },
    { display_name: "Taner Dincer", username: "tanerd" },
    { display_name: "Melih Gursoy", username: "melihg" },
    { display_name: "Baha Ersoy", username: "bersoy" },
    { display_name: "Cem Kaya", username: "cemkaya" },
  ]

  const [authPeople, setAuthPeople] = useState([]); //used for send request as selected from list
  const [authValue, setAuthValue] = useState("");
  const [inputAuthValue, setAuthInputValue] = React.useState("");

  //used in autocomplete for keeping value and input value
  const handleAuthAdd = (newValue) => {
    if (newValue !== null) {
      const selectedUser = authUsers.find(user => user.display_name === newValue);
      setAuthPeople([...authPeople, selectedUser]);
    }
    setAuthValue("");
    setAuthInputValue("");
  };

  const handleAuthDelete = (userToDelete) => {
    const updatedAuthPeople = authPeople.filter(
      (user) => user.username !== userToDelete.username
    );
    console.log(updatedAuthPeople)
    setAuthPeople(updatedAuthPeople);
  };

  console.log(authPeople)

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ mb: 4, mt: 2 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Create Announcement</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant='h5' sx={{ textDecoration: 'underline', marginY: 2, fontWeight: 'bold' }} >Announcement Details:</Typography>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography >Course Code:</Typography>
              <TextField id="outlined-required" label="Enter course code" variant="outlined" size="small" multiline maxRows={20} sx={{ m: 2, width: 350 }} />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography >Last Application Date:</Typography>
              <TextField id="outlined-required" label="Enter last date" variant="outlined" type="date" defaultValue={new Date()} InputLabelProps={{ shrink: true }} size="small" sx={{ m: 2 }} />
              <TextField id="outlined-required" label="Enter deadline" variant="outlined" type="time" defaultValue={new Date().toLocaleTimeString().replace(/(.*)\D\d+/, '$1')} InputLabelProps={{ shrink: true }} size="small" sx={{ m: 2 }} />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography > Minimum Desired Letter Grade:</Typography>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="A"
                size="small"
                sx={{ m: 2, width: 225 }}
              >
                {grades.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography >Work Hours:</Typography>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="5 Hours"
                size="small"
                sx={{ m: 2, width: 225 }}
              >
                {workHour.map((option) => (
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
                multiline
                size="small"
                rows={5}
                maxRows={20}
                sx={{ m: 2, width: 400 }}
              />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="flex-start">
              <Typography sx={{ my: 2 }}>Authorized Instructor(s):</Typography>
              <Grid item xs={6} direction="column" justifyContent="center" alignItems="flex-start">
                <Autocomplete
                  id="controllable-states-demo"
                  options={authUsers.map((authUser) => {
                    return authUser.display_name
                  })}
                  // filterOptions={(options, { inputValue, selectedValue }) => {
                  //   if (inputValue !== null && selectedValue !== null) {
                  //     return options.filter((option) => {
                  //       const displayValue = option.display_name
                  //       const inputVal = inputValue
                  //       const isSelected = selectedValue.findIndex((val) => val.username === option.username) !== -1;

                  //       return displayValue.indexOf(inputVal) !== -1 && !isSelected;
                  //     })
                  //   }
                  // }
                  // }
                  value={authValue}
                  inputValue={inputAuthValue}
                  onInputChange={(event, newInputValue) => {
                    setAuthInputValue(newInputValue);
                  }}
                  onChange={(event, newValue) => { handleAuthAdd(newValue) }}
                  renderInput={(params) => <TextField {...params} multiline size="small" sx={{ mx: 2, mt: 1, mb: 2, width: 300 }} />}

                />
                {authPeople.length > 0 && authPeople.map((authPerson) => {
                  return (<Chip key={authPerson.username} label={authPerson.display_name} variant="outlined"
                    avatar={<Avatar alignItems="center" sx={{ backgroundColor: "#4D5571" }}>
                      <Typography fontSize="small" sx={{ color: "white" }}>
                        {authPerson.display_name.split(' ')[0][0]}
                      </Typography>
                    </Avatar>}
                    sx={{ m: 1 }}
                    onDelete={() => handleAuthDelete(authPerson)} />);
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{
              backgroundColor: '#F2F2F2',
              p: 2,
            }}>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Warnings:</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="At most x questions can add on the application.">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="These information come automatically to you:">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="1) Name">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="2) ID">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="3) Term">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="4) Previous Grade">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="5) Class">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText secondary="6) GPA">
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Please do not add these as questions.">
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
        <AddQuestion />

        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ p: 4 }}>
          <Button variant="contained" startIcon={<SendIcon />} color="success" sx={{ mx: 2 }}>
            Submit
          </Button>
          <Button variant="contained" startIcon={<CloseIcon />} color="error" sx={{ mx: 2 }}>
            Cancel
          </Button>
        </Grid>
      </Box>
    </Box>
  )
}

export default CreateAnnouncement