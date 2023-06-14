import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import tokenService from "./services/token";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EmailVerify from "./components/EmailVerify";
import Spinner from "./components/Spinner";



function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      tokenService.setToken(user.token)
    }
  }, [])


  return (
    <>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={!user ? <SignIn user={user} setUser={setUser}/>
                                      : <Navigate replace to="/" />}/>
        <Route path='/sign-up' element={!user ? <SignUp/>
                                      : <Navigate replace to="/" />}/>
        <Route path='/users/:id/verify/:token' element={<EmailVerify />} />
        <Route path='/quiz' exact Component={Quiz} />
        <Route path='/spinner' exact Component={Spinner} />
      </Routes>
    </>
  );
}

export default App;