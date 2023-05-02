import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getApplicationByUsername } from "../apiCalls";

function AnnouncementTable(props) {
  // const rows = [
  //     { id: 1, courseCode: 'CS201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "5", details: "lorem ipsum"},
  //     { id: 2, courseCode: 'CS210', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "5", details: "lorem ipsum"},
  //     { id: 3, courseCode: 'MATH201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A-', wHour: "5", details: "lorem ipsum"},
  //     { id: 4, courseCode: 'CS300', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "5", details: "lorem ipsum"},
  //     { id: 5, courseCode: 'MATH204', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "10", details: "lorem ipsum" },
  //     { id: 6, courseCode: 'ENS206', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "10", details: "lorem ipsum"},
  //     { id: 7, courseCode: 'ECON201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B', wHour: "5", details: "lorem ipsum"},
  //     { id: 8, courseCode: 'CS301', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "10", details: "lorem ipsum"},
  //     { id: 9, courseCode: 'HUM201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "5", details: "lorem ipsum"},
  //   ];
  const [rows, setRows] = useState([]);
  const [studentApplications, setStudentApplications] = useState([]);
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(props.tabValue);
  const isInstructor = useSelector((state) => state.user.isInstructor);
  //const userDisplayName = useSelector((state) => state.user.name);
  //const userDisplayName = "Instructor One" //mock data
  //const userName = useSelector((state) => state.user.username);
  //const userName = "instructor1"; //mock data for instructor
  const userName = "muratk"; //mock data for student

  useEffect(() => {
    const modifiedRows = props.rows.map((row) => {
      // Split the instructor_name string by comma
      const [lastName, firstName] = row.instructor_name.split(",");

      // Rearrange the name format
      const modifiedInstructorName = firstName.trim() + " " + lastName.trim();

      // Return the modified row object
      return {
        ...row,
        instructor_name: modifiedInstructorName,
      };
    });

    setRows(modifiedRows);
    //console.log(rows);
  }, [props.rows]);


  useEffect(() => {
    if (!isInstructor) {
      getApplicationByUsername(userName)
        .then((data) => {
          // Update the state with the retrieved user applications
          setStudentApplications(data);
        })
        .catch((error) => {
          // Handle any errors that occur during the API call
          console.error('Failed to fetch user applications:', error);
        });
    }
  }, [isInstructor, userName]);



  useEffect(() => {
    setTabValue(props.tabValue);
  }, [props.tabValue]);

  //console.log(studentApplications[0].post_id);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#eeeeee" }}>
            {/* <TableCell align="left">Title</TableCell> */}
            <TableCell>Course Code</TableCell>
            <TableCell align="left">Instructors</TableCell>
            <TableCell align="left">Last Application Date/Time </TableCell>
            <TableCell align="left">Desired Letter Grade</TableCell>
            <TableCell align="left">Work Hours</TableCell>
            <TableCell align="left">Details</TableCell>
            <TableCell align="center">{tabValue === 1 && !isInstructor && "Application Status"}</TableCell>
          </TableRow>
        </TableHead>
        {isInstructor ? (
          <TableBody>
            {rows
              .filter((row) => (tabValue === 1 ? row.instructor_username === userName : true))
              .map((row, index) => (
                <TableRow key={index + 1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {/* <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.title}
                  </TableCell> */}
                  <TableCell sx={{ borderBottom: "none" }} component="th" scope="row">
                    {row.courseCode}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.instructor_name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="left">
                    {row.deadline ? (
                      <>
                        {new Date(row.deadline).toLocaleDateString("en-CA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        /{" "}
                        {new Date(row.deadline).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.mingrade}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.workingHour}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="center">
                    {row.instructor_username === userName && (
                      <Button
                        variant="contained"
                        onClick={() => navigate("/edit-announcement/" + row.id, { replace: true })}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        ) : (
          <TableBody>
            {rows
              .filter((row) => (tabValue === 1 ? studentApplications.some((studentApplication) => row.id === studentApplication.post_id) : true)) //to be continued, student'in hangi posta kayıt oldugu lazim (belki vardır)
              .map((row, index) => (
                <TableRow key={index + 1} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {/* <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.title}
                  </TableCell> */}
                  <TableCell sx={{ borderBottom: "none" }} component="th" scope="row">
                    {row.courseCode}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.instructor_name}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="left">
                    {row.deadline ? (
                      <>
                        {new Date(row.deadline).toLocaleDateString("en-CA", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}{" "}
                        /{" "}
                        {new Date(row.deadline).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.mingrade}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="left">
                    {row.workingHour}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }} align="left">
                    {row.description}
                  </TableCell>
                  <TableCell sx={{ bgcolor: "#FAFAFA", borderBottom: "none" }} align="center">
                    {tabValue === 0 ? <Button variant="contained" as={Link} to={"/apply/" + row.id} style={{ textDecoration: "none" }}>
                      Apply
                    </Button> : (
                      studentApplications
                        .filter((studentApplication) => row.id === studentApplication.post_id)
                        .map((studentApplication) => (
                          <Button variant="contained" key={studentApplication.id} style={{ 
                            textDecoration: "none",
                            backgroundColor: studentApplication.status === "Accepted" ? "green" : studentApplication.status === "Rejected" ? "red" : "orange",
                            color: "white",
                            pointerEvents: "none",
                            cursor: "default",
                            }}>
                            {studentApplication.status.toLowerCase() === "applied" ? "In Progress" : studentApplication.status}
                          </Button>
                        ))
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}

export default AnnouncementTable;
