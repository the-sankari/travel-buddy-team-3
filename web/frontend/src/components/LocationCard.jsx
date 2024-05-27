/* eslint-disable react/prop-types */

const LocationCard = ({ country }) => {
  if (!country || !country.currencies) {
    return <div>No country data available</div>;
  }

  return (
    <>
      <div className="card">
        <img
          src={country.flags.png}
          className="card-img-top"
          alt={country.name.common}
        />
        <div className="card-body">
          <h5 className="card-title">{}{country.name.common}</h5>
          <p className="card-text">Capital: {country.capital}</p>
          <p className="card-text">Region: {country.region}</p>
          <p className="card-text">Subregion: {country.subregion}</p>
          <p className="card-text">Population: {country.population}</p>
          <div className="card-text">
            Currencies:
            {Object.entries(country.currencies).map(([key, value]) => (
              <small key={key}>{key}: {value.name} symbol: {value.symbol}</small>
            ))}
          </div>
        </div>
      </div>
    </>
    // {Object.entries(country.currencies).map(([key, value]) => (
    //     <div key={key}>
    //       {key}: {value.name}
  );
};

export default LocationCard;
