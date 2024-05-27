/* eslint-disable no-unused-vars */
// src/pages/TripPlanner.jsx
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import Itinerary from "../components/Itinerary";

const TripPlanner = () => {
  return (
    <div>
      <SearchBox />
      <br />
      <br />
      <br />
      {/* <Map /> */}
      <br />
      <br />
      <br />
      <Itinerary />
    </div>
  );
};

export default TripPlanner;
