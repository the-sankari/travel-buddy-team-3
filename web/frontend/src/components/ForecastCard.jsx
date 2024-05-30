import React from "react";

const ForecastCard = (weather) => {
  const date = new Date(weather.dt_txt);
  const dayname = date.toLocaleDateString("en-US", { weekday: "short" });
  return (
    <div className="card forecast-card text-center">
      <div className="card-body">
        <h5 className="card-title">{dayname}</h5>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={`${weather.weather[0].description} icon`}
        />
        <p className="card-text">{Math.round(weather.main.temp)} °C</p>
      </div>
    </div>
  );
};

export default ForecastCard;


// , {weather.weather[0].description}