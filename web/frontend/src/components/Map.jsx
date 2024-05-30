/* eslint-disable react/prop-types */
// src/components/Map.jsx
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_API_MAP_KEY;

const Map = ({ coordinates }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (coordinates.longitude === 0 && coordinates.latitude === 0) {
      return;
    }

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coordinates.longitude, coordinates.latitude],
      zoom: 10,
    });

    new mapboxgl.Marker()
      .setLngLat([coordinates.longitude, coordinates.latitude])
      .addTo(map);

    return () => map.remove();
  }, [coordinates]);

  return <div ref={mapContainer} style={{ width: "100%", height: "60%" }} />;
};

export default Map;
