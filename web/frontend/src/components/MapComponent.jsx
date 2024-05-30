import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const MapComponent = ({ lat, lon, mapRef }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAP_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [24.93, 60.16],
      zoom: 12,
    });
  }, [mapRef]);

  useEffect(() => {
    if (mapRef.current && lat && lon) {
      mapRef.current.flyTo({
        center: [lon, lat],
        essential: true,
        zoom: 12,
      });
    }
  }, [lat, lon, mapRef]);

  return <div ref={mapContainer} style={{ width: "100%", height: "60%" }} />;
};

export default MapComponent;
