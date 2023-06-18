import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './InvalidURL.css'
import React from 'react'
import { Link } from 'react-router-dom'

function InvalidURL(props) {
  return (
    <>
        <div className='invalid-url-container'>
		    <FontAwesomeIcon icon={faHourglassEnd} size='5x' color='#ec2a4e'/>
			<h1 style={{ color: 'red', marginTop: '10px' }}>Link Expired!!!</h1>
			{!props.reset && <><h2>Login to send verification link again!!!</h2>
			<Link to="/sign-in">
				<button className='invalid-url-btn'>Login</button>
			</Link></>}

            {props.reset && <><h2>Send Reset Link Again!!!</h2>
            <Link to="/forgot-password">
				<button className='invalid-url-btn'>Send Reset Link</button>
			</Link></>}
	    </div>
    </>
  )
}

export default InvalidURL
