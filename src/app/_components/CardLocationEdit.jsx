"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Link } from "@/i18n/routing";
import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

const CardLocationEdit = React.memo(({ id, activated, onClick, latitude, longitude, address }) => {
  const defaultPosition = [30.0444, 31.2357]; 
  const t = useTranslations("Listings");

  const position = useMemo(() => {
    return latitude && longitude
      ? [latitude, longitude]
      : defaultPosition;
  }, [latitude, longitude]);

  CardLocationEdit.displayName = "CardLocationEdit";

  return (
    <Link href={`/hosting/listings/${id}/location`}>
      <div
        className={`flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl mx-auto hover:bg-gray-50 transition duration-200 w-[300px] 
                  ${activated ? "border-black border-2" : "border-gray-300 border"} cursor-pointer`}
        onClick={onClick}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('location')}</h2>

        <div className="w-full h-64 mb-4 rounded-lg overflow-hidden">
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div>
                  <h4 className="font-bold">Current Location</h4>
                  <p>{address?.city}, {address?.street}, {address?.country}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Location Description */}
        <p className="text-gray-600 mb-4 text-center">
          {address?.city}, {address?.street}, {address?.country}
        </p>
      </div>
    </Link>
  );
});

export default CardLocationEdit;