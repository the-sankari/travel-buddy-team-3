import { useState } from "react";
import Swal from "sweetalert2";

const SearchBox = ({ handleSearch, setCityName }) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date (endDate);

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




    const differenceInTime = end.getTime()-start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    if (differenceInDays > 5) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Start date to end date should not be more than 5 days.",
      });
      return;
    }

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
              onChange={(e) => setStartDate(e.target.value)}
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
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchBox;
