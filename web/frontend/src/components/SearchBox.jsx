import { useState, useEffect } from "react";


const SearchBox = ({ handleSearch, setCityName, setTravelDates }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [weather, setWeather] = useState(null);
  // const [countryInfo, setCountryInfo] = useState(null);
  // const [coordinates, setCoordinates] = useState({ longitude: 0, latitude: 0 });

  // const handleSearch = async () => {
  //   try {
  //     const weatherResponse = await getWeather(searchTerm);
  //     setWeather(weatherResponse.data);

  //     const countryResponse = await getCountryInfo(searchTerm);
  //     setCountryInfo(countryResponse.data[0]);

  //     if (weatherResponse.data.coord) {
  //       setCoordinates({
  //         longitude: weatherResponse.data.coord.lon,
  //         latitude: weatherResponse.data.coord.lat,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  useEffect(() => {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0];
    document.getElementById("startDate").min = minDate;
  }, []);

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    const startDate = new Date(selectedStartDate);

    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(startDate.getDate() + 5);
    const maxEndDateString = maxEndDate.toISOString().split("T")[0];

    document.getElementById("endDate").max = maxEndDateString;

    if (new Date(endDate) > maxEndDate) {
      setEndDate(maxEndDateString);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please insert your destination.",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please select both start and end dates.",
      });
      return;
    }
    
    // Construct an array of date stamps between start and end dates
    const travelDatesArray = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      travelDatesArray.push(new Date(currentDate).toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setTravelDates(travelDatesArray);
    setCityName(searchTerm);
    handleSearch(searchTerm);
  };

  return (
    <div className=" search-container">
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
              id="startDate"
              name="startDate"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="input-group col mb-3">
            <span className="input-group-text" id="basic-addon1">
              To
            </span>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchBox;
