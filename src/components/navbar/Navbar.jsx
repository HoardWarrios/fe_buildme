import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Navbar.scss";

//NAVIGATION BAR FUNCTION
function Navbar() {
  const [active, setActive] = useState(false);//Active navbar
  const [open, setOpen] = useState(false);//Opening Menus

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);//If scrolling set nave bar active : else false
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // const isSeller = currentUser.isSeller;

  const navigate = useNavigate();

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      // localStorage.setItem("currentUser", null);
      localStorage.removeItem("currentUser");//Removes cookie when logout
      window.location.reload();//refresh page
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
    // Navbar main section
    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
            <div className="container">
                {/* BUILDME LOGO */}
                <div className="logo">
                    <Link className="link" to="/">
                        <span className="text">BuildME</span>
                    </Link>
                    <span className="dot">.</span>
                </div>

                {/* Top navigation */}
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
          
          {!currentUser?.isSeller && <Link className="bebuilder" to="/register"><span >Become a builder</span></Link>}

          {/* Current user profile */}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>

              {open && (
                <div className="options">

                  {/* If seller make these options available */}
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        Projects
                      </Link>
                      <Link className="link" to="/add">
                        Add New Project
                      </Link>
                    </>
                  )}

                  {/* If not seller make these options available */}
                  {!currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myplans">
                        My Plans
                      </Link>
                    </>
                  )}



                  {/* Default options available */}
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
              <Link to="/login" className="link">Sign in</Link>
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