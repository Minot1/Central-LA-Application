import axios from "axios";
import CasClient, { constant } from "react-cas-client";

let casEndpoint = "https://login.sabanciuniv.edu/";
let casOptions = { version: constant.CAS_VERSION_2_0 };

let casClient = new CasClient(casEndpoint, casOptions);

// const apiEndpoint = "http://pro2-dev.sabanciuniv.edu/api";
const apiEndpoint = "http://localhost:8000/api"

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

function addAnnouncement(faculty, courseCode, term, minGrade, questions) {
  var username = "instructor1";
  var deadline = "2023/03/14";
  var title = "title test";
  axios.post(apiEndpoint + "/addPost", {
    username: username,
    faculty: faculty,
    courseCode: courseCode,
    term: term,
    title: title,
    minGrade: minGrade,
    questions: questions,
    deadline: deadline,
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
    const result = await axios.post(
      apiEndpoint + "/serviceValidate", {
        serviceUrl: serviceUrl,
        ticket: ticket,
      }
    );
    console.log(result);
    console.log(result.data);
    return result.data;
  } catch (error) {
    
  }
}

export {
  getAllAnnouncements,
  addAnnouncement,
  getAnnouncement,
  getApplicationsByPost,
  validateLogin,
};
