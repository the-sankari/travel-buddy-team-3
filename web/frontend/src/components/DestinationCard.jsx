import React from "react";
import CountryData from "./CountryData";
import MapComponent from "./MapComponent";

const DestinationCard = ({ countryName, lat, lon, mapRef }) => {
  return (
    <>
      {countryName && <CountryData countryName={countryName} />}
      <MapComponent lat={lat} lon={lon} mapRef={mapRef} />
    </>
  );
};

export default DestinationCard;
