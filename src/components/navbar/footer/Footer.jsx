import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss"






const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">


            <div className="footer_row">


                <div className="footer_col">
                    <h2>How to add services</h2>
                        <Link className="link" to="/"> <p>How to add my services</p></Link>
                        <Link className="link" to="/"> <p>How to select categories</p></Link>
                        <Link className="link" to="/"> <p>Membership</p></Link>
                        <Link className="link" to="/"> <p>Banner Advertising</p></Link>
                </div>

                <div className="footer_col">
                    <h2>Help & Support</h2>
                        <Link className="link" to="/"> <p>Blog</p></Link>
                        <Link className="link" to="/"> <p>FAQs</p></Link>
                        <Link className="link" to="/contactus"> <p>Contact Us</p></Link>
                </div>
                <div className="footer_col">
                    <h2>About us</h2>
                        <Link className="link" to="/aboutus"> <p>About us</p></Link>
                        <Link className="link" to="/"> <p>Terms & Conditions</p></Link>
                        <Link className="link" to="/"> <p>Privacy Policy</p></Link>
                </div>
                <div className="footer_col">
                    <h2>Connect with us</h2>
                        <Link className="link" to="/"> <p>Facebook</p></Link>
                        <Link className="link" to="/"> <p>Youtube</p></Link>
                        <Link className="link" to="/"> <p>Email</p></Link>
                </div>

            </div>
        </div>
        </div>
    )
     
   
 
}




export default Footer;

