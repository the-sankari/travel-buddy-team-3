/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import ForecastCard from "./ForecastCard";

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

  // Remove the first entry (current day's forecast) from filteredData
  const displayedData = filteredData.slice(1);

  return (
    <div className="forecast-container">
      <h1>Weather Forecast</h1>
      <div className="daily-forecast">
        {displayedData.map((weather) => (
          <div key={weather.dt}>
            <ForecastCard key={weather.dt} {...weather} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
