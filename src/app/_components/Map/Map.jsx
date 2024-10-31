"use client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "./Map.css";

const Map = ({ locations }) => {
  const defaultCoordinates = [-12.04318, -77.02824];

  const createCustomIcon = (content) => {
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div class="flex justify-center items-center gap-2 p-1 bg-white border-1 border-black rounded-2xl text-center w-[75px] h-[40px] text-sm text-gray-800 font-bold hover:scale-125 leading-[40px]">
          ${content}
        </div>
      `,
    });
  };

  const bounds = [
    [-90, -Infinity], 
    [90, Infinity],   
  ];

  return (
    <div className="relative">
      <MapContainer
        center={locations.length > 0 ? locations[0].coordinates : defaultCoordinates}
        zoom={locations.length > 0 ? 4 : 2}
        scrollWheelZoom={true}
        className="h-[88vh] rounded-lg z-0"
        worldCopyJump={true} 
        maxBounds={bounds} 
        maxBoundsViscosity={0.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
          maxZoom={18}
          minZoom={2}
        />

        {locations.map((location, idx) => (
          <Marker
            key={idx}
            position={location.coordinates}
            icon={createCustomIcon(location.content)}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;