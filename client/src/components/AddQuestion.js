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
    { value: 'Multiple Choice', label: 'Multiple Choice' },
]

const suggestedQuestions = [
    {
        sValue: 'Long Answer',
        sQuestion: 'Explain in detail why you want to be an LA for this course',
        sMultiple: [],
        sBgColor: "#5FB3F6",
    },
    {
        sValue: 'Long Answer',
        sQuestion: 'Explain in detail why you are qualified for the position',
        sMultiple: [],
        sBgColor: "#2196F3",
    },
    {
        sValue: 'Short Answer',
        sQuestion: 'Previous teaching experiences',
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

    const [questions, setQuestions] = useState([{ questionNumber: 1, mQuestion: "", mValue: 'Short Answer' }, { questionNumber: 2, mQuestion: "", mValue: 'Short Answer' }, { questionNumber: 3, mQuestion: "", mValue: 'Short Answer' }])

    function addNewQuestion() {
        const nextNum = (questions.length) + 1
        const nextQuestion = { questionNumber: nextNum, mQuestion: "", mValue: 'Short Answer' }
        setQuestions([...questions, nextQuestion])
    }

    // function handleDeleteQuestionV2(questionNumber) {
    //     // Find the index of the question to be deleted
    //     const indexToDelete = questions.findIndex((question) => question.questionNumber === questionNumber);

    //     // If the question to be deleted is found
    //     if (indexToDelete !== -1) {
    //       // Create a copy of the questions array
    //       const newQuestions = [...questions];

    //       // Remove the question at the specified index
    //       newQuestions.splice(indexToDelete, 1);

    //       // Update the question numbers of the remaining questions
    //       const updatedQuestions = newQuestions.map((question, index) => ({
    //         ...question,
    //         questionNumber: index + 1,
    //       }));

    //       // Set the updated questions array as the new state
    //       setQuestions(updatedQuestions);
    //     }
    //   }

    function handleDeleteQuestion(questionNumber) {
        // Find the index of the question to be deleted
        const indexToDelete = questions.findIndex(
            (question) => question.questionNumber === questionNumber
        );

        // If the question to be deleted is found
        if (indexToDelete !== -1) {
            // Create a copy of the questions array
            const newQuestions = [...questions];

            // Remove the question at the specified index
            newQuestions.splice(indexToDelete, 1);

            // Update the question numbers of the remaining questions
            const updatedQuestions = newQuestions.map((question, index) => ({
                ...question,
                questionNumber: index + 1,
            }));

            // Set the updated questions array as the new state
            setQuestions(updatedQuestions);

            // Update the input field value to the next or previous question
            const nextIndex =
                indexToDelete !== newQuestions.length ? indexToDelete : indexToDelete - 1;
            const nextQuestion =
                newQuestions.length > 0 ? newQuestions[nextIndex].mQuestion : "";
            handleInput({ target: { name: "mQuestion", value: nextQuestion } }, nextIndex);
        }
    }

    function handleInput(event, index) {
        // const newValue = event.target.value;
        // const inputName = event.target.name;

        // setQuestions(prevQuestions => {
        //     if(inputName==="questionMain") {
        //         return {
        //             questionNumber: prevQuestions.questionNumber, 
        //             mQuestion: "", 
        //             mValue: 
        //         }
        //     }
        // })
        // const { name, value } = event.target;
        // const updatedQuestions = [...questions];
        // updatedQuestions[index] = { ...updatedQuestions[index], [name]: value };
        // setQuestions(updatedQuestions);
        const { name, value } = event.target;
        setQuestions(prevQuestions => {
            return prevQuestions.map((question, i) => {
                if (i === index) {
                    return { ...question, [name]: value };
                }
                return question;
            });
        });
    }

    function handleButtonClick(index) {
        const suggestedQuestion = suggestedQuestions[index].sQuestion;
        const suggestedQuestionType = suggestedQuestions[index].sValue;
        const suggestedMultiple = suggestedQuestions[index].sMultiple;

        const lastQuestion = questions[questions.length - 1];
        const emptyQuestionIndex = questions.findIndex((q) => q.mQuestion.trim() === "");

        //console.log("its index " + emptyQuestionIndex) //for debugging button click

        if (emptyQuestionIndex !== -1) {
            if (suggestedMultiple.length === 0) {
                const newQuestions = [...questions];
                newQuestions[emptyQuestionIndex].mQuestion = suggestedQuestion;
                newQuestions[emptyQuestionIndex].mValue = suggestedQuestionType;
                setQuestions(newQuestions);
            }
            else {
                const newQuestionsMultiple = [...questions];
                newQuestionsMultiple[emptyQuestionIndex].mQuestion = suggestedQuestion;
                newQuestionsMultiple[emptyQuestionIndex].mValue = suggestedQuestionType;
                newQuestionsMultiple[emptyQuestionIndex]["mMultiple"] = suggestedMultiple;
                setQuestions(newQuestionsMultiple);
            }
        } else if (lastQuestion.length !== -1) {
            if (suggestedMultiple.length === 0) {
                const newQuestions = [...questions];
                newQuestions[newQuestions.length - 1].mQuestion = suggestedQuestion;
                newQuestions[newQuestions.length - 1].mValue = suggestedQuestionType;
                if(newQuestions[newQuestions.length - 1]["mMultiple"]) {
                    delete newQuestions[newQuestions.length - 1]["mMultiple"];
                    setQuestions(newQuestions);
                }
                setQuestions(newQuestions);
            }
            else {
                const newQuestionsMultiple = [...questions];
                newQuestionsMultiple[newQuestionsMultiple.length - 1].mQuestion = suggestedQuestion;
                newQuestionsMultiple[newQuestionsMultiple.length - 1].mValue = suggestedQuestionType;
                newQuestionsMultiple[newQuestionsMultiple.length - 1]["mMultiple"] = suggestedMultiple;
                setQuestions(newQuestionsMultiple);
            }
        }


    }

    //console.log(questions); //for debugging questions

    return (
        <Grid container spacing={2} >
            <Grid item xs={8}>
                <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold' }} >Additional Questions for Students:</Typography>
                {questions.map((question, index) => {
                    return (
                        <Grid container direction="row" justifyContent="start" alignItems="center" key={question.questionNumber}>
                            <Typography >Question {question.questionNumber}:</Typography>
                            <TextField id="outlined-required" name="mQuestion" value={question.mQuestion} label="" variant="outlined" size="small" sx={{ m: 2, width: 400 }} onChange={(event) => handleInput(event, index)} />
                            <TextField
                                id="outlined-select-currency"
                                name="mValue"
                                select
                                value={question.mValue}
                                size="small"
                                sx={{ m: 2, width: 225 }}
                                onChange={(event) => handleInput(event, index)}
                            >
                                {questionType.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button variant="contained" size="large" color="error" onClick={() => handleDeleteQuestion(question.questionNumber)}>
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
                        return (
                            <Button variant="contained" size="large" endIcon={<AddIcon />} sx={{
                                bgcolor: e.sBgColor, my: 2, textTransform: "none", textAlign: "left", '&:hover': {
                                    backgroundColor: '#84BFF7'
                                }

                            }} onClick={() => handleButtonClick(idx)
                            }
                            disabled={questions.length === 0}
                            >
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