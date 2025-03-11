import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

//REGISTER FUNCTION
function Register() {
  const [file, setFile] = useState(null);//for user profile pic
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    city: "",
    isSeller: false,
    desc: "",
  });//user details

  console.log(user)

  const navigate = useNavigate();

  // Function triggered whenever user types a text to handle multiple inputs in registration
  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

   //Function triggers if Seller account is turned on
  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  //Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);//Upload profile pic & return URL
    try {
      await newRequest.post("/auth/register", {
        ...user,
        img: url,
      });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  //REGISTER PAGE DESIGN
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Create a new account</h1>

          <label htmlFor="">Username</label>
          <input
            name="username"
            type="text"
            placeholder="johndoe"
            onChange={handleChange}
          />

          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />

          <label htmlFor="">Password</label>
          <input name="password" type="password" onChange={handleChange} />

          <label htmlFor="">Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="">City</label>
          <input
            name="city"
            type="text"
            placeholder="Colombo"
            onChange={handleChange}
          />

        </div>

        <div className="right">
          <h2>I want to become a Builder</h2>

          {/* Become a builder option */}
          <div className="toggle">
            <label htmlFor="">Activate the builder account</label>
            <label className="switch">
              <input type="checkbox" onChange={handleSeller} />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+94 234 567 89"
            onChange={handleChange}
          />

          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="desc"
            id=""
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>

        <button class="register" type="submit">Register</button>
        </div>
       
      </form>
    </div>
  );
}

export default Register;