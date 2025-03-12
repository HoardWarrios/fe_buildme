import React, { useState } from "react";
import "./ResetPassword.scss";
import newRequest from "../../utils/newRequest";
import { Link, useNavigate } from "react-router-dom";

// FORGOT PASSWORD FUNCTION
function ResetPassword() {
  const [username, setUsername] = useState("");//Get & update user name
  const [password, setPassword] = useState("");//Get & update password
  const [confirmPassword, setConfirmPassword] = useState(""); // Re-entered password
  const [error, setError] = useState(null);// If error occurs

  const navigate = useNavigate();

  //Function to handle user password input
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    //Reset password function
    try {
      await newRequest.put("/auth/reset-password", { username, password, confirmPassword });
      alert("Password has been reset successfully!");//Display alert
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "An error occurred");
    }

  };

  // LOGIN PAGE DESIGN
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Reset Password</h1>

        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter name"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Enter New Password</label>
        <input
          name="newPassword"
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Reset Password</button>
        {error && error} {/*// If there is an error show it! */}

      </form>
    </div>
  );
}

export default ResetPassword;