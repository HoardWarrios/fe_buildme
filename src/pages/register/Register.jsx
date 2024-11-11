<<<<<<< HEAD
import "./Register.scss"
import React, { useState } from 'react';


const Register = () => {
    
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    userPin: '',
    experience: '',
    birthYear: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the backend
    console.log('Form submitted:', form);
  };

  return (
    <div className="signup-container">
      <h2>SIGN OF BUILDER</h2>
      <div className="profile-picture">
        <button>profile picture</button>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Enter First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Enter Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userPin"
          placeholder="Your Pin"
          value={form.userPin}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="experience"
          placeholder="No. of Experience"
          value={form.experience}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="birthYear"
          placeholder="Birth of Year"
          value={form.birthYear}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}



=======
import React from "react";
import "./Register.scss"



const Register = () => {
    return (
        <div className="register">Register</div>
    )
      
    
  
}


>>>>>>> 24a3dd31caa041428bf7f4a22f2cd4289ef2caaa
export default Register;