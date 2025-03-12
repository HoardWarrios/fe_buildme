import React, { useState } from "react";
import "./Featured.scss";
import { useNavigate } from "react-router-dom";

//SEARCH FUNCTION
function Featured() {
  const [input, setInput] = useState("");//For input
  const navigate = useNavigate();//For navigation

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);//Navigated to searched gigs
  };

  //BANNER TEXT & SEARCH OPTION
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          {/* Banner title */}
          <h1>
          DO YOU FIND FOR A BUILDER OR 
          <br />ARE YOU A BUILDER?
          </h1>
          {/* Banner description */}
          <p>Get started on your construction journey today! Explore our website to discover our wide range of services, read testimonials from satisfied clients, <br />  and connect with us for any inquiries.</p>
          
          {/* Search input */}
          <div className="search">
            <div className="searchInput">
              <img src="src\public\img\search.png" alt="" />
              <input type="text" 
              placeholder='Try "building for home"'
              onChange={(e) => setInput(e.target.value)}//On change get input value
               />
            </div>
            {/* Search button */}
            <button onClick={handleSubmit}>Search</button>
          </div>
          
        </div>
        {/* Banner image */}
        <div className="right">
          <img src="src\public\img\image5.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Featured;