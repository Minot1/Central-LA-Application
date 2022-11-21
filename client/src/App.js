import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
