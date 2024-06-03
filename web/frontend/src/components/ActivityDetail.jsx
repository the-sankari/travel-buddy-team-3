import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8002/api/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching activity. Please try again later.</div>;
  }

  return (
    <div>
      <h1>Activity Details</h1>
      {activity && (
        <div>
          <p>Day One: {activity.dayOne}</p>
          <p>Day Two: {activity.dayTwo}</p>
          <p>Day Three: {activity.dayThree}</p>
          <p>Day Four: {activity.dayFour}</p>
          <p>Day Five: {activity.dayFive}</p>
        </div>
      )}
    </div>
  );
};

export default ActivityDetail;
