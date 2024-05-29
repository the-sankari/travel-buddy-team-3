import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryData = ({ countryName }) => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);

  // THIS IS CURRENTLY NOT WORKING PROPERLY:
  // Timezone difference calculation provided by ChatGPT:
  const calculateTimeDifference = (timezone) => {
    // Convert UTC+offset format to offset in minutes
    const offsetSign = timezone.charAt(3) === "-" ? -1 : 1;
    const offsetHours = parseInt(timezone.substring(4));
    const offsetMinutes = offsetHours * 60 * offsetSign;

    // Get user's local time and adjust it by the offset
    const userTime = new Date();
    const countryTime = new Date(userTime.getTime() + offsetMinutes * 60000);

    // Calculate the time difference in hours
    const differenceInMs = countryTime - userTime;
    const differenceInHours = differenceInMs / (1000 * 60 * 60);

    // Determine if the country time is ahead or behind the user's local time
    const isAhead = offsetSign === 1 ? true : false;

    // If the time difference is very small, consider it as the same time
    if (Math.abs(differenceInMs) < 1000) {
      return { difference: 0, isAhead };
    }

    return { difference: Math.abs(differenceInHours), isAhead };
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,flag,capital,currencies,languages,timezones,car`;

      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(url);

        if (!response.data.length) {
          throw new Error("Country not found");
        }

        setCountryData(response.data[0]);

        // Extract the first timezone and calculate time difference
        const firstTimezone = response.data[0].timezones[0];
        const difference = calculateTimeDifference(firstTimezone);
        setTimeDifference(difference);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountryData();
      console.log(`Country name in CountryData component: ${countryName}`);
    }
  }, [countryName]);

  if (!countryName) {
    return null;
  }

  if (loading) {
    return <div>Loading Country Data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    // Country Data
    <div className="country-details">
      <h1>
        {countryData.flag} {countryData.name.common}
      </h1>
      <div className="country-data">
        <div className="country-data_item_1">
          <p>Capital: {countryData.capital ? countryData.capital : "N/A"}</p>
          <p>
            Languages:{" "}
            {countryData.languages
              ? Object.values(countryData.languages).join(", ")
              : "N/A"}
          </p>
          <p>
            Currency:{" "}
            {countryData.currencies
              ? Object.keys(countryData.currencies).join(", ")
              : "N/A"}
          </p>
        </div>
        <div className="country-data_item_2">
          {timeDifference && (
            <p>
              Timezone: {countryData.timezones[0]} ({timeDifference.difference}{" "}
              hours {timeDifference.isAhead ? "ahead" : "behind"} of local time)
            </p>
          )}
          {countryData.car && countryData.car.side === "left" && (
            <p>Notice: 🚗 Left-hand traffic!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryData;
