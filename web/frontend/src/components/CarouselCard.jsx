import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import axios from "axios";

function CarouselCard() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {countries.map((country, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              src={`https://source.unsplash.com/1300x600/?${country.name.common}`}
              className="d-block w-100 carousel-image"
              alt={country.name.common}
            />
            <Carousel.Caption>
              <h3>{country.name.common}</h3>
              <img src={country.flags.svg} width={100} alt="" />
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselCard;
