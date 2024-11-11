import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const { pathname } = useLocation();

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", isActive);
        return () => {
            window.removeEventListener("scroll", isActive);
        };
    }, []);

    // const currentUser = null

    const currentUser = {
        id: 1,
        username: "Hoard Warriors",
        isBuilder: true,
    };

    // nav bar main section
    return (
        <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
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

                <Link className="link" to="/register">
                         Sign Up</Link>

                    {!currentUser?.isBuilder && <span>Become a Builder</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser && (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKVgdPnMdBjCdxkKFnwvfzcvEA6RTfYRMuEA&s" alt="" />
                            <span>{currentUser?.username}</span>
                            {open && <div className="options">
                                {
                                    currentUser?.isBuilder && (
                                        <> 
                                            <Link to="/gigs">Gigs</Link>
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
                                <Link className="link" to="/aboutus">
                                    About
                                </Link>
                                <Link className="link" to="/register">
                                    Logout
                                </Link>
                            </div>}
                        </div>
                    )}
                </div>
            </div>

            {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
            Plumber
            </Link>
            <Link className="link menuLink" to="/">
            Painter
            </Link>
            <Link className="link menuLink" to="/">
            Electrician
            </Link>
            <Link className="link menuLink" to="/">
            Helper
            </Link>
            <Link className="link menuLink" to="/">
            Carpenter
            </Link>
            <Link className="link menuLink" to="/">
            Tile
            </Link>
            <Link className="link menuLink" to="/">
            Mason
            </Link>
            <Link className="link menuLink" to="/">
            Aluminium
            </Link>
            <Link className="link menuLink" to="/">
              Other
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;