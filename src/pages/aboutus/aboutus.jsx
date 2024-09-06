import React from 'react'
import "./aboutus.scss"

const Aboutus = () => {
    return (
        
        <div className='about'>

        <section className="banner-section">
          <div className="banner-section">
            <div className='banner_col1'>
            <h1>DO YOU FIND FOR <br/> A BUILDER?</h1>
            <br/>
            <p>
              Get started on your construction journey today! Explore our
              website to discover our wide range of services, read testimonials
              from satisfied clients, and connect with us for any inquiries.
            </p><br/>
            <button className="create-profile-button">Create Your Profile</button>
            </div>

        <div className='banner_col'>
          <img src="src\images\pngwing 1.png" alt="Builder" className="intro-image" />
          </div>
          </div>
        </section>
        

         <section className='aboutbox'>
            <h1>ABOUT US</h1>
            <br/>
            <p>Welcome to the House Building System, your one-stop solution for finding reputable and reliable house builders. Our platform was established with a clear purpose: to revolutionize the house building industry by simplifying the process of connecting homeowners with skilled builders. We understand the challenges homeowners face when searching for the perfect builder to bring their dream home to life, and we are here to make that journey smooth and stress-free.</p>
            <br/><p>At House Building System, our mission is to create a streamlined and efficient platform that empowers homeowners to make informed decisions while connecting with house builders. We aim to bridge the gap between homeowners and builders, providing a central hub where both parties can interact, collaborate, and create something extraordinary together. Our goal is to transform the house building experience by incorporating cutting-edge technology with a personal touch, ensuring that the process is not only efficient but also enjoyable.</p>
            <br/><h4><b>Join Us on this Journey</b></h4>
            <p>Whether you are a homeowner with dreams of a perfect home or a builder seeking new opportunities, House Building System welcomes you to join our platform. Together, let's redefine the house building experience and turn dreams into reality. Explore our website, connect with like-minded individuals, and embark on an exciting journey of building and creating homes that leave a lasting legacy.</p>
            <br/><h4><i><b>House Building System - Building Homes, Building Dreams.</b></i></h4>
        </section>   
          
        </div>
    )
}

export default Aboutus