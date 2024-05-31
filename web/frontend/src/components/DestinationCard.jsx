import React from "react";
import DestinationInfo from "./DestinationInfo";
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
        <DestinationInfo
          countryName={countryName}
          displayedCityName={displayedCityName}
        />
      )}
      <MapComponent lat={lat} lon={lon} mapRef={mapRef} />
    </>
  );
};

export default DestinationCard;
