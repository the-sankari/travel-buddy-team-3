import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTrip = () => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8007/api/trips", {
        name,
        destination,
        checkIn,
        checkOut,
        email,
        mobile,
        longitude,
        latitude,
      })
      .then((response) => {
        console.log("Success:", response.data);
        navigate("/trips");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-2" style={{ width: 800 }}>
      <h1>Add Trip</h1>
      <div>
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="checkin">Check In</label>
        <input
          id="checkin"
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="checkout">Check Out</label>
        <input
          id="checkout"
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="mobile">Mobile</label>
        <input
          id="mobile"
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="longitude">Longitude</label>
        <input
          id="longitude"
          type="number"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="latitude">Latitude</label>
        <input
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
  );
};

export default AddTrip;
