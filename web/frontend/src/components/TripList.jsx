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

  return (
    <div>
      <h1 className="text-center">Journey List</h1>
      <Link to="/addTrip">
        <button className="btn btn-success btn-sm btn-position">NewTrip</button>
      </Link>
      <table className="table table-borderless">
        <thead className="table-light">
          <tr className="align-bottom">
            <th>Name</th>
            <th>Destination</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>E-mail</th>
            <th>Mobile</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="custom-position">
          {trips.map((trip) => (
            <tr className="align-middle" key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.destination}</td>
              <td>{trip.checkIn}</td>
              <td>{trip.checkOut}</td>
              <td>{trip.email}</td>
              <td>{trip.mobile}</td>
              <td>{trip.longitude}</td>
              <td>{trip.latitude}</td>
              <td className="d-flex gap-1">
                <Link to={`/trips/${trip.id}`}>
                  <button className="btn btn-primary btn-sm">View</button>
                </Link>
                <Link to={`/edit/${trip.id}`}>
                  <button className="btn btn-success btn-sm">Edit</button>
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(trip.id)}
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

export default TripList;
