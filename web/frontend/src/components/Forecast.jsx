import React, { useState, useEffect } from "react";

const Forecast = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // POST latitude and longitude to backend forecast API endpoint:
        const response = await fetch("http://localhost:8007/api/forecast", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lat, lon }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch weather data: " + response.status);
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    // Only fetch if lat & lon data received
    if (lat && lon) {
      fetchWeatherData();
    }
  }, [lat, lon]);

  // Do not render anything if lat or lon is not available
  if (!lat || !lon) {
    return null;
  }

  if (error) {
    return <p>Error fetching weather data: {error.message}</p>;
  }

  if (!weatherData) {
    return <p>Loading forecast...</p>;
  }

  // Filter data to only include entries where dt_txt ends with "12:00:00":
  const filteredData = weatherData.list.filter((weather) =>
    weather.dt_txt.endsWith("12:00:00")
  );

  return (
    <div>
      <h1>Weather Forecast</h1>
      {filteredData.map((weather) => (
        <div key={weather.dt}>
          <h4>{weather.dt_txt}</h4>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`${weather.weather[0].description} icon`}
          />
          <p>
            {Math.round(weather.main.temp)} °C, {weather.weather[0].description}
          </p>

          <hr />
        </div>
      ))}
    </div>
  );
};

export default Forecast;
