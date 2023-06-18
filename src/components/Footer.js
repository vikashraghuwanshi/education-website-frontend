import React from 'react'
import { Button } from './Button'
import './Footer.css'
import {Link} from 'react-router-dom'


function Footer () {

    return (
        <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join XSEED Education to receive our best online courses
                </p>
                <p className='footer-subscription-text'>
                    You can unsubsribe at any time.
                </p>
                <div className='input-areas'>
                    <form>
                        <input
                            type = "email" 
                            name = "email" 
                            placeholder = "Your email"
                            className='footer-input'
                        />
                        <Button buttonStyle = 'btn--outline'>
                            Subscribe
                        </Button>
                    </form>
                </div>
            </section>
            <div className='footer-links'>
                <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About</h2>
                        <Link to='/'>Our Mission</Link>
                        <Link to='/'>Meet the Team</Link>
                        <Link to='/'>Partners</Link>
                        <Link to='/'>Press</Link>
                        <Link to='/'>Careers</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link to='/'>Status</Link>
                        <Link to='/'>Security</Link>
                        <Link to='/'>Blog</Link>
                        <Link to='/'>Testimonials</Link>
                    </div>
                    </div>
                    <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>Support</h2>
                        <Link to='/'>Certified Educator Program</Link>
                        <Link to='/'>Webinars</Link>
                        <Link to='/'>Resources</Link>
                        <Link to='/'>Certified Trainer</Link>
                        <Link to='/'>Help</Link>
                        <Link to='/'>Contact Us</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link to='/'>Instagram</Link>
                        <Link to='/'>Facebook</Link>
                        <Link to='/'>Youtube</Link>
                        <Link to='/'>Twitter</Link>
                    </div>
                </div>
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                    <div className = 'footer-logo'>
                        <Link className='social-logo'>
                            XSEED Education <i className='fab fa-typo3'/>
                        </Link>
                    </div>
                    <small className='website-rights'>XSEED Education</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link facebook'
                        to = '/'
                        target = "_blank"
                        aria-label="Facebook"
                        >
                            <i className='fab  fa-facebook-f' />
                        </Link>
                        <Link className='social-icon-link instagram'
                        to = '/'
                        target = "_blank"
                        aria-label="Instagram"
                        >
                            <i className='fab  fa-instagram' />
                        </Link>
                        <Link className='social-icon-link youtube'
                        to = '/'
                        target = "_blank"
                        aria-label="YouTube"
                        >
                            <i className='fab  fa-youtube' />
                        </Link>

                        <Link className='social-icon-link twitter'
                        to = '/'
                        target = "_blank"
                        aria-label="Twitter"
                        >
                            <i className='fab  fa-twitter' />
                        </Link>

                        <Link className='social-icon-link linkedin'
                        to = '/'
                        target = "_blank"
                        aria-label="LinkedIn"
                        >
                            <i className='fab  fa-linkedin' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer