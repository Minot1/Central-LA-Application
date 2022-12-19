import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

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
    const [rows, setRows] = React.useState([]);

    useEffect(() => {
        setRows(props.rows);
        console.log(rows)
      });
      
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600}} aria-label="simple table">
                <TableHead>
                    <TableRow sx = {{bgcolor: "#eeeeee"}}>
                        <TableCell align="left">Title</TableCell>
                        <TableCell>Course Code</TableCell>
                        <TableCell align="left">Instructors</TableCell>
                        <TableCell align="left">Last Application Date</TableCell>
                        <TableCell align="left">Desired Latter Grade</TableCell>
                        <TableCell align="left">Details</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                        key={index + 1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}}align="left">{row.title}</TableCell>
                        <TableCell sx={{borderBottom:"none"}} component="th" scope="row">{row.class}</TableCell>
                        <TableCell sx = {{bgcolor: "#FAFAFA", borderBottom:"none"}} align="left">{row.username}</TableCell>
                        <TableCell sx={{borderBottom:"none"}} align="left">{row.deadline}</TableCell>
                        <TableCell sx = {{bgcolor: "#FAFAFA", borderBottom:"none"}} align="left">{row.mingrade}</TableCell>
                        <TableCell sx = {{borderBottom:"none"}} align="left">{row.description}</TableCell>
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}} align="center">
                            <Button variant="contained" startIcon={<EditIcon />}>
                                Edit
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnnouncementTable;