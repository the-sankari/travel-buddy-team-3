import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8007/api/trips", {
        destination,
        checkIn,
        checkOut,
        longitude,
        latitude,
      })
      .then((response) => {
        console.log("Success:", response.data);
        navigate("/itinerary", { state: { checkIn, checkOut } });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <form onSubmit={handleSubmit} style={{ width: "400px" }}>
        <h1>Add Trip</h1>
        <div className="mb-2">
          <label htmlFor="destination" className="form-label">Destination</label>
          <input
            className="form-control"
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="checkin" className="form-label">Check In</label>
          <input
            className="form-control"
            id="checkin"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="checkout" className="form-label">Check Out</label>
          <input
            className="form-control"
            id="checkout"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="longitude" className="form-label">Longitude</label>
          <input
            className="form-control"
            id="longitude"
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="latitude" className="form-label">Latitude</label>
          <input
            className="form-control"
            id="latitude"
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-success btn-sm mt-2" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTrip;
