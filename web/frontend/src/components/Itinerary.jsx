// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";

// const Itinerary = () => {
//   const [itinerary, setItinerary] = useState([]);

//   const addActivity = (activity) => {
//     setItinerary([...itinerary, activity]);
//   };

//   return (
//     <div className="container">
//       <h2>Plan Your Trip</h2>
//       <ul className="list-group">
//         {itinerary.map((activity, index) => (
//           <li className="list-group-item" key={index}>
//             {index + 1}. {activity}
//           </li>
//         ))}
//       </ul>
//       <div className="form-floating">
//         <input
//           className="form-control"
//           id="floatingInput"
//           type="text"
//           placeholder="Add an activity"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && e.target.value) {
//               addActivity(e.target.value);
//               e.target.value = "";
//             }
//           }}
//         />
//         <label htmlFor="floatingInput">Add an activity</label>
//       </div>
//     </div>
//   );
// };

// export default Itinerary;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Itinerary = () => {
  const [activities, setActivities] = useState({
    dayOne: "",
    dayTwo: "",
    dayThree: "",
    dayFour: "",
    dayFive: "",
  });
  const [currentActivity, setCurrentActivity] = useState("");
  const [selectedDay, setSelectedDay] = useState("dayOne");
  const navigate = useNavigate();

  const handleAddActivity = (e) => {
    e.preventDefault();
    setActivities((prevActivities) => ({
      ...prevActivities,
      [selectedDay]: prevActivities[selectedDay]
        ? `${prevActivities[selectedDay]}, ${currentActivity}`
        : currentActivity,
    }));
    setCurrentActivity("");
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
    axios
      .post("http://localhost:8007/api/activities", activities)
      .then((response) => {
        console.log("Success:", response.data);
        setActivities({
          dayOne: "",
          dayTwo: "",
          dayThree: "",
          dayFour: "",
          dayFive: "",
        });
        setCurrentActivity("");
        setSelectedDay("dayOne");
        navigate("/activities");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h1>To Do List</h1> */}
      <div>
        <label htmlFor="day"></label>
        <select
          id="day"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="dayOne">Day One</option>
          <option value="dayTwo">Day Two</option>
          <option value="dayThree">Day Three</option>
          <option value="dayFour">Day Four</option>
          <option value="dayFive">Day Five</option>
        </select>
      </div>
      <div>
        <label htmlFor="activity"></label>
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
            <h3>{day.replace("day", "Day ")}</h3>
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
        Submit
      </button>
    </form>
  );
};

export default Itinerary;


