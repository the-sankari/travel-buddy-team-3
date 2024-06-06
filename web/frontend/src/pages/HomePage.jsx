// src/pages/Home.jsx
import React, { useState } from "react";
import Guide from "../components/Guide";
import CarouselCard from "../components/CarouselCard";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <>
      <Hero />
      {/* <CarouselCard /> */}
      <Guide />
    </>
  );
};

export default HomePage;
