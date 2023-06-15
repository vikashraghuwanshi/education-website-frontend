import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button} from './Button'
import './Navbar.css'
import { Button as BTN, Divider, List, ListItem, ListItemText, Menu, MenuItem, Popover, makeStyles } from '@material-ui/core'
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
      },
    divider: {
        margin: theme.spacing(1, 0), // Add margin to the divider
      },
  }));

function Navbar(props) {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)

    const closeMobileMenu = () => setClick(true)


    const [anchorEl, setAnchorEl] = React.useState(null)

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
    }

    useEffect(() => {
        showButton()
    }, [])
    window.addEventListener('resize', showButton)


    const classes = useStyles();

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

                    {props.user === null && 
                    <li className='nav-item'>
                        <div className='nav-tags'>
                            {button && <Button path = "/sign-in" buttonStyle='btn--outline'>Login</Button>}
                        </div>
                    </li>}
                    
                    {props.user !== null && 
                    <li className='nav-item nav-tags show-name'>
                    {/* <div className='nav-tags show-name'> */}
                        <>
                            <BTN
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                                startIcon={<AccountCircleIcon color='action' fontSize='large' />}
                                endIcon={<ArrowDropDownIcon fontSize='40px' />}
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
                                <Divider className={classes.divider} />
                                <Link path='/' className={classes.link} >
                                    <ListItem button onClick={logoutUser} className={classes.listItem}>
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
                            {button && <Button path = "/sign-up" buttonStyle='btn--outline'>Register</Button>}
                        </div>
                    </li>}
                    {/* <li className='nav-item'>
                        <div className='nav-tags'>
                            {props.user && button && <Button path = "/" buttonStyle='btn--outline' onClick={logoutUser}> Logout</Button>}
                        </div>
                    </li> */}
                </ul>
            </div>
        </nav>
        </>
    )
}

export default Navbar