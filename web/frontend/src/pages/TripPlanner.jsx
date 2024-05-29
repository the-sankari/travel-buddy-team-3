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
      const response = await fetch("http://localhost:8000/api/city-data", {
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
    // <div className=" trip-planner">
    //   <div className="left">
    //     <div className="searchbox-current-weather">
    //       <div className="searchbox-card">
    //         <SearchBox />
    //       </div>
    //       <div className="current-weather">
    //         <p>Current Weather</p>
    //         <img src={image3} alt="" />
    //       </div>
    //     </div>
    //     <div className="weather-forecast">
    //       <h5>Weather forecast for your trip’s duration:</h5>
    //       <img src={image2} alt="" />
    //     </div>
    //     <div className="itinerary-planner">
    //       <h4>Itinerary Planner</h4>
    //       <img src={image4} alt="" />
    //     </div>
    //   </div>
    //   <div className="destination-card">
    //     <div className="destination">
    //       <img src={destination} alt="" />
    //     </div>
    //     <div className="map">
    //       <img src={map} alt="" />
    //     </div>
    //   </div>
    // </div>
    <div>
      <SearchBox
        handleSearch={handleSearch}
        setCityName={setCityName}
        cityName={cityName}
      />
      <br />
      <br />
      <br />
      {currentWeather && <CurrentWeatherCard currentWeather={currentWeather} />}
      <br />
      <br />
      <br />
      <DestinationCard
        countryName={countryName}
        lat={lat}
        lon={lon}
        mapRef={mapRef}
      />
      <br />
      <br />
      <br />
      {lat && lon && <Forecast lat={lat} lon={lon} />}
      <br />
      <br />
      <br />
      {/* <Itinerary /> */}
    </div>
  );
};

export default TripPlanner;
