import React from "react";
import CountryData from "./CountryData";
import MapComponent from "./MapComponent";

const DestinationCard = ({
  countryName,
  displayedCityName,
  lat,
  lon,
  mapRef,
}) => {
  return (
    <>
      {countryName && (
        <CountryData
          countryName={countryName}
          displayedCityName={displayedCityName}
        />
      )}
      <MapComponent lat={lat} lon={lon} mapRef={mapRef} />
    </>
  );
};

export default DestinationCard;
