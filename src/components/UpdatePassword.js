import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import Spinner from './Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import changePasswordService from '../services/change_password';
import forgotPasswordService from '../services/forgot_password';
import resetLinkVerifyService from '../services/verify_reset_link'
import InvalidURL from './InvalidURL';



const useStyles = makeStyles((theme) => ({
  change_password_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(14),
    backgroundColor: '#FFFFFF',
    paddingTop: theme.spacing(4),
    width: '30%',
    height: '40%',
    borderRadius: '20px'
  },
  form: {
    width: '100%',
    maxWidth: 400,
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(8),
    borderRadius: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    height: '50px',
    borderRadius: '30px',
    cursor: 'pointer',
    background: 'linear-gradient(90deg, #6739b7 0%, #a884e6 100%)',
    '&:hover': {
      backgroundColor: '#5e11e4',
    },
  },
  disabled_button: {
    marginTop: theme.spacing(2),
    height: '50px',
    borderRadius: '30px',
    border: '1px solid white',
    backgrounColor: '#cccccc',
    color: '#FFFFFF',
  },
  heading: {
    color: 'rgb(83, 159, 16)',
    marginBottom: theme.spacing(2),
  },
  passwordField: {
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    top: '35%',
    right: theme.spacing(1),
    transform: 'translateY(-50%)',
  },
}));



export default function UpdatePassword(props) {

  const classes = useStyles()
  const navigate = useNavigate()
  const param = useParams()

  const [reset, setReset] = useState(true);
  const [newPassword, setNewPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alertMessage, setAlertMessage] = useState(' ')
  const [showSpinner, setShowSpinner] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [validUrl, setValidUrl] = useState(true)
  const [userToken, setUserToken] = useState(null)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)


  useEffect(() => {
		const verifyResetLinkUrl = async () => {
			try {

				const id = param.id
				const token = param.token
				
				const { data } = await resetLinkVerifyService.verify_reset_link({
					id, token
				})

        console.log("yes")
        console.log(data)
        setUserToken(data.token)
        console.log("yes")
				setValidUrl(true)
			} catch (error) {
				// console.log(error)
				setValidUrl(false)
			}
      setReset(false)
		};

		if(props.reset) verifyResetLinkUrl();
	}, []);



  // Check if user is already logged in
  if (!props.reset && !props.user) {
    navigate('/error?404-Not-found')
    return // Render nothing
  } 


  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
  };



  const updatePassword = async(e) => {
    setShowSpinner(true)
    e.preventDefault();

    try {
      
      if(!props.reset) {
        const token = props.user.token
        const user = await changePasswordService.changePassword({
          password: newPassword
        }, token)
        console.log(user)
        setAlertMessage(user)
        setTimeout(() => {
          setShowSpinner(false)
          navigate('/')
        }, 1000);

      } else {

        const user = await changePasswordService.changePassword({
          password: newPassword
        }, userToken)
        console.log(user)
        setAlertMessage(user)
        setTimeout(() => {
          setShowSpinner(false)
          navigate('/sign-in')
        }, 1000);
      }

      // navigate('/chnged-pwd-success')
    } catch (error) {
        console.log('Error in changing password')
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setAlertMessage(error.response.data.error)
        } else setAlertMessage('Some Error Occured. Try Again!!!')
        console.log(error)
        setShowSpinner(false)
    }

    // Reset form fields
    setNewPassword('')
    setRepeatPassword('')
  };

  return (
    <React.Fragment>
      <div>
        {showSpinner && <Spinner/>}
        {props.reset && reset && <Spinner opaque/>}
        {((!reset && validUrl) || (!props.reset && props.user) ) ?
          <Container component="main" className={classes.change_password_container}>

            <div style={{ padding:'20px' }}>
                {alertMessage && (
                  <Typography variant="body2" color={alertMessage[0] === 'P'
                                              ? 'primary' : 'error' } align="center"
                                              style={{ fontSize: '20px' }}>
                    {alertMessage}
                  </Typography>
                )}
            </div>
            <Typography variant="h5" align="center" className={classes.heading}>
              {!props.reset && 'Change Password'}
              {props.reset && 'Reset Password'}
            </Typography>

            <form className={classes.form} onSubmit={updatePassword}>

              <div className={classes.passwordField}>

                <TextField
                  label="New Password"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  variant="outlined"
                  fullWidth
                  required
                  className={classes.textField}
                />
                <IconButton
                  size='small'
                  className={classes.showPasswordButton}
                  onClick={(e)=>setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </IconButton>
              </div>

              <div className={classes.passwordField}>
                <TextField
                  label="Repeat New Password"
                  type={showRepeatPassword ? 'text' : 'password'}
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  variant="outlined"
                  fullWidth
                  required
                  className={classes.textField}
                />
                <IconButton
                  size='small'
                  className={classes.showPasswordButton}
                  onClick={(e)=>setShowRepeatPassword(!showRepeatPassword)}
                >
                  <FontAwesomeIcon icon={showRepeatPassword ? faEyeSlash : faEye} />
                </IconButton>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={!newPassword || newPassword !== repeatPassword 
                          ? classes.disabled_button : classes.button}
                disabled={!newPassword || newPassword !== repeatPassword}
              >
                {props.reset ? 'Reset Password' : 'Change Password'}
              </Button>
            </form>
          </Container> : <InvalidURL reset/>
        }
      </div>
    </React.Fragment>
  )
}