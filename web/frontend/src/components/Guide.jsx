import React, { useState } from "react";
import image from "../assets/images/placeholderImage.png";
import GuideCard from "./GuideCard";

const Guide = () => {
  const [guideCards, setGuideCards] = useState([
    {
      number: 1,
      text: "Select your destination and travel dates",
      image: image,
    },
    {
      number: 2,
      text: "See the weather forecast and map and plan your travel itinerary accordingly",
      image: image,
    },
    {
      number: 3,
      text: "Save your travel plan to access and edit it later",
      image: image,
    },
  ]);

  return (
    <div className="container">
      <h2>How to use Travel Buddy:</h2>
      <div className="card-group guide-card-group gap-2">
        {guideCards.map((card) => (
          <GuideCard key={card.number} {...card} />
        ))}
        <button
          type="button"
          className="btn-close guide-close-btn"
          aria-label="Close"
          onClick={() => console.log("Button clicked!")}
        ></button>
      </div>
    </div>
  );
};

export default Guide;
