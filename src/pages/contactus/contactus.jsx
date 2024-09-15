import React from 'react'
import "./contactus.scss"

const Contactus = () => {
    return (
        
        <div className='contactus'>

        <section className="bannersection">
          <div className="bannersection">
            <div className='banner_col1'>
            <h1 className='title'>DO YOU FIND FOR <br/> A BUILDER?</h1>
            <br/>
            <p>
              Get started on your construction journey today! Explore our
              website to discover our wide range of services, read testimonials
              from satisfied clients, and connect with us for any inquiries.
            </p><br/>
            <button className="create-profile-button">Create Your Profile</button>
            </div>

        <div className='banner_col'>
          <img src="src\images\pngwing 2.png" alt="Builder" className="intro-image" />
          </div>
          </div>
        </section>
        <br></br>

        
      <section className="contact-section">
      <div className="contact-container">
      <h2>CONTACT US</h2>
      <form>
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Message" required></textarea>
        <button type="submit" className="submit-btn">Contact Us</button>
      </form>
      <div className="contact-info">
        <p>
           <img src="src\images\Rectangle 40.png"/>
           <a href="mailto:buildme5l@gmail.com" className="fas_fa-envelope"> buidmesl@gmail.com</a>
        </p>
        <p>
        <img src="src\images\Rectangle 41.png"/>
        <a href="https://facebook.com/buildme" className="fas_fa-envelope" target="_blank" rel="noopener noreferrer">  Build ME @ Official </a>
        </p>
        <p>
        <img src="src\images\Rectangle 42.png"/>
          <a href="https://youtube.com/buildme" className="fas_fa-envelope" target="_blank" rel="noopener noreferrer">  Build ME </a>
        </p>
      </div>
    </div>
      </section>

      <br></br>    
        </div>
    )
}

export default Contactus