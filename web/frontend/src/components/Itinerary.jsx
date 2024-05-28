/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Itinerary = () => {
  const [itinerary, setItinerary] = useState([]);

  const addActivity = (activity) => {
    setItinerary([...itinerary, activity]);
  };

  return (
    <div className="container">
      <h2>Plan Your Trip</h2>
      <ul className="list-group">
        {itinerary.map((activity, index) => (
          <li className="list-group-item" key={index}>
            {index + 1}. {activity}
          </li>
        ))}
      </ul>
      <div className="form-floating">
        <input
          className="form-control"
          id="floatingInput"
          type="text"
          placeholder="Add an activity"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value) {
              addActivity(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <label htmlFor="floatingInput">Add an activity</label>
      </div>
    </div>
  );
};

export default Itinerary;
