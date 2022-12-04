import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

function AnnouncementTable() {
    const rows = [
        { id: 1, courseCode: 'CS201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "5", details: "lorem ipsum"},
        { id: 2, courseCode: 'CS210', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "5", details: "lorem ipsum"},
        { id: 3, courseCode: 'MATH201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A-', wHour: "5", details: "lorem ipsum"},
        { id: 4, courseCode: 'CS300', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "5", details: "lorem ipsum"},
        { id: 5, courseCode: 'MATH204', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "10", details: "lorem ipsum" },
        { id: 6, courseCode: 'ENS206', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "10", details: "lorem ipsum"},
        { id: 7, courseCode: 'ECON201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B', wHour: "5", details: "lorem ipsum"},
        { id: 8, courseCode: 'CS301', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'A', wHour: "10", details: "lorem ipsum"},
        { id: 9, courseCode: 'HUM201', instructors: 'John Doe', lDate: 'dd/mm/yyyy', grade: 'B+', wHour: "5", details: "lorem ipsum"},
      ];
      
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600}} aria-label="simple table">
                <TableHead>
                    <TableRow sx = {{bgcolor: "#F2F2F2"}}>
                        <TableCell>Course Code</TableCell>
                        <TableCell align="left">Instructors</TableCell>
                        <TableCell align="left">Last Application Date</TableCell>
                        <TableCell align="left">Desired Latter Grade</TableCell>
                        <TableCell align="left">Work Hours</TableCell>
                        <TableCell align="left">Details</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        
                        >
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}} component="th" scope="row">
                            {row.courseCode}
                        </TableCell>
                        <TableCell sx = {{borderBottom:"none"}} align="left">{row.instructors}</TableCell>
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}} align="left">{row.lDate}</TableCell>
                        <TableCell sx = {{borderBottom:"none"}} align="left">{row.grade}</TableCell>
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}}align="left">{row.wHour}</TableCell>
                        <TableCell sx = {{borderBottom:"none"}} align="left">{row.details}</TableCell>
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}} align="center">
                            <Button sx = {{bgcolor: "#3786FB"}} variant="contained" startIcon={<VisibilityIcon />} href="#apply">
                                INSPECT
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