import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import ApplyPage from "./pages/ApplyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
        {/* <Route path="/instructor" element={<div><Sidebar></Sidebar></div>}></Route> */}
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/create-announcement" element={<CreateAnnouncement></CreateAnnouncement>}></Route>
        <Route path="/apply" element={<ApplyPage></ApplyPage>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
