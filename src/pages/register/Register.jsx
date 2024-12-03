// import React, { useState } from "react";
// import upload from "../../utils/upload";
// import "./Register.scss";
// import newRequest from "../../utils/newRequest";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const [file, setFile] = useState(null);
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     img: "",
//     city: "",
//     isSeller: false,
//     desc: "",
//   });

//   console.log(user)

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setUser((prev) => {
//       return { ...prev, [e.target.name]: e.target.value };
//     });
//   };

//   const handleSeller = (e) => {
//     setUser((prev) => {
//       return { ...prev, isSeller: e.target.checked };
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = await upload(file);
//     try {
//       await newRequest.post("/auth/register", {
//         ...user,
//         img: url,
//       });
//       navigate("/")
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   return (
//     <div className="register">
//       <form onSubmit={handleSubmit}>
//         <div className="left">
//           <h1>Create a new account</h1>
//           <label htmlFor="">Username</label>
//           <input
//             name="username"
//             type="text"
//             placeholder="johndoe"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Email</label>
//           <input
//             name="email"
//             type="email"
//             placeholder="email"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Password</label>
//           <input name="password" type="password" onChange={handleChange} />
//           <label htmlFor="">Profile Picture</label>
//           <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//           <label htmlFor="">City</label>
//           <input
//             name="city"
//             type="text"
//             placeholder="Colombo"
//             onChange={handleChange}
//           />
//           <button type="submit">Register</button>
//         </div>
//         <div className="right">
//           <h1>I want to become a Builder</h1>
//           <div className="toggle">
//             <label htmlFor="">Activate the Builder account</label>
//             <label className="switch">
//               <input type="checkbox" onChange={handleSeller} />
//               <span className="slider round"></span>
//             </label>
//           </div>
//           <label htmlFor="">Phone Number</label>
//           <input
//             name="phone"
//             type="text"
//             placeholder="+94 234 567 89"
//             onChange={handleChange}
//           />
//           <label htmlFor="">Description</label>
//           <textarea
//             placeholder="A short description of yourself"
//             name="desc"
//             id=""
//             cols="30"
//             rows="10"
//             onChange={handleChange}
//           ></textarea>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Register;

//PREVIOUS CODE COMMENTED
import React, { useState } from "react";
import upload from "../../utils/upload";
import "./Register.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

function Register() {
  const [file, setFile] = useState(null);
  const [additionalFile, setAdditionalFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    additionalImg: "",
    city: "",
    isSeller: false,
    desc: "",
  });

  console.log(user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgUrl = await upload(file);
    const additionalImgUrl = additionalFile ? await upload(additionalFile) : null;
    
      try {
        // Send registration request
        const res = await newRequest.post("/auth/register", user);
    
        // Store the token in localStorage
        localStorage.setItem("token", res.data.token);
    
        // Optionally, store user info in localState to update UI
        setUser(res.data.userDetails); // Update the logged-in user data
        navigate("/"); // Redirect the user to their dashboard or home page
      } catch (err) {
        console.error(err);
      }
    
    
  };

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
          <label htmlFor="">House Plan</label>
          <input
            type="file"
            onChange={(e) => setAdditionalFile(e.target.files[0])}
          />
          <label htmlFor="">City</label>
          <input
            name="city"
            type="text"
            placeholder="Colombo"
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </div>
        <div className="right">
          <h1>I want to become a Builder</h1>
          <div className="toggle">
            <label htmlFor="">Activate the Builder account</label>
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
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;

