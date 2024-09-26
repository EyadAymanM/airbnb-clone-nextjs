"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = ({ locations }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const createCustomIcon = (content) => {
    return L.divIcon({
      className: "",
      html: `
        <div class="flex justify-center items-center gap-2 p-1 bg-white border-1 border-black rounded-2xl text-center w-[75px] h-[40px] text-sm text-gray-800 font-bold hover:scale-125 leading-[40px]">
          ${content}  
        </div>
      `,
    });
  };

  return (
    <MapContainer
      center={
        locations && locations.length > 0
          ? locations[0].coordinates
          : [-12.04318, -77.02824]
      }
      zoom={locations && locations.length > 0 ? 13 : 2}
      scrollWheelZoom={true}
      className="h-[88vh] rounded-lg z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true} 
        maxZoom={18}
        minZoom={2} 
        bounds={null}
      />

      {locations &&
        locations.map((location, idx) => (
          <Marker
            key={idx}
            position={location.coordinates}
            icon={createCustomIcon(location.content)}
          />
        ))}
    </MapContainer>
  );
};

export default dynamic(() => Promise.resolve(Map), { ssr: false });
