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

const suggestedQuestions = [
    {
        sValue: 'Long Answer',
        sQuestion: 'Explain in detail why you want to be an LA for this course:',
        sMultiple: [],
        sBgColor: "#5FB3F6",
    },
    {
        sValue: 'Long Answer',
        sQuestion: 'Explain in detail why you are qualified for the position:',
        sMultiple: [],
        sBgColor: "#2196F3",
    },
    {
        sValue: 'Short Answer',
        sQuestion: 'Previous teaching experiences:',
        sMultiple: [],
        sBgColor: "#5FB3F6",
    },
    {
        sValue: 'Long Answer',
        sQuestion: 'Bu dersi alırken en sevdiğiniz konu neydi? Sizi en çok zorlayan konu neydi?',
        sMultiple: [],
        sBgColor: "#2196F3",
    },
    {
        sValue: 'Multiple Choice',
        sQuestion: 'Soru saatine hazırlık için hangi günü/günleri özellikle kullanmayı düşünüyorsunuz?',
        sMultiple: ["Monday", "Tuesday", "Wendesday", "Thursday", "Friday"],
        sBgColor: "#5FB3F6",
    },

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
        <Grid container spacing={2} >
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
            <Grid item xs={4}>
                <Box sx={{
                    backgroundColor: '#F2F2F2',
                    px: 2,
                }}>
                    <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold', py: 2 }} >Suggested Questions:</Typography>
                    {suggestedQuestions.map((e, idx) => {
                        return(
                            <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{
                                bgcolor: e.sBgColor, my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                                    backgroundColor: '#84BFF7'
                                }
                            }}>
                                {e.sQuestion}
                            </Button>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>


    );
}

export default AddQuestion;