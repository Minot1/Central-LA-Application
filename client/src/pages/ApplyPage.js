import React, { useEffect, useMemo, useState } from "react";
import AppBarHeader from "../components/AppBarHeader";
import Sidebar from "../components/Sidebar";
import {
  Typography,
  Box,
  Button,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { getAnnouncement } from "../apiCalls";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ApplyPage = (props) => {
    const rows = [
        { name: "Student ID:", val: "00026899" },
        { name: "Name - Surname:", val: "Taner Dinçer" },
        { name: "Admit term:", val: "2018-19 Fall" },
        { name: "Faculty:", val: "FENS" },
        { name: "Program:", val: "BSCS - Computer Science" },
    ]

  const [questions, setQuestions] = useState([]);
  const [announcementInfo, setAnnouncementInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getAnnouncement(id).then((results) => setAnnouncementInfo(results));
  }, [id]);

  useEffect(() => {
    setQuestions(announcementInfo.questions);
  }, [announcementInfo]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
        <AppBarHeader />
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={3}
        >
          <Grid item>
            <Typography variant="h4">{announcementInfo.class} LA Application</Typography>
            <Divider></Divider>
          </Grid>
          <Grid item>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500, border: 1.5, borderColor: "#cccccc" }} aria-label="simple table">
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row" align="center" sx={index % 2 == 0 && { backgroundColor: "#f2f2f2" }}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={index % 2 == 0 && { backgroundColor: "#f2f2f2" }}>{row.val}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Grid>
          <Grid item>
            <Typography variant="h5">Questions</Typography>
          </Grid>
          {questions && questions.map((question) => (
            <Grid
              item
              container
              direction="rows"
              alignItems="center"
              justifyContent="center"
              spacing={4}
            >
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={2}>
                  <Typography textAlign="center">{question}:</Typography>
              </Grid>
              <Grid item xs={6}>
                <TextField multiline fullWidth></TextField>
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
          ))}
          <Grid item container
              direction="rows"
              alignItems="center"
              justifyContent="center"
              spacing={12}>
                <Grid item>
            <Button variant="contained" color="error" href="/">Cancel</Button>

                </Grid>
                <Grid item>
            <Button variant="contained" color="success">Submit</Button>

                </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ApplyPage;
