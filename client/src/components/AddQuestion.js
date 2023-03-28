import React, { useState } from 'react'
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

    const [questions, setQuestions] = useState([1, 2, 3])

    function removeAndRefine(arr, num) {
        const index = arr.indexOf(num); // get the index of the number to remove
        if (index === -1) return arr; // if number not found, return original array
        const refined = arr.slice(0, index).concat(arr.slice(index + 1)); // remove the number
        // refine the array by decreasing subsequent numbers by 1
        for (let i = index; i < refined.length; i++) {
            refined[i] -= 1;
        }
        return refined;
    }

    function addNewQuestion() {
        const nextNum = (questions.length) + 1
        setQuestions([...questions, nextNum])
    }

    function deleteQuestion(question, idx) {

        //const newQuestionSet = question.filter((e, index) => { return idx !== index })
        const number = idx + 1;
        const newQuestionSet = removeAndRefine(question, number)
        setQuestions(newQuestionSet)
    }

    return (
        <Grid item xs={8}>
            <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold' }} >Additional Questions for Students:</Typography>
            {questions.map((e, index) => {
                return (
                    <Grid container direction="row" justifyContent="start" alignItems="center">
                        <Typography >Question {questions[index]}:</Typography>
                        <TextField id="outlined-required" label="" variant="outlined" size="small" sx={{ m: 2, width: 400 }} />
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
                        <Button variant="contained" size="large" color="error" onClick={() => deleteQuestion(questions, index)}>
                            <DeleteIcon fontSize="inherit" />
                        </Button>
                    </Grid>
                );
            })}
            <Grid container direction="row" justifyContent="start" alignItems="center">
                {questions.length < 10 &&
                    <Button variant="contained" size="large" startIcon={<AddCircleIcon />} sx={{ bgcolor: "#394263", my: 2 }} onClick={addNewQuestion} >
                        Add Question
                    </Button>
                }

            </Grid>
        </Grid>
    );
}

export default AddQuestion;