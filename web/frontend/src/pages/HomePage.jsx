// src/pages/Home.jsx
import React, { useState } from "react";
import Guide from "../components/Guide";
import CarouselCard from "../components/CarouselCard";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import HomeBanner from "../components/HomeBanner";
import HomePoster from "../components/HomePoster";
import HomeGallery from "../components/HomeGallery";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <>
      <Hero />
      <HomeBanner />
      <HomePoster />
      <HomeGallery />
      <Footer />
    </>
  );
};

export default HomePage;
