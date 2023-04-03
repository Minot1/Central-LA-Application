import "./App.css";
import MockCAS from "./pages/MockCAS";
import { BrowserRouter, Routes, Route, useSearchParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateAnnouncement from "./pages/CreateAnnouncement";
import ApplyPage from "./pages/ApplyPage";
import ApplicantsPage from "./pages/ApplicantsPage";
import { useDispatch, useSelector } from "react-redux";
import LoginCAS from "./pages/LoginCAS";
import { useEffect } from "react";
import { startLoginProcess, successLogin } from "./redux/userSlice";
import { validateLogin } from "./apiCalls";

function App() {
  const [urlParams, setUrlParams] = useSearchParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const url = window.location.href;

  useEffect(() => {
    if (url.indexOf("?ticket=") != -1 || url.indexOf("&ticket=") != -1 || !isLoggedIn) {
      dispatch(startLoginProcess());
      // parse and get the ticket
      const ticket = urlParams.get("ticket");
      console.log(ticket);
      // send it to backend
      // const res = validateLogin(ticket);
      // console.log(res);
      // check the response
      // if result is positive, dispatch loginSuccess and refresh, otherwise dispatch loginFail or logout
      dispatch(successLogin("denemeUser"));
      // urlParams.delete("ticket");
      setUrlParams(urlParams);
      //window.location.reload();
    }
  }, []);

  return (
      <Routes>
        {isLoggedIn ? (
          <>
        <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
        <Route path="/home" element={<HomePage></HomePage>}></Route>
        <Route path="/create-announcement" element={<CreateAnnouncement></CreateAnnouncement>}></Route>
        <Route path="/apply/:id" element={<ApplyPage></ApplyPage>}></Route>
        <Route path="/applicants" element={<ApplicantsPage></ApplicantsPage>}></Route>
        </>
        ) : (
          <>
          <Route exact path="/" element={<MockCAS></MockCAS>}></Route>
          <Route path="*" element={<LoginCAS></LoginCAS>}></Route>
          </>
        )}
      </Routes>
  );
}

export default App;
