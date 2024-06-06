import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = ({ handleSearch, setCityName, setTravelDates }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear checkout date if it's out of the valid range when check-in date changes
    if (checkIn) {
      const checkInDate = new Date(checkIn);
      const maxCheckOutDate = new Date(checkInDate);
      maxCheckOutDate.setDate(maxCheckOutDate.getDate() + 5);

      if (checkOut) {
        const checkOutDate = new Date(checkOut);
        if (checkOutDate > maxCheckOutDate || checkOutDate < checkInDate) {
          setCheckOut("");
        }
      }
    } else {
      setCheckOut("");
    }
  }, [checkIn]);

  const handleDateChange = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      const travelDatesArray = [];
      const currentDate = new Date(start);
      while (currentDate <= end) {
        travelDatesArray.push(new Date(currentDate).toISOString().slice(0, 10));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      setTravelDates(travelDatesArray);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [checkIn, checkOut]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Sweet alert if the user didn't select any destination
    if (!searchTerm) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a destination.",
      });
      return;
    }

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

    setCityName(searchTerm);

    try {
      handleSearch(searchTerm);
    } catch (error) {
      console.error("There was an error creating the trip!", error);
    }
  };

  // calculates the maximum allowed check-out date based on the selected check-in date
  const getMaxCheckOutDate = () => {
    if (checkIn) {
      const checkInDate = new Date(checkIn);
      const maxCheckOutDate = new Date(checkInDate);
      maxCheckOutDate.setDate(maxCheckOutDate.getDate() + 4);
      return maxCheckOutDate.toISOString().split("T")[0];
    }
    return "";
  };
  // This function didn't allow user to select checkIn day earlier than the current day.
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
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
              min={getTodayDate()}
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
              min={checkIn}
              max={getMaxCheckOutDate()}
              disabled={!checkIn} // if the user didn't select the checkin date then not able to select the checkout date.
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
