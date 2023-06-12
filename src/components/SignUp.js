import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import styles from './Signup.module.css'
import signUpService from '../services/signup'


const Signup = (props) => {  

  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [alertMessage, setAlertMessage] = useState("")


  const signup = async (event) => {
    event.preventDefault();
    console.log('inside sign up first name and last name: ', firstname, lastname)

    console.log('before submission: password and repeat password: ', props.password, repeatPassword)

    if (props.password !== repeatPassword) {
      setAlertMessage('')
    }
    else {  
      setAlertMessage('')
      setInputValue('')

      try {
        const email = props.email
        const password = props.password
        await signUpService.signup({
          email, firstname, lastname, password,
        })
  
        props.setEmail('')
        setFirstName('')
        setLastName('')
        props.setPassword('')
        setRepeatPassword('')
        navigate('/')
      } catch (exception) {
        console.log('Error in signup')
      }
    }
  }

  

  const updateFirstName = (event) => {
    console.log('firstname: ', event.target.value)
    setFirstName(event.target.value)
  }

  const updateLastName = (event) => {
    console.log('lastname: ', event.target.value)
    setLastName(event.target.value)
  }

  const updateEmail = (event) => {
    props.setEmail(event.target.value)
    console.log('email: ', event.target.value)
  }

  const updatePassword = (event) => {
   
    props.setPassword(event.target.value)
    console.log('password: ', event.target.value)
    
  }

  const updateRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
    console.log('repeat Passwor: ', event.target.value)
    console.log('pass and rep pass: ', props.password, event.target.value)
    if (props.password !== event.target.value) {
      setInputValue('Password not matched!!!');
    }
    else {
      setInputValue('')
    }
  }

  const signIn = () => {
    navigate('/sign-in')
}


  

  return (
    <>
      <div className={`${styles.container} ${styles.rightPanelActive}`} >
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form action="#" className={`${styles.form}`} onSubmit={signup}>
            <h2 className={styles.h2}>Create Account</h2>
            <input className={styles.input} type="text" placeholder="First Name" onChange={(e)=> {updateFirstName(e)}}  required />
            <input className={styles.input} type="text" placeholder="Last Name" onChange={(e)=> {updateLastName(e)}} required />
            <input className={`${styles.input}`} type="email" placeholder="Email" onChange={(e)=> {updateEmail(e)}} required />
            <input className={styles.input} type="password" placeholder="Password" onChange={(e)=> {updatePassword(e)}} required />
            <input className={styles.input} type="password" placeholder="Repeat Password" onChange={(e)=> {updateRepeatPassword(e)}} required />
            {inputValue && <p>{inputValue} {alertMessage}</p>}
            <button className={`${styles.button}`} type="submit">Sign Up</button>
           
          </form>
        </div>
       
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1} >Welcome Back!</h1>
              <p className={styles.p}>To keep connected with us please login with your personal info</p>
              <button onClick={signIn} className={`${styles.button}`} >Sign In</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Signup