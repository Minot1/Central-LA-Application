import React from 'react'
import AppBarHeader from '../components/AppBarHeader'
import Sidebar from '../components/Sidebar'
import AddQuestion from '../components/AddQuestion'
import { Typography, Box, Button, Grid } from '@mui/material'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
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
              <TextField id="outlined-required" label="Enter course code" variant="outlined" size="small" sx={{ m: 2 }} />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography >Last Application Date:</Typography>
              <TextField id="outlined-required" label="Enter last date" variant="outlined" size="small" sx={{ m: 2 }} />
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
              <Typography >Desired Latter Grade:</Typography>
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
                sx={{ m: 2, width: 400 }}
              />
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
        <Grid container spacing={2} >
          <AddQuestion /> 
          <Grid item xs={4}>
            <Box sx={{
              backgroundColor: '#F2F2F2',
              px: 2,
            }}>
              <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold', py: 2 }} >Suggested Questions:</Typography>
              <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{
                bgcolor: "#5FB3F6", my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                  backgroundColor: '#84BFF7'
                }
              }}>
                Explain in detail why you want to be an LA for this course:
              </Button>
              <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{
                bgcolor: "#2196F3", my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                  backgroundColor: '#84BFF7'
                }
              }}>
                Explain in detail why you are qualified for the position:
              </Button>
              <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{
                bgcolor: "#5FB3F6", my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                  backgroundColor: '#84BFF7'
                }
              }}>
                Previous teaching experiences:
              </Button>
              <Button variant="contained" size="large" fullWidth endIcon={<AddIcon />} sx={{
                bgcolor: "#2196F3", my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                  backgroundColor: '#84BFF7'
                }
              }}>
                Bu dersi alırken en sevdiğiniz konu neydi? Sizi en çok zorlayan konu neydi?
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{p:4}}>
          <Button variant="contained" startIcon={<SendIcon /> } color="success" sx={{mx:2}}>
            Submit
          </Button>
          <Button variant="contained" startIcon={<CloseIcon /> } color="error" sx={{mx:2}}>
            Cancel
          </Button>
        </Grid>
      </Box>
    </Box>
  )
}

export default CreateAnnouncement