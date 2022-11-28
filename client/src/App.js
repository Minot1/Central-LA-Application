import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
        <Route path="/instructor" element={<div><Sidebar></Sidebar></div>}></Route>
        <Route path="/student" element={<div></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
