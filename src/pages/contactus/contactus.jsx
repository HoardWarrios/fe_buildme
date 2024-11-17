import React from 'react'
import "./contactus.scss"

const Contactus = () => {
    return (
        
        <div className='contactus'>
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
           <img src="src\public\img\Rectangle 40.png"/>
           <a href="mailto:buildme5l@gmail.com" className="fas_fa-envelope"> buidmesl@gmail.com</a>
        </p>
        <p>
        <img src="src\public\img\Rectangle 41.png"/>
        <a href="https://facebook.com/buildme" className="fas_fa-envelope" target="_blank" rel="noopener noreferrer">  Build ME @ Official </a>
        </p>
        <p>
        <img src="src\public\img\Rectangle 42.png"/>
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