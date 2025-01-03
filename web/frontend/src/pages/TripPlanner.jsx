import React, { useState, useEffect, useRef } from "react";
import SearchBox from "../components/SearchBox";
import Itinerary from "../components/Itinerary";
import DestinationCard from "../components/DestinationCard";
import Forecast from "../components/Forecast";
import CurrentWeatherCard from "../components/CurrentWeatherCard";
import SavePlanButton from "../components/SavePlanButton";

const TripPlanner = ({ initialCoords }) => {
  const [cityName, setCityName] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [displayedCityName, setDisplayedCityName] = useState(null);
  const [lat, setLat] = useState(initialCoords.lat);
  const [lon, setLon] = useState(initialCoords.lon);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const mapRef = useRef(null);
  const [travelDates, setTravelDates] = useState([]);
  const [formattedActivities, setFormattedActivities] = useState({});

  const handleSearch = async (cityName) => {
    try {
      const response = await fetch("http://localhost:8007/api/city-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityName }),
      });

      const data = await response.json();

      if (data.coordinates) {
        if (mapRef.current) {
          mapRef.current.flyTo({
            center: [data.coordinates.lng, data.coordinates.lat],
            essential: true,
            zoom: 12,
          });
        }

        setCurrentWeather(data.weather);
        setCountryName(data.countryName);
        setDisplayedCityName(data.displayedCityName);
        setLat(data.coordinates.lat);
        setLon(data.coordinates.lng);
        setTimezone(data.weather.timezone);

        console.log(
          `Timezone offset from OpenWeather: ${data.weather.timezone}`
        );
        console.log(`Country name from Geocoding API: ${data.countryName}`);
        console.log(`City name from Geocoding API: ${data.displayedCityName}`);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log(`Coordinates from Geocoding API - Lat: ${lat}, Lon: ${lon}`);
  }, [lat, lon]);

  return (
    <div className="trip-planner-container">
      <div className="container trip-planner">
        <div className="left">
          <div className="searchbox-current-weather">
            <div className="searchbox-card">
              <SearchBox
                handleSearch={handleSearch}
                setCityName={setCityName}
                setTravelDates={setTravelDates}
              />
            </div>
            <div className="current-weather">
              {currentWeather && (
                <CurrentWeatherCard currentWeather={currentWeather} />
              )}
            </div>
          </div>
          <div className="weather-forecast">
            {lat && lon && <Forecast lat={lat} lon={lon} />}
          </div>
          <div className="itinerary-planner">
            <h4>Itinerary Planner</h4>
            <Itinerary
              travelDates={travelDates}
              setFormattedActivities={setFormattedActivities}
            />
          </div>
          <SavePlanButton
            destination={displayedCityName}
            checkIn={travelDates[0]}
            checkOut={travelDates[travelDates.length - 1]}
            longitude={lon}
            latitude={lat}
            formattedActivities={formattedActivities}
          />
        </div>
        <div className="destination-card">
          <DestinationCard
            countryName={countryName}
            displayedCityName={displayedCityName}
            lat={lat}
            lon={lon}
            mapRef={mapRef}
            timezone={timezone}
          />
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
