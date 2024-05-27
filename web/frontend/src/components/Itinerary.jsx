/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Itinerary = () => {
  const [itinerary, setItinerary] = useState([]);

  const addActivity = (activity) => {
    setItinerary([...itinerary, activity]);
  };

  return (
    <div>
      <h2>Plan Your Trip</h2>
      <input
        type="text"
        placeholder="Add an activity"
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.target.value) {
            addActivity(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <ul>
        {itinerary.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Itinerary;
