import "./App.css";
import Course from "./components/Course";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import tokenService from "./services/token";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "./components/EmailVerify";
import UpdatePassword from "./components/UpdatePassword";
import ErrorPage from "./components/ErrorPage";
import Home from "./components/Home";
import SendResetLink from "./components/SendResetLink";



function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
    console.log("USE EFFECT")
  }, [])


  console.log("Path: " + window.location.pathname)
  console.log("App user: " + user)
  if(user !== null) {
    console.log(user.token)
  }

  return (
    <>
      {/* <Router> */}
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/course' element={<Course/>} />
          <Route path='/sign-in' element={<SignIn user={user} setUser={setUser}/>}/>
          <Route path='/sign-up' element={user === null ? <SignUp/>
                                            : <Navigate replace to='/error?404-Not-Found' />}/>

          {/* No need to set the Navigate replace since user is verifying email*/}
          <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
          <Route path='/change-password' element={user===null ? <Navigate replace to='/error?404-Not-Found' />
                                            : <UpdatePassword user={user}/>} />

          {/* No need to set the Navigate replace since user is updating password using email*/}
          <Route path='/users/:id/forgot/:token' element={<UpdatePassword reset />}/>
          <Route path='/forgot-password' element={user===null ? <SendResetLink/>
                                            : <Navigate replace to='/error?404-Not-Found' /> } />
          <Route path='/quiz' exact Component={Quiz} />
          <Route path='*' exact Component={ErrorPage} />
        </Routes>
      {/* </Router> */}
    </>
  );
}

export default App;