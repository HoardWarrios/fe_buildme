import React, { useState } from "react";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

// LOGIN FUNCTION
function Login() {
  const [username, setUsername] = useState("");//Get user name
  const [password, setPassword] = useState("");//Get password
  const [error, setError] = useState(null);// If error occurs

  const navigate = useNavigate();

  //Function to handle user input
  const handleSubmit = async (e) => {
    e.preventDefault();//Since we are using a form
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));//Get current user from local storage
      navigate("/")//Navigate to home page
    } catch (err) {
      setError(err.response.data);
    }
  };

  // LOGIN PAGE DESIGN
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && error} {/*// If there is an error show it! */}

        <p>
          No account yet?  <Link className="signup" to="/register">Sign up now</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;