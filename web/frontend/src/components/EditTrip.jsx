import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTrip = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8007/api/trips/${id}`)
      .then((response) => {
        setTrip(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while fetching the trip data.");
        setIsLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:8007/api/trips/${id}`, trip)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("An error occurred while updating the trip.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!trip) {
    return <p>Trip data is not available.</p>;
  }

  return (
    <div style={{ display: "flex", justifyContent: "left" }}>
      <form onSubmit={handleSave} style={{ width: "400px" }}>
        <h1>Edit Trip</h1>
        {error && <p className="error">{error}</p>}
        <div className="mb-2">
          <label htmlFor="destination" className="form-label">
            Destination
          </label>
          <input
            className="form-control"
            id="destination"
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="checkin" className="form-label">
            Check In
          </label>
          <input
            className="form-control"
            type="date"
            id="checkin"
            name="checkIn"
            value={trip.checkIn}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="checkout" className="form-label">
            Check Out
          </label>
          <input
            className="form-control"
            type="date"
            id="checkout"
            name="checkOut"
            value={trip.checkOut}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="longitude" className="form-label">
            Longitude
          </label>
          <input
            className="form-control"
            id="longitude"
            type="number"
            name="longitude"
            value={trip.longitude}
            onChange={handleInputChange}
            step="0.000001"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="latitude" className="form-label">
            Latitude
          </label>
          <input
            className="form-control"
            id="latitude"
            type="number"
            name="latitude"
            value={trip.latitude}
            onChange={handleInputChange}
            step="0.000001"
            required
          />
        </div>
        <button
          className="btn btn-primary btn-sm mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditTrip;
