// src/pages/Home.jsx
import React, { useState } from "react";
import Guide from "../components/Guide";
import CarouselCard from "../components/CarouselCard";

const HomePage = () => {
  return (
    <>
      <CarouselCard />
      <Guide />
    </>
  );
};

export default HomePage;
