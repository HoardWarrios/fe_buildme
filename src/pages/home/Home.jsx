import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
//import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";


function Home() {

  return (
    <div className="home">
      <Featured />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1> Talented Builders at your fingertips</h1>
            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              {/*<img src="/img/check.png" alt="Check" />*/}
              The best for every budget
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              Quality work done quickly
            </div>
            <p>
              Find the right Builder to begin working on your Plan within
              minutes.
            </p>
            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              Protected payments, every time
            </div>
            <p>
              Always know what you'll pay upfront. Your payment isn't released
              until you approve the work.
            </p>
            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              24/7 support
            </div>
            <p>
              Find high-quality services at every price point. No hourly rates,
              just project-based pricing.
            </p>
          </div>
          <div className="item">
            <video src="./src/public/img/video.mp4" controls />
          </div>
        </div>
      </div>
     
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              BuildME <i>Constructions</i>
            </h1>
            <h1>
              A business solution designed for <i>Constructions</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to Construction
            </p>
            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              Connect to Builders with proven business experience
            </div>

            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src="./src/public/img/check.png" alt="" />
              Manage work and boost productivity with one powerful workspace
            </div>
            <button>Explore BuildME</button>
          </div>
          <div className="item">
            <img
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
}

export default Home;
