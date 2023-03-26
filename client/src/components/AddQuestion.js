import React from 'react'
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

const questionType = [
    { value: 'Short Answer', label: 'Short Answer' },
    { value: 'Long Answer', label: 'Long Answer' },
  ]

function AddQuestion() {

    return (
        <Grid item xs={8}>
            <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold' }} >Additional Questions for Students:</Typography>
            <Grid container direction="row" justifyContent="start" alignItems="center">
            <Typography >Question 1:</Typography>
            <TextField id="outlined-required" label="" variant="outlined" size="small" sx={{ m: 2 }} />
            <TextField
                id="outlined-select-currency"
                select
                defaultValue="Short Answer"
                size="small"
                sx={{ m: 2, width: 225 }}
            >
                {questionType.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
                ))}
            </TextField>
            <Button variant="contained" size="large" color="error">
                <DeleteIcon fontSize="inherit" />
            </Button>
            </Grid>
            <Grid container direction="row" justifyContent="start" alignItems="center">
            <Button variant="contained" size="large" startIcon={<AddCircleIcon />} sx={{ bgcolor: "#394263", my: 2 }}>
                Add Question
            </Button>
            </Grid>
      </Grid>
    );
}

export default AddQuestion;