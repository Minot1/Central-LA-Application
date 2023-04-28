import axios from "axios";
import CasClient, { constant } from "react-cas-client";

let casEndpoint = "https://login.sabanciuniv.edu/";
let casOptions = { version: constant.CAS_VERSION_2_0 };

let casClient = new CasClient(casEndpoint, casOptions);

// const apiEndpoint = "http://pro2-dev.sabanciuniv.edu/api";
const apiEndpoint = "http://localhost:8000/api";

async function getAnnouncement(id) {
  try {
    const results = await axios.get(apiEndpoint + "/post/" + id);
    console.log(results.data.questions);
    return results.data;
  } catch (error) {}
}

async function getAllAnnouncements() {
  try {
    const results = await axios.get(apiEndpoint + "/listPost");
    return results.data;
  } catch (error) {}
}

function addAnnouncement(courseCode, lastApplicationDate, lastApplicationTime, letterGrade, workHours, details, auth_instructors, questions) {
  const username = "instructor2";
  const faculty = "FENS";
  const term = "Fall 2022";
  const title = "title test";

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

function updateAnnouncement(id, username, courseCode, lastApplicationDate, lastApplicationTime, letterGrade, workHours, details, auth_instructors, questions) {
  const faculty = "FENS";
  const term = "Fall 2022";
  const title = "title update test";

  const deadline = lastApplicationDate + " " + lastApplicationTime + ":00";
  const transformedQuestions = questions.map((question) => ({
    type: question.mValue,
    ranking: question.questionNumber,
    question: question.mQuestion,
    multiple_choices: question.mValue === "Multiple Choice" ? question.mMultiple : [],
  }));
  console.log(letterGrade);
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
    const results = await axios.get(
      apiEndpoint + "/listPostApplication/" + postID
    );
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

export {
  getAllAnnouncements,
  addAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  getApplicationsByPost,
  validateLogin,
};
