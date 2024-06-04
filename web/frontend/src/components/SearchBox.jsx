import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBox = ({ handleSearch, setCityName, setTravelDates, lat, lon }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select both start and end dates.",
      });
      return;
    }
    if (start > end) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date should be before or the same as the end date.",
      });
      return;
    }

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date to end date should not be more than 5 days.",
      });
      return;
    }

    const travelDatesArray = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      travelDatesArray.push(new Date(currentDate).toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setTravelDates(travelDatesArray);
    setCityName(searchTerm);

    try {
      const response = await axios.post("http://localhost:8007/api/trips", {
        destination: searchTerm,
        checkIn: checkIn,
        checkOut: checkOut,
        longitude: lon,
        latitude: lat,
      });
      console.log(response.data);
      handleSearch(searchTerm); // Move this inside the try block
    } catch (error) {
      console.error("There was an error creating the trip!", error);
    }

    navigate("/planner", {
      state: { checkIn, checkOut, longitude: lon, latitude: lat },
    });
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a destination"
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Search
          </button>
        </div>
        <div className="row">
          <div className="input-group col mb-3">
            <span className="input-group-text" id="basic-addon1">
              From
            </span>
            <input
              type="date"
              id="checkin"
              name="checkin"
              className="form-control"
              aria-describedby="basic-addon1"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="input-group col mb-3">
            <span className="input-group-text" id="basic-addon1">
              To
            </span>
            <input
              type="date"
              id="checkout"
              name="checkout"
              className="form-control"
              aria-describedby="basic-addon1"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
