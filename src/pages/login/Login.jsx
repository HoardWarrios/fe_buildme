import "./Login.scss"
import React, { useState } from 'react';


function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
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
    <div className="login-container">
      <h2>LOG IN</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={form.username}
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
        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        <button type="submit">Log In</button>
      </form>
      <p>
        Not a member? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
}


export default Login;

