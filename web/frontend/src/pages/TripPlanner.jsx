/* eslint-disable no-unused-vars */
// src/pages/TripPlanner.jsx
import React, { useState, useEffect, useRef } from "react";
import SearchBox from "../components/SearchBox";
import Itinerary from "../components/Itinerary";
import image from "../assets/images/placeholderImage.png";
import image3 from "../assets/images/currentWeather.png";
import image2 from "../assets/images/forecast.png";
import image4 from "../assets/images/itinerarybox.png";
import destination from "../assets/images/destination.png";
import map from "../assets/images/map.png";
import DestinationCard from "../components/DestinationCard";
import Forecast from "../components/Forecast";
import CurrentWeatherCard from "../components/CurrentWeatherCard";

const TripPlanner = () => {
  const [cityName, setCityName] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const mapRef = useRef(null);

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
        setLat(data.coordinates.lat);
        setLon(data.coordinates.lng);

        console.log(`Country name from Geocoding API: ${data.countryName}`);
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
    <>
      <div className=" trip-planner">
        <div className="left">
          <div className="searchbox-current-weather">
            <div className="searchbox-card">
              <SearchBox
                handleSearch={handleSearch}
                setCityName={setCityName}
                cityName={cityName}
              />
            </div>
            <div className="current-weather">
              <p>Current Weather</p>
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
            <img src={image4} alt="" />
          </div>
        </div>
        <div className="destination-card">
          <DestinationCard
            countryName={countryName}
            lat={lat}
            lon={lon}
            mapRef={mapRef}
          />
        </div>
      </div>
    </>
  );
};

export default TripPlanner;
