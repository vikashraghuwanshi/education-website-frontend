import './EmailVerify.css'
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import verifyEmailService from '../services/verify_email'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faHourglassEnd } from '@fortawesome/free-solid-svg-icons';



const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const [showSpinner, setShowSpinner] = useState(true)
	const param = useParams();


	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {

				const id = param.id
				const token = param.token
				
				const { data } = await verifyEmailService.verify_email({
					id, token
				})

				if(data) setShowSpinner(false)
				setValidUrl(true);
			} catch (error) {
				// console.log(error);
				setValidUrl(false);
				setShowSpinner(false)
			}
		};

		verifyEmailUrl();
	}, [param]);

	return (
		<div>
			{showSpinner && <Spinner opaque/>}
			{!showSpinner && validUrl ? (
				<div className='container'>
					<FontAwesomeIcon icon={faCheckToSlot} size="10x" style={{color: "#019d38"}} />
					<h1>Email verified successfully!!!</h1>
					<Link to="/sign-in">
						<button className='green_btn'>Login</button>
					</Link>
				</div>
			) : (
				<div className='container'>
					<FontAwesomeIcon icon={faHourglassEnd} size='5x' color='#ec2a4e'/>
					<h1 style={{ color: 'red', marginTop: '10px' }}>Invalid Link!!!</h1>
					<h2>Login to send verification link again!!!</h2>
					<Link to="/sign-in">
						<button className='green_btn'>Login</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default EmailVerify;