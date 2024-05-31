/* eslint-disable react/prop-types */
import React from "react";
import ForecastCard from "./ForecastCard";

const CurrentWeatherCard = ({ currentWeather }) => {
  if (!currentWeather) {
    return <div>Loading weather data...</div>;
  }

  let today = new Date();

  const dayname = today.toLocaleDateString("en-US", { weekday: "short" });

  return (
    // <div className="current-weather-container">
    <>
      <h5>Current Weather</h5>
      <p>{dayname}</p>
      <img
        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
        alt={`${currentWeather.weather[0].description} icon`}
      />
      <p>
        {Math.round(currentWeather.main.temp)} °C,{" "}
        {currentWeather.weather[0].description}
      </p>
      {/* <p>Humidity: {currentWeather.main.humidity} %</p> */}
      {/* // </div> */}
    </>
  );
};

export default CurrentWeatherCard;
