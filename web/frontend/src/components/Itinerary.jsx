import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Itinerary = ({ travelDates, setFormattedActivities }) => {
  const location = useLocation();
  // const { checkIn, checkOut } = location.state || {};
  const checkIn = travelDates[0];
  const checkOut = travelDates[travelDates.length - 1];
  const [activities, setActivities] = useState({});
  const [currentActivity, setCurrentActivity] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [days, setDays] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkIn && checkOut) {
      const generateDays = () => {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const dateArray = [];
        let currentDate = start;

        while (currentDate <= end) {
          dateArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setDays(dateArray);
        setSelectedDay(dateArray[0]?.toISOString().split("T")[0] || "");
      };

      generateDays();
    }
  }, [travelDates]);

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (currentActivity.trim()) {
      setActivities((prevActivities) => ({
        ...prevActivities,
        [selectedDay]: prevActivities[selectedDay]
          ? `${prevActivities[selectedDay]}, ${currentActivity}`
          : currentActivity,
      }));
      setCurrentActivity("");
      handleChange();
    }
  };

  const handleDeleteActivity = (day, activity) => {
    setActivities((prevActivities) => ({
      ...prevActivities,
      [day]: prevActivities[day]
        .split(", ")
        .filter((item) => item !== activity)
        .join(", "),
    }));
    handleChange();
  };

  const handleChange = () => {
    setFormattedActivities({
      dayOne: activities[days[0]?.toISOString().split("T")[0]] || null,
      dayTwo: activities[days[1]?.toISOString().split("T")[0]] || null,
      dayThree: activities[days[2]?.toISOString().split("T")[0]] || null,
      dayFour: activities[days[3]?.toISOString().split("T")[0]] || null,
      dayFive: activities[days[4]?.toISOString().split("T")[0]] || null,
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="day">Select Day:</label>
        <select
          id="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          {days.map((day, index) => (
            <option key={index} value={day.toISOString().split("T")[0]}>
              {day.toDateString()}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="activity">Activity:</label>
        <input
          id="activity"
          value={currentActivity}
          onChange={(e) => setCurrentActivity(e.target.value)}
          placeholder="To do"
        />
        <button
          onClick={handleAddActivity}
          className="btn btn-primary btn-sm ml-2"
        >
          Add
        </button>
      </div>
      {Object.keys(activities).map((day) =>
        activities[day] ? (
          <div key={day}>
            <h3>{new Date(day).toDateString()}</h3>
            <ol>
              {activities[day]
                .split(", ")
                .filter((activity) => activity)
                .map((activity, index) => (
                  <li key={index}>
                    {activity}
                    <button
                      onClick={() => handleDeleteActivity(day, activity)}
                      className="btn btn-danger btn-sm ml-2"
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ol>
          </div>
        ) : null
      )}
    </form>
  );
};

export default Itinerary;
