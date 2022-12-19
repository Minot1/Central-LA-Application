import axios from 'axios';
import CasClient, { constant } from 'react-cas-client';

let casEndpoint = "https://login.sabanciuniv.edu/"
let casOptions = { version: constant.CAS_VERSION_2_0 }

let casClient = new CasClient(casEndpoint, casOptions);

const apiEndpoint = "http://localhost:8000/api"

async function getAnnouncement(id) {
    try {
        const results = await axios.get(apiEndpoint + "/post/" + id);
        console.log(results.data[0].questions);
        return results.data[0];
    } catch (error) {
        
    }
}

async function getAllAnnouncements() {
    try {
        const results = await axios.get(apiEndpoint + "/listPost");
        return results.data;
    } catch (error) {
        
    }
}

function addAnnouncement(faculty, courseCode, term, minGrade, questions) {
    var username = "instructor1"
    var deadline = "2023/02/21"
    var title = "title test"
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

export { getAllAnnouncements, addAnnouncement, getAnnouncement };