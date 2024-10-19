import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const StaticMap = ({ latitude, longitude }) => {
  const [position, setPosition] = useState(null);
  const Icon = L.divIcon({
    className: "",
    html: `<svg className="w-8 h-8 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="red" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"/>
</svg>
`,
  });

  useEffect(() => {
    if (typeof latitude === 'number' && typeof longitude === 'number') {
      setPosition([latitude, longitude]);
    }

  }, [latitude, longitude])

  if (!position) {
    return <div>Loading map...</div>; // Render a loading state while fetching data
  }
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
      className="border rounded-xl z-10"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position} alt="Here" icon={Icon}>
        <Popup>Here&#39;s the place</Popup>
      </Marker>
    </MapContainer>
  );
};

export default StaticMap;
