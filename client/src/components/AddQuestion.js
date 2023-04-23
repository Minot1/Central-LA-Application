import React, { useState } from 'react'
import { Typography, Box, Button, Grid } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';


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
        sMultiple: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        sBgColor: "#5FB3F6",
    },

]

function AddQuestion() {

    const [questions, setQuestions] = useState([{ questionNumber: 1, mQuestion: "", mValue: 'Short Answer', mMultiple: ["", ""] }, { questionNumber: 2, mQuestion: "", mValue: 'Short Answer', mMultiple: ["", ""] }, { questionNumber: 3, mQuestion: "", mValue: 'Short Answer', mMultiple: ["", ""] }])

    function addNewQuestion() {
        const nextNum = (questions.length) + 1
        const nextQuestion = { questionNumber: nextNum, mQuestion: "", mValue: 'Short Answer', mMultiple: ["", ""] }
        setQuestions([...questions, nextQuestion])
    }

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

    // function handleInput(event, index) {
    //     const { name, value } = event.target;
    //     setQuestions(prevQuestions => {
    //         return prevQuestions.map((question, i) => {
    //             if (i === index) {
    //                 return { ...question, [name]: value };
    //             }
    //             return question;
    //         });
    //     });
    // }

    function handleInput(event, index) {
        const { name, value } = event.target;
        if (name === 'mValue' && !['Short Answer', 'Long Answer', 'Multiple Choice'].includes(value)) {
            return;
        }
        setQuestions(prevQuestions => {
            return prevQuestions.map((question, i) => {
                if (i === index) {
                    const mMultiple = (name === 'mValue' && value !== 'Multiple Choice') ? ['', ''] : question.mMultiple;
                    return { ...question, [name]: value, mMultiple };
                }
                return question;
            });
        });
    }


    function handleButtonClick(index) {
        const suggestedQuestion = suggestedQuestions[index].sQuestion;
        const suggestedQuestionType = suggestedQuestions[index].sValue;
        const suggestedMultiple = suggestedQuestions[index].sMultiple;

        if (suggestedMultiple.length === 0) {
            const nextNum = (questions.length) + 1;
            const nextQuestion = { questionNumber: nextNum, mQuestion: suggestedQuestion, mValue: suggestedQuestionType, mMultiple: ["", ""] }
            setQuestions([...questions, nextQuestion])
        } else {
            const nextNum = (questions.length) + 1;
            const nextQuestion = { questionNumber: nextNum, mQuestion: suggestedQuestion, mValue: suggestedQuestionType, mMultiple: suggestedMultiple }
            setQuestions([...questions, nextQuestion])
        }
        // console.log("its index " + emptyQuestionIndex) //for debugging button click

    }

    function addChoiceToQuestion(questions, questionNumber) {
        const updatedQuestions = [...questions]; // create a copy of the original array

        // find the index of the question with the specified questionNumber
        const questionIndex = updatedQuestions.findIndex((q) => q.questionNumber === questionNumber);

        if (questionIndex !== -1) { // if the question exists
            const updatedChoices = [...updatedQuestions[questionIndex].mMultiple]; // create a copy of the original choices array
            updatedChoices.push(""); // add the new choice to the end of the array

            // update the question's choices array with the new choices array
            updatedQuestions[questionIndex] = {
                ...updatedQuestions[questionIndex],
                mMultiple: updatedChoices
            };
        }

        return updatedQuestions; // return the updated array
    }

    function handleAddChoice(questionNumber) {
        const updatedQuestions = addChoiceToQuestion(questions, questionNumber);
        setQuestions(updatedQuestions);
    }

    function deleteChoice(questionNumber, choiceIndex) {
        setQuestions(prevQuestions => {
            // Find the question by its number
            const question = prevQuestions.find(q => q.questionNumber === questionNumber);

            // Make a copy of the question object and its choices array
            const updatedQuestion = { ...question };
            const updatedChoices = [...updatedQuestion.mMultiple];

            // Remove the choice at the given index
            updatedChoices.splice(choiceIndex, 1);

            // Update the question object with the new choices array
            updatedQuestion.mMultiple = updatedChoices;

            // Find the index of the question in the previous questions array
            const questionIndex = prevQuestions.indexOf(question);

            // Make a copy of the previous questions array
            const updatedQuestions = [...prevQuestions];

            // Update the question at the correct index with the new question object
            updatedQuestions[questionIndex] = updatedQuestion;

            // Return the updated questions array
            return updatedQuestions;
        });
    }

    function handleInputChoice(questionNumber, choiceIndex, newValue) {
        const newQuestions = questions.map((question) => {
            if (question.questionNumber === questionNumber) {
                const newMultiple = question.mMultiple.map((choice, index) => {
                    if (index === choiceIndex) {
                        return newValue;
                    }
                    return choice;
                });
                return { ...question, mMultiple: newMultiple };
            }
            return question;
        });
        setQuestions(newQuestions);
    }

    // function handleOnDragEnd(result) {
    //     if (!result.destination) {
    //         return;
    //     }

    //     const sourceIndex = result.source.index;
    //     const destinationIndex = result.destination.index;

    //     setQuestions(prevQuestions => {
    //         const updatedQuestions = [...prevQuestions];
    //         const [removed] = updatedQuestions.splice(sourceIndex, 1);
    //         updatedQuestions.splice(destinationIndex, 0, removed);
    //         return updatedQuestions;
    //     });
    // }

    // function handleOnDragEndToChoice(result) {
    //     //console.log(result)
    //     if (!result.destination) {
    //         return;
    //     }

    //     const sourceIndex = result.source.index;
    //     const destinationIndex = result.destination.index;

    //     setQuestions(prevQuestions => {
    //         const updatedQuestions = [...prevQuestions];
    //         const sourceQuestionNumber = parseInt(result.draggableId);
    //         const destinationQuestionNumber = parseInt(result.destination.droppableId);

    //         // If the source and destination questions are the same
    //         if (sourceQuestionNumber === destinationQuestionNumber) {
    //             // Update the order of the choices within the same question
    //             const questionIndex = updatedQuestions.findIndex(q => q.questionNumber === sourceQuestionNumber);
    //             const question = updatedQuestions[questionIndex];
    //             const [removed] = question.mMultiple.splice(sourceIndex, 1);
    //             question.mMultiple.splice(destinationIndex, 0, removed);
    //             updatedQuestions[questionIndex] = question;
    //         } else {
    //             // Update the order of the choices between two different questions
    //             const sourceQuestionIndex = updatedQuestions.findIndex(q => q.questionNumber === sourceQuestionNumber);
    //             const destinationQuestionIndex = updatedQuestions.findIndex(q => q.questionNumber === destinationQuestionNumber);
    //             const sourceQuestion = updatedQuestions[sourceQuestionIndex];
    //             const destinationQuestion = updatedQuestions[destinationQuestionIndex];
    //             const [removed] = sourceQuestion.mMultiple.splice(sourceIndex, 1);
    //             destinationQuestion.mMultiple.splice(destinationIndex, 0, removed);
    //             updatedQuestions[sourceQuestionIndex] = sourceQuestion;
    //             updatedQuestions[destinationQuestionIndex] = destinationQuestion;
    //         }
    //         return updatedQuestions;
    //     });
    // }
    function handleOnDragEnd(result) {
        if (!result.destination) {
            return;
        }

        setQuestions(prevQuestions => {
            const updatedQuestions = Array.from(prevQuestions);
            const [removed] = updatedQuestions.splice(result.source.index, 1);
            updatedQuestions.splice(result.destination.index, 0, removed);

            const updatedQuestionsWithNumbers = updatedQuestions.map((question, index) => {
                return {
                    ...question,
                    questionNumber: index + 1
                }
            });

            return updatedQuestionsWithNumbers;
        });
    }

    console.log(questions); //for debugging questions 
    //sx={{backgroundColor: snapshot.isDraggingOver ? "yellow" : "white"}} // maybe add for background of droppable part
    return (
        <Grid container spacing={2} >
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="questions">
                    {(provided) => (
                        <Grid item xs={8} {...provided.droppableProps} ref={provided.innerRef}>
                            <Typography variant='h5' sx={{ textDecoration: 'underline', mt: 8, mb: 2, fontWeight: 'bold' }} >Additional Questions for Students:</Typography>
                            {questions.map((question, index) => {
                                return (
                                    <Draggable key={question.questionNumber} draggableId={question.questionNumber.toString()} index={index}>
                                        {(provided, snapshot) => (<Grid container direction="row" justifyContent="start" alignItems="center" sx={{ backgroundColor: snapshot.isDragging && "#394263", color: snapshot.isDragging && "white" }} key={question.questionNumber} {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}  >
                                            <Typography >Question {question.questionNumber}:</Typography>
                                            <TextField id="outlined-required" name="mQuestion" multiline maxRows={20} value={question.mQuestion} label="" variant="outlined" size="small" sx={{ m: 2, width: 450, "& .MuiOutlinedInput-input": { color: snapshot.isDragging && "white" }, "& fieldset": { borderColor: snapshot.isDragging && "white" } }}
                                                onChange={(event) => handleInput(event, index)} />
                                            <TextField
                                                id="outlined-select-currency"
                                                name="mValue"
                                                select
                                                value={question.mValue}
                                                size="small"
                                                sx={{
                                                    m: 2, width: 225, "& .MuiSelect-select": { color: snapshot.isDragging && "white" }, "& fieldset": { borderColor: snapshot.isDragging && "white" }
                                                }}
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

                                            {
                                                question.mValue === "Multiple Choice" && <Grid item xs={10} sx={{ backgroundColor: snapshot.isDragging ? '#4D5571' : '#F5F5F5', px: 2 }}>
                                                    {question.mMultiple.map((multiple, idx) => {
                                                        return (<Grid container direction="row" justifyContent="start" alignItems="center" >
                                                            <Typography >Choice {(idx + 1)}:</Typography>
                                                            <TextField id="outlined-required" name="mMultiple" multiline maxRows={20} value={multiple} label="" variant="outlined" size="small" sx={{ m: 2, width: 300, "& .MuiOutlinedInput-input": { color: snapshot.isDragging && "white" }, "& fieldset": { borderColor: snapshot.isDragging && "white" } }}
                                                                onChange={(event) => handleInputChoice(question.questionNumber, idx, event.target.value)} />
                                                            <Button variant="contained" size="large" sx={{
                                                                bgcolor: "#b50b0b", '&:hover': {
                                                                    backgroundColor: '#e60e0e'
                                                                }
                                                            }} onClick={() => deleteChoice(question.questionNumber, idx)}>
                                                                <CancelIcon fontSize="inherit" />
                                                            </Button>
                                                        </Grid>)
                                                    })}
                                                    <Grid container direction="row" justifyContent="start" alignItems="center">
                                                        <Button variant="contained" size="large" startIcon={<ControlPointDuplicateIcon />} sx={{
                                                            bgcolor: "#2196F3", my: 2, '&:hover': {
                                                                backgroundColor: '#84BFF7'
                                                            }
                                                        }} onClick={() => handleAddChoice(question.questionNumber)} >
                                                            Add Choice
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            }
                                        </Grid>)}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                            <Grid container direction="row" justifyContent="start" alignItems="center">
                                {questions.length < 10 &&
                                    <Button variant="contained" size="large" startIcon={<AddCircleIcon />} sx={{ bgcolor: "#394263", my: 2 }} onClick={addNewQuestion} >
                                        Add Question
                                    </Button>
                                }

                            </Grid>
                        </Grid>
                    )

                    }
                </Droppable>

            </DragDropContext>

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