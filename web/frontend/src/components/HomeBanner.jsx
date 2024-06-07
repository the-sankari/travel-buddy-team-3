import React from "react";
import LeftImage from "../assets/images/home-banner-left.png";
import RightImage from "../assets/images/home-banner-right.png";
const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className="home-banner-left">
        <img src={LeftImage} alt="wow" />
      </div>
      <div className="home-banner-mid">
        <p>We wander for distraction but travel for fulfilment</p>
        <strong>-Hilaire Belloc</strong>
      </div>
      <div className="homer-banner-right">
        <img src={RightImage} alt="wow-2" />
      </div>
    </div>
  );
};

export default HomeBanner;
