import React, { useState } from "react";
import HomeGalleryCard from "./HomeGalleryCard";
import placeList_1 from "../assets/placeList_1";
import placeList_2 from "../assets/placeList_2";
const HomeGallery = () => {
  return (
    <div className="home-gallery">
      <div className="home-galley-up">
        {placeList_1.map((place) => (
          <HomeGalleryCard key={place.id} {...place} />
        ))}
      </div>
      <div className="home-gallery-mid">
        <p>I follow my heart … </p>
        <p>and it usually leads me to the airport.</p>
      </div>
      <div className="home-galley-down">
        {placeList_2.map((place) => (
          <HomeGalleryCard key={place.id} {...place} />
        ))}
      </div>
    </div>
  );
};

export default HomeGallery;
