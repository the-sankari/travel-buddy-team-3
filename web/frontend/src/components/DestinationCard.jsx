import { getCountryInfo } from "../services/countriesService";
import Map from "../components/Map";

const DestinationCard = () => {
  return (
    <>
      <div>DestinationCard</div>
      {countryInfo && (
        <div>
          <h2>{countryInfo.name.common}</h2>
          <p>Capital: {countryInfo.capital[0]}</p>
          <p>Population: {countryInfo.population}</p>
        </div>
      )}
      {coordinates.longitude !== 0 && coordinates.latitude !== 0 && (
        <Map coordinates={coordinates} />
      )}
    </>
  );
};

export default DestinationCard;
