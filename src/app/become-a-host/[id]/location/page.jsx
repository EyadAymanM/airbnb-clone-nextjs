"use client";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import { useState } from "react";
import NextBackFooter from "@/app/_components/AddListingLayout/NextBackFooter";
import { toast ,Toaster } from "react-hot-toast";
import { updateListing } from "@/app/_actions/Listing/updateListing";
import { useRouter } from "next/navigation";


const Location = ({params:{id}}) => {
  const router = useRouter()
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    governorate: "",
    country: "",
    postalCode: "",
  });
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const addressValues = [
    {
      id: "street",
      name: "street",
      type: "text",
      label: "Street Address"
    },
    {
      id: "city",
      name: "city",
      type: "text",
      label: "City"
    },
    {
      id: "governorate",
      name: "governorate",
      type: "text",
      label: "Governorate"
    },
    {
      id: "country",
      name: "country",
      type: "text",
      label: "Country"
    },
    {
      id: "postalCode",
      name: "postalCode",
      type: "text",
      label: "postalCode"
    },
  ]

  const updateLocation = async() => {
    const listing = await updateListing(id, { address, location })
    
    if(listing._id){
      router.push(`/become-a-host/${id}/floor-plan`)
    }
    else{
      toast('Something went wrong..')
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setLocation({ latitude: lat, longitude: lng });
      },
    });

    return null;
  };
  
  
  return (
    <>
      <Toaster />
      <div className="w-full flex justify-center font-airbnb">
        <div className="max-w-[630px] min-h-[500px]">
          <h1 className="mt-2 text-3xl font-semibold font-airbnb text-start">
            Where&#39;s your place located?
          </h1>
          <div className="text-[#777] text-base mb-2">
            Your address is only shared with guests after they’ve made a
            reservation.
          </div>
          <MapContainer
            center={[28, 31]}
            zoom={6}
            className="h-[500px] w-full rounded-xl shadow border border-[#555] z-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            <LocationMarker />
          </MapContainer>
          <div className="flex">
            <div className="relative">
              <input
                id='lat'
                name='lat'
                type='text'
                disabled
                value={location.latitude || null}
                placeholder=" "
                className="peer w-full p-2 pt-6 font-normal bg-white border-0 rounded-xl transition focus:border focus:border-black outline-none"
              />
              <label
                htmlFor='lat'
                className="absolute text-sm text-neutral-600 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                latitude
              </label>
            </div>
            <div className="relative">
              <input
                id='lng'
                name='lng'
                type='text'
                disabled
                value={location.longitude || null}
                placeholder=" "
                className="peer w-full p-2 pt-6 font-normal bg-white border-0 rounded-xl transition focus:border focus:border-black outline-none"
              />
              <label
                htmlFor='lng'
                className="absolute text-sm text-neutral-600 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                longitude
              </label>
            </div>
          </div>
          <div className="border-2 rounded-xl my-4 shadow">
            {addressValues.map(({ id, name, type, label }, index) => (<div key={id} className={`w-full relative ${true ? 'border-b-2' : ''}`}>
              <input
                id={id}
                name={name}
                type={type}
                onChange={(e) => handleChange(e)}
                placeholder=" "
                className="peer w-full p-2 pt-6 font-normal bg-white border-0 rounded-xl transition focus:border focus:border-black outline-none"
              />
              <label
                htmlFor={id}
                className="absolute text-sm text-neutral-600 duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75"
              >
                {label}
              </label>
            </div>))}
            
          </div>
        </div>
      </div>
      {/* <button onClick={()=>updateListing(id, { address, location })}>press</button> */}
      <NextBackFooter progress={34} next={updateLocation}/>
    </>
  );
};

export default Location;
