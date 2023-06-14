import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
import styles from './Signup.module.css'
import signUpService from '../services/signup'
import Spinner from './Spinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'


const SignUp = (props) => {  

  const navigate = useNavigate();
  const [repeatPassword, setRepeatPassword] = useState("")
  const [firstname, setFirstName] = useState("")
  const [lastname, setLastName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);




  const signup = async (event) => {
    setShowSpinner(true)
    event.preventDefault()

    try {
      await signUpService.signup({
        email, firstname, lastname, password,
      })
    } catch (error) {
      // console.log('Error in signing up')
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setAlertMessage(error.response.data.error);
      } else setAlertMessage('Some Error Occured. Try Again!!!');
    }
    setShowSpinner(false)
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setRepeatPassword('')
    // navigate('/')
  }

  

  const updateFirstName = (event) => {
    // console.log('Firstname: ', event.target.value)
    setFirstName(event.target.value)
  }

  const updateLastName = (event) => {
    // console.log('Lastname: ', event.target.value)
    setLastName(event.target.value)
  }

  const updateEmail = (event) => {
    setEmail(event.target.value)
    // console.log('Email: ', event.target.value)
  }

  const updatePassword = (event) => {
   
    setPassword(event.target.value)
    if (repeatPassword && repeatPassword !== event.target.value) {
      setAlertMessage('Passwords not matching!!!');
    }
    else {
      setAlertMessage('')
    }
    
  }

  const updateRepeatPassword = (event) => {
    setRepeatPassword(event.target.value)
    if (password !== event.target.value) {
      setAlertMessage('Passwords not matching!!!');
    }
    else {
      setAlertMessage('')
    }
  }

  const signIn = () => {
    navigate('/sign-in')
}


  

  return ( <>  
  {showSpinner && <Spinner/>}
    <div className={`${styles.container} ${styles.rightPanelActive}`} >
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form action="#" className={`${styles.form}`} onSubmit={signup}>
          {alertMessage && <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span  style= {{ color: alertMessage[0] === 'V' 
                              ? 'green' : 'red', marginBottom: '30px'}} >{alertMessage}</span>
                          </div>}

            <h2 className={styles.h2}>Create Account</h2>
            <input className={styles.input} type="text" placeholder="First Name" 
                      value={firstname} onChange={(e)=> {updateFirstName(e)}}  required />
            <input className={styles.input} type="text" placeholder="Last Name" 
                      value={lastname} onChange={(e)=> {updateLastName(e)}} required />
            <input className={`${styles.input}`} type="email" placeholder="Email" 
                      value={email} onChange={(e)=> {updateEmail(e)}} required />
            
            <div className={styles.passwordcontainer}>
              <input className={styles.input} type={showPassword ? 'text' : 'password'}
                        placeholder="Password" value={password} 
                        onChange={(e) => updatePassword(e)} required />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.passwordtoggle}
                onClick={()=>setShowPassword(!showPassword)}
              />
            </div>


            <div className={styles.passwordcontainer}>
              <input className={styles.input} type={showRepeatPassword ? 'text' : 'password'}
                        placeholder="Repeat Password" value={repeatPassword} 
                        onChange={(e) => updateRepeatPassword(e)} required />
              <FontAwesomeIcon
                icon={showRepeatPassword ? faEyeSlash : faEye}
                className={styles.passwordtoggle}
                onClick={()=>setShowRepeatPassword(!showRepeatPassword)}
              />
            </div>
            

            <button className={`${styles.button}`} type="submit"
                      disabled={repeatPassword && password!==repeatPassword}>Sign Up</button>
           
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

export default SignUp