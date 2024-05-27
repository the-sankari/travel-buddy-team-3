import { getWeather } from "../services/weatherService";

const WeatherCard = (weather) => {
  return (
    <>
      <div>WeatherCard</div>
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp} °C</p>
        </div>
      )}
    </>
  );
};

export default WeatherCard;
