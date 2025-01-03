import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TripList = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8007/api/trips")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTrips(response.data);
        } else {
          console.error("Expected an array, but got:", response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleDelete = (tripId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:8007/api/trips/${tripId}`)
          .then(() => {
            setTrips(trips.filter((trip) => trip.id !== tripId));
            Swal.fire("Deleted!", "Your trip has been deleted.", "success");
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    });
  };

  // Separate trips into plannedTrips and pastTrips:
  const currentDate = new Date();
  const plannedTrips = trips.filter(
    (trip) => new Date(trip.checkOut) >= currentDate
  );
  const pastTrips = trips.filter(
    (trip) => new Date(trip.checkOut) < currentDate
  );

  return (
    <div className="trips-container">
      <div className="container">
        <div className="bg-light p-3 mb-4 rounded">
          <div className="row user-details">
            <div className="col-md-2 d-flex justify-content-center align-items-center">
              <img
                src="https://via.placeholder.com/100"
                className="rounded-circle"
                alt="User Image"
              />
            </div>
            <div className="col-md-10 ">
              <h2>Hello, Susan!</h2>
              <p>Username: susan340958</p>
              {/* <p>Registered since: 01/06/2024</p> */}
              <p>Location: Helsinki, Finland</p>
              <p>Planned trips: {plannedTrips.length}</p>
              <p>Completed trips: {pastTrips.length}</p>
            </div>
          </div>
        </div>
        <h1 className="text-center">Your Saved Plans:</h1>
        <div className="row justify-content-center">
          {plannedTrips.map((trip) => (
            <div
              key={trip.id}
              className="col-md-10 bg-light p-3 mb-3"
              style={{ borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h2>{trip.destination}</h2>
                  <p>
                    From {trip.checkIn} to {trip.checkOut}
                  </p>
                </div>
                <div
                  className="d-flex flex-column ml-auto"
                  style={{ width: "100px" }}
                >
                  <Link to={`/edit/${trip.id}`}>
                    <button className="btn btn-success btn-sm mb-2 w-100">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDelete(trip.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-center">Your Past Journeys:</h1>
        <div className="row justify-content-center">
          {pastTrips.map((trip) => (
            <div
              key={trip.id}
              className="col-md-10 bg-light p-3 mb-3"
              style={{ borderRadius: "8px" }}
            >
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h2>{trip.destination}</h2>
                  <p>
                    From {trip.checkIn} to {trip.checkOut}
                  </p>
                </div>
                <div
                  className="d-flex flex-column ml-auto"
                  style={{ width: "100px" }}
                >
                  <Link to={`/edit/${trip.id}`}>
                    <button className="btn btn-success btn-sm mb-2 w-100">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDelete(trip.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripList;
