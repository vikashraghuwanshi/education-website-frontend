import React, { useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import styles from './Signin.module.css'
import loginService from '../services/login'
import tokenService from '../services/token'
import jwt_decode from 'jwt-decode'
import Spinner from './Spinner';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const SignIn = (props) => {


  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)
  const [showPassword, setShowPassword] = useState(false);



  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: '486028532446-hpofkv1s6ropn1p85u4leqtgc5ste263.apps.googleusercontent.com',
      callback: handleCallbackResponse
    })


    google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' }
    )
  }, [])


  // Check if user is already logged in
  if (props.user) {
    navigate('/error?404-Not-found'); 
    return null; // Render nothing
  }


  const signin = async (event) => {
    setShowSpinner(true)
    event.preventDefault();
    try {
      const firstname = ''
      const lastname = ''
      const login_by = 'database'
      const user = await loginService.login({
        email, firstname, lastname, password, login_by
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      tokenService.setToken(user.token)
      props.setUser(user)
      setEmail('')
      setPassword('')
      navigate('/')
      console.log("Sign in Page: " + window.location.pathname + ' ' + user.email)
    } catch (error) {
      // console.log('Error in login')
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setAlertMessage(error.response.data.error)
      } else setAlertMessage('Some Error Occured. Try Again!!!')
      setEmail('')
      setPassword('')
    }
    setShowSpinner(false)
  }

  const signup = async () => {
    navigate('/sign-up')
  }


  const handleGoogleLogin = async (userObject) => {

    setShowSpinner(true)
    try {
      const email = userObject.email
      const firstname = userObject.given_name
      const lastname = userObject.family_name
      const password = ''
      const login_by = 'google'
      const user = await loginService.login({
        email, firstname, lastname, password, login_by
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      tokenService.setToken(user.token)
      props.setUser(user)
      // console.log(user)
      setEmail('')
      setPassword('')
      console.log("Sign In User: " + user.email)
      navigate('/', { replace: true });
    } catch (exception) {
      // console.log('Error in login')
      setAlertMessage('Some Error Occured. Try Again!!!');
    }
    setShowSpinner(false)
  }


  function handleCallbackResponse(response) {
    const userObject = jwt_decode(response.credential)
    handleGoogleLogin(userObject)
    document.getElementById('signInDiv').hidden = false
    return
  }

  const forgotPassword = () => {
    navigate('/forgot-password')
  }
  


  return (

    <>
    {showSpinner && <Spinner/>}
    <div className={styles.signin_container}  >
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form action='#'className={styles.form} onSubmit={signin} autoComplete='on'>
          {alertMessage && <div style={{ display: 'flex', justifyContent: 'center' }}>
                              <span  style= {{ color: alertMessage[0] === 'V' 
                              ? 'green' : 'red', marginBottom: '40px'}} >{alertMessage}</span>
                          </div>}
            <h2 className={styles.h2}>Sign in</h2>
            <input className={styles.input} type="email" placeholder="Email" 
                        value={email} onChange={(e) => setEmail(e.target.value)} 
                        autoComplete='email' autoFocus required />
            
            <div className={styles.passwordcontainer}>
              <input className={styles.input} type={showPassword ? 'text' : 'password'}
                        placeholder="Password" value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        autoComplete='current-password' required />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className={styles.passwordtoggle}
                onClick={()=>setShowPassword(!showPassword)}
              />
            </div>

            <div className={styles.forgot_password}>
              <Link to="/forgot-password" onClick={forgotPassword}>
                Forgot Password?
              </Link>
            </div>
            <button className={styles.button} type="submit" >Sign In</button>
            <div className={styles.googleSignInbutton} id='signInDiv'></div>
          </form>
        </div>
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.h1}>Hello, Friend!</h1>
              <p className={styles.p}>Enter your personal details and start journey with us</p>
              <Link to='/sign-up'> <button className={`${styles.ghost} ${styles.button}`} onClick={() => { signup() }}>Sign Up</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn