import React from "react";
import { Link } from "react-router-dom";
const HomePoster = () => {
  return (
    <div className="home-poster">
      <div className="home-poster-left">
        <h4>Work, travel, save, repeat.</h4>
      </div>
      <div className="home-poster-right">
       <div className="home-poster-btns">
       <Link to="/planner" className="hero-btn-plan">
          Plant Trip
        </Link>
        <Link to="/contact" className="hero-btn-plan">
          Learn more
        </Link>
       </div>
      </div>
    </div>
  );
};

export default HomePoster;
