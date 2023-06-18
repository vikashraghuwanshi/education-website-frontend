import React, { useState } from 'react';
import { TextField, Button, makeStyles, Typography, Container } from '@material-ui/core';
import sendResetLinkService from '../services/send_reset_link';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const useStyles = makeStyles((theme) => ({
    
  change_password_container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(14),
        backgroundColor: '#FFFFFF',
        paddingTop: theme.spacing(4),
        width: '40%',
        height: '40%',
        borderRadius: '20px'
    },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1),
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(3),
    width: '80%'
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
}));

const SendResetLink = () => {

  const classes = useStyles()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const [showSpinner, setShowSpinner] = useState(false)


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async(e) => {
    setShowSpinner(true)
    e.preventDefault();

    try {  
        const user = await sendResetLinkService.sendResetLink({
            email
          })
          console.log(user)
          setAlertMessage(user)
          setTimeout(() => {
            setShowSpinner(false)
            navigate('/sign-in')
          }, 2000);
  
        // navigate('/chnged-pwd-success')
      } catch (error) {
        //   console.log('Error in sending reset link')
          if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setAlertMessage(error.response.data.error)
          } else setAlertMessage('Some Error Occured. Try Again!!!')
          setShowSpinner(false)
      }

    setEmail('');
  };

  return (
  <>
    {showSpinner && <Spinner/>}
    <Container component="main" className={classes.change_password_container}>
        <form className={classes.form} onSubmit={handleSubmit} autocomplete='on'>

            <div style={{ paddingBottom:'50px' }}>
              {alertMessage && (
                <Typography variant="body2" color={alertMessage[0] === 'R'
                                            ? 'primary' : 'error' } align="center"
                                            style={{ fontSize: '20px' }}>
                  {alertMessage}
                </Typography>
              )}
            </div>

            <TextField
                label="Email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                variant="outlined"
                autocomplete='email'
                fullWidth
                required
                className={classes.textField}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
            >
                Send Reset Password Link
            </Button>
        </form>
    </Container>
    </>
  );
};

export default SendResetLink;
