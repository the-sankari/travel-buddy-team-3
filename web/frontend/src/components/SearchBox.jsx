import { useState } from "react";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [weather, setWeather] = useState(null);
  const [countryInfo, setCountryInfo] = useState(null);
  const [coordinates, setCoordinates] = useState({ longitude: 0, latitude: 0 });

  const handleSearch = async () => {
    try {
      const weatherResponse = await getWeather(searchTerm);
      setWeather(weatherResponse.data);

      const countryResponse = await getCountryInfo(searchTerm);
      setCountryInfo(countryResponse.data[0]);

      if (weatherResponse.data.coord) {
        setCoordinates({
          longitude: weatherResponse.data.coord.lon,
          latitude: weatherResponse.data.coord.lat,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className=" search-container">
      <form action="">
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
            type="button"
            id="button-addon2"
            onClick={handleSearch}
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
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SearchBox;
