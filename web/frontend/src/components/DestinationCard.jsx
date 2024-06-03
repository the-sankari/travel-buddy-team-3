import React from "react";
import DestinationInfo from "./DestinationInfo";
import MapComponent from "./MapComponent";

const DestinationCard = ({
  countryName,
  displayedCityName,
  lat,
  lon,
  mapRef,
  timezone,
}) => {
  return (
    <>
      {countryName && (
        <DestinationInfo
          countryName={countryName}
          displayedCityName={displayedCityName}
          timezone={timezone}
        />
      )}
      <MapComponent lat={lat} lon={lon} mapRef={mapRef} />
    </>
  );
};

export default DestinationCard;
