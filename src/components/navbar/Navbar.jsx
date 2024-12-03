// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import newRequest from "../../utils/newRequest";
// import "./Navbar.scss";

// function Navbar() {
//   const [open, setOpen] = useState(false);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await newRequest.post("/auth/logout");
//       localStorage.setItem("currentUser", null);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="navbar">
//       <div className="container">
//         <div className="logo">
//           <Link className="link" to="/">
//             <span className="text">BuildME</span>
//           </Link>
//           <span className="dot">.</span>
//         </div>
//         <div className="top-nav">
//           <Link className="link-nav" to="/">
//             <span className="text">HOME</span>
//           </Link>
//           <Link className="link-nav" to="/aboutus">
//             <span className="text">ABOUT US</span>
//           </Link>
//           <Link className="link-nav" to="/contactus">
//             <span className="text">CONTACT US</span>
//           </Link>
//         </div>
//         <div className="links">
//           {!currentUser?.isSeller && <span>Become a Builder </span>}
//           {currentUser ? (
//             <div className="user" onClick={() => setOpen(!open)}>
//               <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
//               <span>{currentUser?.username}</span>
//               {open && (
//                 <div className="options">
//                   {currentUser.isSeller && (
//                     <>
//                       <Link className="link" to="/mygigs">
//                         Gigs
//                       </Link>
//                       <Link className="link" to="/add">
//                         Add New Gig
//                       </Link>
//                     </>
//                   )}
//                   <Link className="link" to="/orders">
//                     Orders
//                   </Link>
//                   <Link className="link" to="/messages">
//                     Messages
//                   </Link>
//                   <Link className="link" onClick={handleLogout}>
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="link">
//                 Sign in
//               </Link>
//               <Link className="link" to="/register">
//                 <button>Join</button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

function Navbar() {
  const [open, setOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // Close the menu if clicked outside
  const handleClickOutside = (e) => {
    if (e.target.closest(".user") === null) {
      setOpen(false); // Close the menu when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside); // Clean up the event listener
    };
  }, []);

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">BuildME</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="top-nav">
          <Link className="link-nav" to="/">
            <span className="text">HOME</span>
          </Link>
          <Link className="link-nav" to="/aboutus">
            <span className="text">ABOUT US</span>
          </Link>
          <Link className="link-nav" to="/contactus">
            <span className="text">CONTACT US</span>
          </Link>
        </div>
        <div className="links">
          {!currentUser?.isSeller && <span>Become a Builder </span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" to="/orders">
                    Orders
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Sign in
              </Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
