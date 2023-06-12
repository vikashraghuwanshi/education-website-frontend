import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'
import './Navbar.css'

function Navbar(props) {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () =>setClick(!click);
    const closeMobileMenu = () => setClick(true)

    const showButton = () => {
        if(window.innerWidth < 960) {
            setButton(false)
        }
        else {
            setClick(true)
        }
        
    };

    const logoutUser = () => {
        console.log("Logout");
        props.setUser(null)
        window.localStorage.removeItem('loggedUser')
      }

    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener('resize', showButton);


    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to = "/" className = "navbar-logo" onClick={closeMobileMenu}>
                    XCEED Education <i className='fab fa-typo3'/>
                </Link>
                <div className='menu-icon' onClick={handleClick}>
                    <i className= {click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <ul className= {click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to = "/" className='nav-links' onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    { props.user === null && <li className='nav-item'>
                        <Link to = "/sign-in" className='nav-links-mobile' onClick = {closeMobileMenu}>
                            Sign In
                        </Link>
                    </li>}
                    { props.user === null && <li className='nav-item'>
                        <Link to = "/sign-up" className='nav-links-mobile' onClick = {closeMobileMenu}>
                            Sign Up
                        </Link>
                    </li>}
                    { props.user && <li className='nav-item'>
                        <Link to = "/" className='nav-links-mobile'>
                            LogOut
                        </Link>
                    </li>}
                </ul>
                {!props.user && button && <Button path = "/sign-in" buttonStyle='btn--outline'> SIGN IN</Button>}
                {!props.user && button && <Button path = "/sign-up" buttonStyle='btn--outline'> SIGN UP</Button>}
                {props.user && <span className='show-name'>{props.user.firstname} {props.user.lastname}</span>}
                {props.user && button && <Button path = "/" buttonStyle='btn--outline' onClick={logoutUser}> Logout</Button>}
            </div>
        </nav>
        </>
    )
}

export default Navbar