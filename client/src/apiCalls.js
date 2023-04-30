import axios from "axios";
import CasClient, { constant } from "react-cas-client";

let casEndpoint = "https://login.sabanciuniv.edu/";
let casOptions = { version: constant.CAS_VERSION_2_0 };

let casClient = new CasClient(casEndpoint, casOptions);

// const apiEndpoint = "http://pro2-dev.sabanciuniv.edu/api";
const apiEndpoint = "http://localhost:8000/api";

async function applyToPost(postId, username, answers) {
  try {
    const results = await axios.post(apiEndpoint + "/addApplication", {
      student_username: username,
      working_hours: 10,
      post_id: postId,
      answers: answers,
      status: "applied",
      grade: 3,
      faculty: "FENS",
    });
    return results.data;
  } catch (error) {}
}

async function getAnnouncement(id) {
  try {
    const results = await axios.get(apiEndpoint + "/post/" + id);
    return results.data;
  } catch (error) {}
}

async function getAllAnnouncements() {
  try {
    const results = await axios.get(apiEndpoint + "/listPost");
    return results.data;
  } catch (error) {}
}

async function getAllInstructors() {
  try {
    const results = await axios.get(apiEndpoint + "/instructors");
    return results.data;
  } catch (error) {}
}

function addAnnouncement(courseCode, username, lastApplicationDate, lastApplicationTime, letterGrade, workHours, details, auth_instructors, questions) {
  const mockUserName = "instructor1";
  const faculty = "FENS";
  const term = "Fall 2022";
  const title = "title add test";

  const deadline = lastApplicationDate + " " + lastApplicationTime + ":00";
  const transformedQuestions = questions.map((question) => ({
    type: question.mValue,
    ranking: question.questionNumber,
    question: question.mQuestion,
    multiple_choices: question.mValue === "Multiple Choice" ? question.mMultiple : [],
  }));
  console.log(letterGrade);
  const authInstructor_userNames = auth_instructors.map((user) => user.username);

  axios.post(apiEndpoint + "/addPost", {
    instructor_username: mockUserName,
    faculty: faculty,
    courseCode: courseCode,
    deadline: deadline,
    term: term,
    title: title,
    workingHour: workHours,
    description: details,
    auth_instructors: authInstructor_userNames,
    mingrade: letterGrade,
    questions: transformedQuestions,
  });
}

function updateAnnouncement(id, username, courseCode, lastApplicationDate, lastApplicationTime, letterGrade, workHours, details, auth_instructors, questions) {
  const faculty = "FENS";
  const term = "Fall 2022";
  const title = "title update test";

  const deadline = lastApplicationDate + " " + lastApplicationTime;
  const transformedQuestions = questions.map((question) => ({
    type: question.mValue,
    ranking: question.questionNumber,
    question: question.mQuestion,
    multiple_choices: question.mValue === "Multiple Choice" ? question.mMultiple : [],
  }));
  console.log(deadline);
  const authInstructor_userNames = auth_instructors.map((user) => user.username);

  axios.put(apiEndpoint + "/updatePost/" + id, {
    instructor_username: username,
    faculty: faculty,
    courseCode: courseCode,
    deadline: deadline,
    term: term,
    title: title,
    workingHour: workHours,
    description: details,
    auth_instructors: authInstructor_userNames,
    mingrade: letterGrade,
    questions: transformedQuestions,
  });
}

async function getApplicationsByPost(postID) {
  try {
    const results = await axios.get(apiEndpoint + "/listPostApplication/" + postID);
    return results.data;
  } catch (error) {}
}

async function validateLogin(serviceUrl, ticket) {
  try {
    const result = await axios.post(apiEndpoint + "/serviceValidate", {
      serviceUrl: serviceUrl,
      ticket: ticket,
    });
    console.log(result);
    console.log(result.data);
    return result.data;
  } catch (error) {}
}

export { getAllAnnouncements, getAllInstructors, applyToPost, addAnnouncement, getAnnouncement, updateAnnouncement, getApplicationsByPost, validateLogin };
