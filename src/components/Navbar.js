import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'
import './Navbar.css'

function Navbar(props) {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

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
                    XSEED Education <i className='fab fa-typo3'/>
                </Link>
                <ul className= {click ? 'nav-menu' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to = "/" className='nav-links' onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {props.user === null && button && <Button path = "/sign-in" buttonStyle='btn--outline'> SIGN IN</Button>}
                        </div>
                    </li>
                    <li className='nav-item'>
                        {props.user && <span className='nav-tags show-name'>{props.user.firstname} {props.user.lastname}</span>}
                    </li>
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {!props.user && button && <Button path = "/sign-up" buttonStyle='btn--outline'> SIGN UP</Button>}
                        </div>
                    </li>
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {props.user && button && <Button path = "/" buttonStyle='btn--outline' onClick={logoutUser}> Logout</Button>}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar