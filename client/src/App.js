import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
        <Route path="/instructor" element={<div></div>}></Route>
        <Route path="/student" element={<div></div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
