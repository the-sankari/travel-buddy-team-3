import React, { useState, useEffect } from "react";
import axios from "axios";
import WikipediaText from "./WikipediaText";

const DestinationInfo = ({ countryName, displayedCityName, timezone }) => {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeDifference, setTimeDifference] = useState(null);
  const [destinationTime, setDestinationTime] = useState(null);

  // Timezone difference calculation provided by ChatGPT:
  const calculateTimeDifference = (timezoneOffsetInSeconds) => {
    // Get user's local time and offset
    const userTime = new Date();
    const userTimezoneOffsetInSeconds = userTime.getTimezoneOffset() * 60;

    // Calculate the offset difference in seconds
    const offsetDifferenceInSeconds =
      timezoneOffsetInSeconds + userTimezoneOffsetInSeconds;

    // Convert offset difference from seconds to hours
    const differenceInHours = offsetDifferenceInSeconds / 3600;

    // Determine if the destination time is ahead or behind the user's local time
    const isAhead = differenceInHours > 0;

    const destinationTime = new Date(
      userTime.getTime() + offsetDifferenceInSeconds * 1000
    );
    return {
      difference: Math.abs(differenceInHours),
      isAhead,
      destinationTime,
    };
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
        console.log(response.data[0]);

        // Calculate time difference using the provided timezone offset in seconds
        const difference = calculateTimeDifference(timezone);
        setTimeDifference(difference);
        setDestinationTime(
          difference.destinationTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountryData();
      console.log(`Country name in DestinationInfo component: ${countryName}`);
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
        {countryData.flag} {displayedCityName}, {countryData.name.common}
      </h1>
      <div className="country-data">
        <div className="country-data_item_1">
          {/* Don't render capital if current destination is the capital: */}
          {countryData.capital != displayedCityName && (
            <p>
              🏙️ <strong>Capital:</strong>{" "}
              {countryData.capital ? countryData.capital : "N/A"}
            </p>
          )}
          <p>
            💬 <strong>Languages:</strong>{" "}
            {countryData.languages
              ? Object.values(countryData.languages).join(", ")
              : "N/A"}
          </p>
          <p>
            💸 <strong>Currency:</strong>{" "}
            {countryData.currencies
              ? Object.keys(countryData.currencies).join(", ")
              : "N/A"}
          </p>
        </div>
        <div className="country-data_item_2">
          {/* Don't render timezone difference if no difference to user location: */}
          {timeDifference && timeDifference.difference !== 0 && (
            <p>
              <strong>Time:</strong> {destinationTime} (
              {timeDifference.difference} hours{" "}
              {timeDifference.isAhead ? "ahead" : "behind"} of local time)
            </p>
          )}
          {/* If country has left hand traffic, render this: */}
          {countryData.car && countryData.car.side === "left" && (
            <p>
              <strong>Notice:</strong> 🚗 Left-hand traffic!
            </p>
          )}
        </div>
        <div>
          <WikipediaText articleTitle={displayedCityName} />
          <p>
            📖 <strong>Check out</strong>{" "}
            <a
              href={`https://en.wikivoyage.org/wiki/${displayedCityName}`}
              target="_blank"
            >
              Wikivoyage
            </a>{" "}
            for tourist information on {displayedCityName}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DestinationInfo;
