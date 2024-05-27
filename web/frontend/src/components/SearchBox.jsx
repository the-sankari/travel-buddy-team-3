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
    <div>
      <form action="">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a destination"
        />
        <button onClick={handleSearch}>Search</button>

        <br />
        <input type="date" id="startDate" name="startDate"></input>
        <input type="date" id="endDate" name="endDate"></input>
      </form>
    </div>
  );
};
export default SearchBox;
