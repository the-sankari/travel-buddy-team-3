import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Itinerary = () => {
  const location = useLocation();
  const { checkIn, checkOut } = location.state || {};
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
  }, [checkIn, checkOut]);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedActivities = {
      dayOne: activities[days[0]?.toISOString().split("T")[0]] || null,
      dayTwo: activities[days[1]?.toISOString().split("T")[0]] || null,
      dayThree: activities[days[2]?.toISOString().split("T")[0]] || null,
      dayFour: activities[days[3]?.toISOString().split("T")[0]] || null,
      dayFive: activities[days[4]?.toISOString().split("T")[0]] || null,
    };
    console.log("Formatted Activities:", formattedActivities); // Debug log
    axios
      .post("http://localhost:8007/api/activities", formattedActivities)
      .then((response) => {
        console.log("Success:", response.data);
        setActivities({});
        setCurrentActivity("");
        setDays([]);
        setSelectedDay("");
        navigate("/planner");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button className="btn btn-success btn-sm mt-2" type="submit">
        Save
      </button>
    </form>
  );
};

export default Itinerary;
