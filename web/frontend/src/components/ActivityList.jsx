import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8007/api/activities")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (activityId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8007/api/activities/${activityId}`)
          .then(() => {
            setActivities(
              activities.filter((activity) => activity.id !== activityId)
            );
            Swal.fire("Deleted!", "Your activity has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire(
              "Error!",
              "There was a problem deleting the activity.",
              "error"
            );
          });
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching activities. Please try again later.</div>;
  }

  return (
    <div>
      <h1 className="text-center">Journey List</h1>
      <Link to="/add">
        <button className="btn btn-success btn-sm btn-position">
          New Activity
        </button>
      </Link>
      <table className="table table-borderless">
        <thead className="table-light">
          <tr className="align-bottom">
            <th>Day One</th>
            <th>Day Two</th>
            <th>Day Three</th>
            <th>Day Four</th>
            <th>Day Five</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="custom-position">
          {activities.map((activity) => (
            <tr className="align-middle" key={activity.id}>
              <td>{activity.dayOne}</td>
              <td>{activity.dayTwo}</td>
              <td>{activity.dayThree}</td>
              <td>{activity.dayFour}</td>
              <td>{activity.dayFive}</td>
              <td className="d-flex gap-1">
                <Link to={`/activities/${activity.id}`}>
                  <button className="btn btn-primary btn-sm">View</button>
                </Link>
                <Link to={`/editActivity/${activity.id}`}>
                  <button className="btn btn-success btn-sm">Edit</button>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(activity.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityList;
