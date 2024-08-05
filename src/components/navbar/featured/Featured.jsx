import React from 'react';
import "./Featured.scss";


function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
          DO YOU FIND FOR
          A BUILDER <br /> OR ARE YOU A BUILDER?
          </h1>
          <p>Get started on your construction journey today! Explore our website to discover our <br />wide range of services, read testimonials from satisfied clients, <br />  and connect with us for any inquiries.</p>
          <div className="search">
            <div className="searchInput">
              <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "building for home"' />
            </div>
            <button>Join in</button>
          </div>
          
        </div>
        <div className="right">
          <img src="./img/man.png" alt="" />
        </div>
      </div>
    </div>
 
  );
}

export default Featured;