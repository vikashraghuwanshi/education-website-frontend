import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';
import cookieCutter from 'cookie-cutter'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './Login.module.css'
import Signup from './SignUp';
import loginService from '../services/login'
import tokenService from '../services/token'


const Signin = (props) => {


  const navigate = useNavigate();


  const signin = async (event) => {
    event.preventDefault();
    console.log('inside sign in ')

    try {
      const email = props.email
      const firstname = ''
      const lastname = ''
      const password = props.password
      const login_by = 'database'
      const user = await loginService.login({
        email, firstname, lastname, password, login_by
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      tokenService.setToken(user.token)
      props.setUser(user)
      props.setEmail('')
      props.setPassword('')
      navigate('/')
    } catch (exception) {
      console.log('Error in login')
    }
  
  }

  const signup = async () => {
    navigate('/sign-up')
  }
  


  return (
    <>
      <div className={`${styles.container}`}  >
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={signin}>
            <h2 className={styles.h2}>Sign in</h2>
            <input className={styles.input} type="email" placeholder="Email" onChange={(e) => props.setEmail(e.target.value)}
            required />
            <input className={styles.input} type="password" placeholder="Password" onChange={(e) => props.setPassword(e.target.value)} required />
            <button className={styles.button} type="submit" >Sign In</button>
          </form>
        </div>
        <div className={`${styles.overlayContainer}`}>
          <div className={`${styles.overlay}`}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={`${styles.h1}`}>Hello, Friend!</h1>
              <p className={`${styles.p}`}>Enter your personal details and start journey with us</p>
              <Link to='/sign-up'> <button className={`${styles.ghost} ${styles.button}`} onClick={() => { signup() }}>Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signin