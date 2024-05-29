import React from "react";

const CurrentWeatherCard = ({ currentWeather }) => {
  if (!currentWeather) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
        alt={`${currentWeather.weather[0].description} icon`}
      />
      <p>
        {Math.round(currentWeather.main.temp)} °C,{" "}
        {currentWeather.weather[0].description}
      </p>
      <p>Humidity: {currentWeather.main.humidity} %</p>
    </div>
  );
};

export default CurrentWeatherCard;
