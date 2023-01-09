import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, IconButton, Collapse } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';

function CustomRow(props) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = React.useState("");

    const handleChange = (event) => {
        setStatus(event.target.value);
      };

    return (
        <>
                        <TableRow
                        key={index + 1}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}}align="left">{row.name}</TableCell>
                        <TableCell sx={{borderBottom:"none"}} component="th" scope="row">{row.student_id}</TableCell>
                        <TableCell sx = {{bgcolor: "#FAFAFA", borderBottom:"none"}} align="left">{row.grade}</TableCell>
                        <TableCell sx={{borderBottom:"none"}} align="left">{row.working_hours}</TableCell>
                        <TableCell sx = {{bgcolor: "#FAFAFA", borderBottom:"none"}} align="left">{row.status}</TableCell>
                        <TableCell sx = {{borderBottom:"none"}} align="left">{row.post_id}</TableCell>
                        <TableCell sx={{bgcolor: "#FAFAFA", borderBottom:"none"}} align="center">
                        <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
                        </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                        <Collapse in={open} component="tr" style={{ display: "block" }}>
                        <td>
                          <Typography m={2}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget augue tincidunt, tincidunt nunc eu, pulvinar sem. Nunc non lobortis metus. Nulla a ligula ac nisl vulputate auctor eu sed orci. Praesent a augue ut urna laoreet euismod. Duis non nulla fermentum eros scelerisque pharetra. Maecenas id suscipit purus. Mauris vel metus et arcu imperdiet suscipit in vitae arcu. Aenean tellus risus, ultricies ut risus nec, faucibus laoreet libero. Vestibulum nec tempus orci, sagittis pretium tortor. Etiam quis mattis ante, sed efficitur eros. In imperdiet turpis magna, in viverra velit varius sed. Nulla mollis lobortis aliquet. Nullam viverra et enim quis ullamcorper. Sed tincidunt tellus vitae ligula tincidunt, eu molestie metus interdum.</Typography>
                        </td>
                                </Collapse>
                            </TableCell>
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                            <Collapse in={open} component="tr" style={{ display: "block" }}>
                            <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={""}><em>None</em></MenuItem>
                                    <MenuItem value={"Accepted"}>Accepted</MenuItem>
                                    <MenuItem value={"Rejected"}>Rejected</MenuItem>
                                    <MenuItem value={"Interested"}>Interested</MenuItem>
                                </Select>
                                </FormControl>                      
                            </Box>
                                        </Collapse>
                            </TableCell>
                        </TableRow>
                      </>
    );
}


function ApplicantsTable(props) {
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
      }, [props.rows]);
      
    return(
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600}} aria-label="simple table">
                <TableHead>
                    <TableRow sx = {{bgcolor: "#eeeeee"}}>
                        <TableCell align="left">Student Name</TableCell>
                        <TableCell align="left">Student ID</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell align="left">Working hours</TableCell>
                        <TableCell align="left">Status</TableCell>
                        <TableCell align="left">Details</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <CustomRow row={row} index={index}></CustomRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ApplicantsTable;