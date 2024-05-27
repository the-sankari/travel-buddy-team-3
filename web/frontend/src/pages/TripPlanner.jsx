/* eslint-disable no-unused-vars */
// src/pages/TripPlanner.jsx
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import Itinerary from "../components/Itinerary";
import image from "../assets/images/placeholderImage.png";
import image3 from "../assets/images/currentWeather.png";
import image2 from "../assets/images/forecast.png";
import image4 from "../assets/images/itinerarybox.png";
import destination from "../assets/images/destination.png"
import map from "../assets/images/map.png"

const TripPlanner = () => {
  return (
    <div className=" trip-planner">
      <div className="left">
        <div className="searchbox-current-weather">
          <div className="searchbox-card">
            <SearchBox />
          </div>
          <div className="current-weather">
            <p>Current Weather</p>
            <img src={image3} alt="" />
          </div>
        </div>
        <div className="weather-forecast">
          <h5>Weather forecast for your trip’s duration:</h5>
          <img src={image2} alt="" />
        </div>
        <div className="itinerary-planner">
          <h4>Itinerary Planner</h4>
          <img src={image4} alt="" />
        </div>
      </div>
      <div className="destination-card">
        <div className="destination">
          <img src={destination} alt="" />
        </div>
        <div className="map">
          <img src={map} alt="" />
        </div>
      </div>
    </div>
    // <div>
    //   <SearchBox />
    //   <br />
    //   <br />
    //   <br />
    //   {/* <Map /> */}
    //   <br />
    //   <br />
    //   <br />
    //   <Itinerary />
    // </div>
  );
};

export default TripPlanner;
