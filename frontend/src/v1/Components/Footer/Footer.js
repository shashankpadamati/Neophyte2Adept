import { Link } from 'react-router-dom'
import './Footer.scss'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export const Footer = ({auth})=>{
    return (
        <div className='footer-container'>
            <div className='footer-wrapper'>
                <div className='footer-title'>
                    <div className='footer-heading'>Neophyte2Adept</div>
                    <div className='footer-description'>Top learning experiences that create more talent in the world.</div>
                </div>
                <div className='footer-company-details'>
                    <div className='footer-company-details-heading'>
                        company
                    </div>
                    <div className='footer-company-details-links'>
                        <Link to='/' className='footer-company-link'>
                            About Us
                        </Link>
                        <Link to='/' className='footer-company-link'>
                            Contact us
                        </Link>
                        <Link to='/' className='footer-company-link'>
                            Payment Methods
                        </Link>
                        <Link to='/' className='footer-company-link'>
                            Refund Policy
                        </Link>
                    </div>
                </div>
                <div className='footer-social-media-links'>
                <div className='footer-social-media-links-heading'>
                        social
                    </div>
                    <div className='footer-social-media-links-wrapper'>
                        <Link to='/' className='footer-social-media-link'>
                        <FaFacebookF /> facebook
                        </Link>
                        <Link to='/' className='footer-social-media-link'>
                        <FaInstagram /> Instagram
                        </Link>
                        <Link to='/' className='footer-social-media-link'>
                        <FaXTwitter /> X
                        </Link>
                        <Link to='/' className='footer-social-media-link'>
                        <FaLinkedin /> linkedin
                        </Link>
                    </div>
                </div>
            </div>
            <div className='footer-copyright-section'>
            © {new Date().getFullYear()} Neophyte2Adept. All rights reserved.
            </div>
        </div>
    )
}