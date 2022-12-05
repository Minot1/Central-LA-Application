import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
          {/* <Route path="/instructor" element={<div><Sidebar></Sidebar></div>}></Route> */}
          <Route
            path="/instructor"
            element={
                <HomePage></HomePage>
            }
          ></Route>
          <Route path="/student" element={<div></div>}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
