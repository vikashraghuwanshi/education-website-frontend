import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button} from './Button'
import './Navbar.css'
import { Button as BTN, Divider, List, ListItem, ListItemText, Popover, makeStyles } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';


const useStyles = makeStyles((theme) => ({
    button: {
        paddingLeft: '74px',
        paddingTop: '22px',
      '&:hover': {
        backgroundColor: 'transparent', // Override hover background color
      },
      
    },
    popoverPaper: {
        minWidth: 150, // Set the desired minimum width
        justifyContent: 'center',
        paddingBottom: '10px'
      },
    link: {
        textDecoration: 'none',
        color: 'inherit',
      },
    listItem: {
        justifyContent: 'center',
        margin: theme.spacing(-2, 0), // Adjust the margin here
        cursor: 'pointer'
      },
    divider: {
        margin: theme.spacing(1, 0), // Add margin to the divider
        backgroundColor: 'gray',
      },
  }));

function Navbar(props) {

    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const closeMobileMenu = () => setClick(true)


    const [anchorEl, setAnchorEl] = React.useState(null)

    const navigate = useNavigate()

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    };

    const open = Boolean(anchorEl)
    const id = open ? 'dropdown-menu' : undefined

    const showButton = () => {
        if(window.innerWidth < 960) {
            setButton(false)
        }
        else {
            setClick(true)
        }
        
    };

    const logoutUser = () => {
        console.log("Logout")
        props.setUser(null)
        setAnchorEl(null)
        window.localStorage.removeItem('loggedUser')
        // navigate('/sign-in')
    }

    const handleChangePassword = () => {
        setAnchorEl(null)
        // navigate('/change-password')
    }

    useEffect(() => {
        showButton()
    }, [])
    window.addEventListener('resize', showButton)


    const classes = useStyles();

    const openSignInForm = () => {
        navigate('/sign-in')
    }


    const openSignUpForm = () => {
        navigate('/sign-up')
    }

    return (
        <>
        <nav className='navbar'>
            <div className='navbar-container'>
                <Link to = '/' className = "navbar-logo" onClick={closeMobileMenu}>
                    eEducative.io <i className='fab fa-typo3'/>
                </Link>
                <ul className= {click ? 'nav-menu' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to = '/' className='nav-links' onClick = {closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to = '/course' className='nav-links' onClick = {closeMobileMenu}>
                            Courses
                        </Link>
                    </li>

                    {props.user === null && 
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {button && <Button path = "/sign-in" buttonStyle='btn--outline' onClick={openSignInForm} >Login</Button>}
                        </div>
                    </li>}
                    
                    {props.user !== null && 
                    <li className='nav-item nav-tags show-name'>
                        <>
                            <BTN
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                startIcon={<AccountCircleIcon color='action' fontSize='large' />}
                                endIcon={<ArrowDropDownIcon fontSize='large' />}
                                className={classes.button}
                            >
                                <span className='nav-tags show-name'>
                                    {props.user.firstname}
                                </span>
                            </BTN>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                                }}
                                PaperProps={{
                                    classes: { root: classes.popoverPaper },
                                  }}
                            >
                                <List component="nav">
                                <ListItem button onClick={handleMenuClose} className={classes.listItem}>
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem button onClick={handleMenuClose} className={classes.listItem}>
                                    <ListItemText primary="Settings" />
                                </ListItem>
                                <ListItem button onClick={handleMenuClose} className={classes.listItem}>
                                    <ListItemText primary="Quiz Results" />
                                </ListItem>
                                <Link to ='/change-password' className={classes.link} onClick={handleChangePassword}>
                                    <ListItem className={classes.listItem}>
                                        <ListItemText primary="Change Password"/>
                                    </ListItem>
                                </Link>
                                <Divider className={classes.divider} />
                                <Link to ='/sign-in' className={classes.link} >
                                    <ListItem className={classes.listItem} onClick={logoutUser}>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </Link>
                                </List>
                            </Popover>
                            </>
                            {/* </div> */}
                    </li>}
                    
                    {props.user === null && 
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {button && <Button path = "/sign-up" buttonStyle='btn--outline' onClick={openSignUpForm} >Register</Button>}
                        </div>
                    </li>}
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar