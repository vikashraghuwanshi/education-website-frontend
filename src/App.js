import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Quiz from "./components/Quiz";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/SignUp";
import Signin from "./components/signin";
import { useEffect, useState } from "react";
import tokenService from "./services/token";


function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    <Router>
      <Navbar user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/sign-in' element={<Signin user={user} setUser={setUser} email={email} setEmail={setEmail}
                                        password={password} setPassword={setPassword}/>}/>
        <Route path='/sign-up' element={<Signup email={email} setEmail={setEmail}
                                        password={password} setPassword={setPassword}/>}/>
        <Route path='/quiz' exact Component={Quiz} />
      </Routes>
    </Router>
  );
}

export default App;